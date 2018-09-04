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

import {Part} from './parts.js';

const directives = new WeakMap<any, Boolean>();

export interface Directive<P = Part> {
  (part: P): void;
}

export const directive = <P = Part>(f: Directive<P>): Directive<P> => {
  directives.set(f, true);
  return f;
};

export const isDirective = (o: any) => directives.has(o);
