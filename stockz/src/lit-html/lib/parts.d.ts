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
import { TemplateFactory } from './template-factory.js';
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
export declare const noChange: {};
export declare const isPrimitive: (value: any) => boolean;
/**
 * Sets attribute values for AttributeParts, so that the value is only set once
 * even if there are multiple parts for an attribute.
 */
export declare class AttributeCommitter {
    element: Element;
    name: string;
    strings: string[];
    parts: AttributePart[];
    dirty: boolean;
    constructor(element: Element, name: string, strings: string[]);
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    protected _createPart(): AttributePart;
    protected _getValue(): any;
    commit(): void;
}
export declare class AttributePart implements Part {
    committer: AttributeCommitter;
    value: any;
    constructor(comitter: AttributeCommitter);
    setValue(value: any): void;
    commit(): void;
}
export declare class NodePart implements Part {
    templateFactory: TemplateFactory;
    startNode: Node;
    endNode: Node;
    value: any;
    _pendingValue: any;
    constructor(templateFactory: TemplateFactory);
    /**
     * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
     * its next sibling must be static, unchanging nodes such as those that appear
     * in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref: Node): void;
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part: NodePart): void;
    /**
     * Appends this part after `ref`
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref: NodePart): void;
    setValue(value: any): void;
    commit(): void;
    private _insert;
    private _commitNode;
    private _commitText;
    private _commitTemplateResult;
    private _commitIterable;
    private _commitPromise;
    clear(startNode?: Node): void;
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
export declare class BooleanAttributePart implements Part {
    element: Element;
    name: string;
    strings: string[];
    value: any;
    _pendingValue: any;
    constructor(element: Element, name: string, strings: string[]);
    setValue(value: any): void;
    commit(): void;
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
export declare class PropertyCommitter extends AttributeCommitter {
    single: boolean;
    constructor(element: Element, name: string, strings: string[]);
    protected _createPart(): PropertyPart;
    _getValue(): any;
    commit(): void;
}
export declare class PropertyPart extends AttributePart {
}
export declare class EventPart implements Part {
    element: Element;
    eventName: string;
    value: any;
    _pendingValue: any;
    constructor(element: Element, eventName: string);
    setValue(value: any): void;
    commit(): void;
    handleEvent(event: Event): void;
}
