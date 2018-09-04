/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {isDirective} from './directive.js';
import {isCEPolyfill, removeNodes} from './dom.js';
import {TemplateFactory} from './template-factory.js';
import {TemplateInstance} from './template-instance.js';
import {TemplateResult} from './template-result.js';
import {createMarker} from './template.js';

/**
 * The Part interface represents a dynamic part of a template instance rendered
 * by lit-html.
 */
export interface Part {
  value: any;

  /**
   * Sets the current part value, but does not write it to the DOM.
   * @param value The value that will be committed.
   */
  setValue(value: any): void;

  /**
   * Commits the current part value, cause it to actually be written to the DOM.
   */
  commit(): void;
}

/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
export const noChange = {};

export const isPrimitive = (value: any) =>
    (value === null ||
     !(typeof value === 'object' || typeof value === 'function'));

/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */
export class AttributeCommitter {
  element: Element;
  name: string;
  strings: string[];
  parts: AttributePart[];
  dirty = true;

  constructor(element: Element, name: string, strings: string[]) {
    this.element = element;
    this.name = name;
    this.strings = strings;
    this.parts = [];
    for (let i = 0; i < strings.length - 1; i++) {
      this.parts[i] = this._createPart();
    }
  }

  /**
   * Creates a single part. Override this to create a differnt type of part.
   */
  protected _createPart(): AttributePart {
    return new AttributePart(this);
  }

  protected _getValue(): any {
    const strings = this.strings;
    const l = strings.length - 1;
    let text = '';

    for (let i = 0; i < l; i++) {
      text += strings[i];
      const part = this.parts[i];
      if (part !== undefined) {
        const v = part.value;
        if (v != null &&
            (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
          for (const t of v) {
            text += typeof t === 'string' ? t : String(t);
          }
        } else {
          text += typeof v === 'string' ? v : String(v);
        }
      }
    }

    text += strings[l];
    return text;
  }

  commit(): void {
    if (this.dirty) {
      this.dirty = false;
      this.element.setAttribute(this.name, this._getValue());
    }
  }
}

export class AttributePart implements Part {
  committer: AttributeCommitter;
  value: any = undefined;

  constructor(comitter: AttributeCommitter) {
    this.committer = comitter;
  }

  setValue(value: any): void {
    if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
      this.value = value;
      // If the value is a not a directive, dirty the committer so that it'll
      // call setAttribute. If the value is a directive, it'll dirty the
      // committer if it calls setValue().
      if (!isDirective(value)) {
        this.committer.dirty = true;
      }
    }
  }

  commit() {
    while (isDirective(this.value)) {
      const directive = this.value;
      this.value = noChange;
      directive(this);
    }
    if (this.value === noChange) {
      return;
    }
    this.committer.commit();
  }
}

export class NodePart implements Part {
  templateFactory: TemplateFactory;
  startNode!: Node;
  endNode!: Node;
  value: any = undefined;
  _pendingValue: any = undefined;

  constructor(templateFactory: TemplateFactory) {
    this.templateFactory = templateFactory;
  }

  /**
   * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
   * its next sibling must be static, unchanging nodes such as those that appear
   * in a literal section of a template.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterNode(ref: Node) {
    this.startNode = ref;
    this.endNode = ref.nextSibling!;
  }

  /**
   * Appends this part into a parent part.
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  appendIntoPart(part: NodePart) {
    part._insert(this.startNode = createMarker());
    part._insert(this.endNode = createMarker());
  }

  /**
   * Appends this part after `ref`
   *
   * This part must be empty, as its contents are not automatically moved.
   */
  insertAfterPart(ref: NodePart) {
    ref._insert(this.startNode = createMarker());
    this.endNode = ref.endNode;
    ref.endNode = this.startNode;
  }

  setValue(value: any): void {
    this._pendingValue = value;
  }

  commit() {
    while (isDirective(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = noChange;
      directive(this);
    }
    const value = this._pendingValue;
    if (value === noChange) {
      return;
    }
    if (isPrimitive(value)) {
      if (value !== this.value) {
        this._commitText(value);
      }
    } else if (value instanceof TemplateResult) {
      this._commitTemplateResult(value);
    } else if (value instanceof Node) {
      this._commitNode(value);
    } else if (Array.isArray(value) || value[Symbol.iterator]) {
      this._commitIterable(value);
    } else if (value.then !== undefined) {
      this._commitPromise(value);
    } else {
      // Fallback, will render the string representation
      this._commitText(value);
    }
  }

  private _insert(node: Node) {
    this.endNode.parentNode!.insertBefore(node, this.endNode);
  }

  private _commitNode(value: Node): void {
    if (this.value === value) {
      return;
    }
    this.clear();
    this._insert(value);
    this.value = value;
  }

  private _commitText(value: string): void {
    const node = this.startNode.nextSibling!;
    value = value == null ? '' : value;
    if (node === this.endNode.previousSibling &&
        node.nodeType === Node.TEXT_NODE) {
      // If we only have a single text node between the markers, we can just
      // set its value, rather than replacing it.
      // TODO(justinfagnani): Can we just check if this.value is primitive?
      node.textContent = value;
    } else {
      this._commitNode(document.createTextNode(
          typeof value === 'string' ? value : String(value)));
    }
    this.value = value;
  }

  private _commitTemplateResult(value: TemplateResult): void {
    const template = this.templateFactory(value);
    let instance: TemplateInstance;
    if (this.value && this.value.template === template) {
      instance = this.value;
    } else {
      // Make sure we propagate the template processor from the TemplateResult
      // so that we use it's syntax extension, etc. The template factory comes
      // from the render function so that it can control caching.
      instance =
          new TemplateInstance(template, value.processor, this.templateFactory);
      const fragment = instance._clone();
      // Since we cloned in the polyfill case, now force an upgrade
      if (isCEPolyfill && !this.endNode.isConnected) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }
      this._commitNode(fragment);
      this.value = instance;
    }
    instance.update(value.values);
  }

