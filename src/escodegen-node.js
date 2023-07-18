import sourceMap from 'source-map';
import { generate } from './escodegen.js';

generate.sourceMapModule = sourceMap;

export * from './escodegen.js';
