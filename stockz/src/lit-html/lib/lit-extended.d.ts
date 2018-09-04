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
import { Part } from './parts.js';
import { TemplateProcessor } from './template-processor.js';
import { SVGTemplateResult, TemplateResult } from './template-result.js';
export { BooleanAttributePart, EventPart } from './parts.js';
export { render } from './render.js';
/**
 * Interprets a template literal as a lit-extended HTML template.
 */
export declare const html: (strings: TemplateStringsArray, ...values: any[]) => TemplateResult;
/**
 * Interprets a template literal as a lit-extended SVG template.
 */
export declare const svg: (strings: TemplateStringsArray, ...values: any[]) => SVGTemplateResult;
/**
 * A PartCallback which allows templates to set properties and declarative
 * event handlers.
 *
 * Properties are set by default, instead of attributes. Attribute names in
 * lit-html templates preserve case, so properties are case sensitive. If an
 * expression takes up an entire attribute value, then the property is set to
 * that value. If an expression is interpolated with a string or other
 * expressions then the property is set to the string result of the
 * interpolation.
 *
 * To set an attribute instead of a property, append a `$` suffix to the
 * attribute name.
 *
 * Example:
 *
 *     html`<button class$="primary">Buy Now</button>`
 *
 * To set an event handler, prefix the attribute name with `on-`:
 *
 * Example:
 *
 *     html`<button on-click=${(e)=> this.onClickHandler(e)}>Buy Now</button>`
 *
 * @deprecated Please use /lit-html.js instead. lit-extended will be removed in
 *     a future version.
 */
export declare class LitExtendedTemplateProcessor extends TemplateProcessor {
    handleAttributeExpressions(element: Element, name: string, strings: string[]): Part[];
}
export declare const templateProcessor: LitExtendedTemplateProcessor;