  private _commitIterable(value: any): void {
    // For an Iterable, we create a new InstancePart per item, then set its
    // value to the item. This is a little bit of overhead for every item in
    // an Iterable, but it lets us recurse easily and efficiently update Arrays
    // of TemplateResults that will be commonly returned from expressions like:
    // array.map((i) => html`${i}`), by reusing existing TemplateInstances.

    // If _value is an array, then the previous render was of an
    // iterable and _value will contain the NodeParts from the previous
    // render. If _value is not an array, clear this part and make a new
    // array for NodeParts.
    if (!Array.isArray(this.value)) {
      this.value = [];
      this.clear();
    }

    // Lets us keep track of how many items we stamped so we can clear leftover
    // items from a previous render
    const itemParts = this.value as NodePart[];
    let partIndex = 0;
    let itemPart: NodePart|undefined;

    for (const item of value) {
      // Try to reuse an existing part
      itemPart = itemParts[partIndex];

      // If no existing part, create a new one
      if (itemPart === undefined) {
        itemPart = new NodePart(this.templateFactory);
        itemParts.push(itemPart);
        if (partIndex === 0) {
          itemPart.appendIntoPart(this);
        } else {
          itemPart.insertAfterPart(itemParts[partIndex - 1]);
        }
      }
      itemPart.setValue(item);
      itemPart.commit();
      partIndex++;
    }

    if (partIndex < itemParts.length) {
      // Truncate the parts array so _value reflects the current state
      itemParts.length = partIndex;
      this.clear(itemPart && itemPart!.endNode);
    }
  }

  private _commitPromise(value: Promise<any>): void {
    this.value = value;
    value.then((v: any) => {
      if (this.value === value) {
        this.setValue(v);
        this.commit();
      }
    });
  }

  clear(startNode: Node = this.startNode) {
    removeNodes(
        this.startNode.parentNode!, startNode.nextSibling!, this.endNode);
  }
}

/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
export class BooleanAttributePart implements Part {
  element: Element;
  name: string;
  strings: string[];
  value: any = undefined;
  _pendingValue: any = undefined;

  constructor(element: Element, name: string, strings: string[]) {
    if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
      throw new Error(
          'Boolean attributes can only contain a single expression');
    }
    this.element = element;
    this.name = name;
    this.strings = strings;
  }

  setValue(value: any): void {
    this._pendingValue = value;
  }

  commit() {
    while (isDirective(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = noChange;
      directive(this);
    }
    if (this._pendingValue === noChange) {
      return;
    }
    const value = !!this._pendingValue;
    if (this.value !== value) {
      if (value) {
        this.element.setAttribute(this.name, '');
      } else {
        this.element.removeAttribute(this.name);
      }
    }
    this.value = value;
    this._pendingValue = noChange;
  }
}

/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
export class PropertyCommitter extends AttributeCommitter {
  single: boolean;

  constructor(element: Element, name: string, strings: string[]) {
    super(element, name, strings);
    this.single =
        (strings.length === 2 && strings[0] === '' && strings[1] === '');
  }

  protected _createPart(): PropertyPart {
    return new PropertyPart(this);
  }

  _getValue() {
    if (this.single) {
      return this.parts[0].value;
    }
    return super._getValue();
  }

  commit(): void {
    if (this.dirty) {
      this.dirty = false;
      (this.element as any)[this.name] = this._getValue();
    }
  }
}

export class PropertyPart extends AttributePart {}

export class EventPart implements Part {
  element: Element;
  eventName: string;
  value: any = undefined;
  _pendingValue: any = undefined;

  constructor(element: Element, eventName: string) {
    this.element = element;
    this.eventName = eventName;
  }

  setValue(value: any): void {
    this._pendingValue = value;
  }

  commit() {
    while (isDirective(this._pendingValue)) {
      const directive = this._pendingValue;
      this._pendingValue = noChange;
      directive(this);
    }
    if (this._pendingValue === noChange) {
      return;
    }
    if ((this._pendingValue == null) !== (this.value == null)) {
      if (this._pendingValue == null) {
        this.element.removeEventListener(this.eventName, this);
      } else {
        this.element.addEventListener(this.eventName, this);
      }
    }
    this.value = this._pendingValue;
    this._pendingValue = noChange;
  }

  handleEvent(event: Event) {
    if (typeof this.value === 'function') {
      this.value.call(this.element, event);
    } else if (typeof this.value.handleEvent === 'function') {
      this.value.handleEvent(event);
    }
  }
}
