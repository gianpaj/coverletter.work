import { collapseString, sanitizeString } from './utils/nlp';
import {
  stringifyHTMLElements,
  stringifyHTMLElementsUnformatted,
} from './utils/stringify';
import {
  MarkdownElementType,
  tagNameMap,
  type HeaderElement,
  type MarkdownElement,
} from './types';
import type { SerializedHTMLElement } from '../scrape/types';

interface ConversionState {
  defaultType:
    | MarkdownElementType.Paragraph
    | MarkdownElementType.BlockQuote
    | MarkdownElementType.UnorderedListItem
    | MarkdownElementType.OrderedListItem;
  listDepth: number;
  blockQuoteDepth: number;
}

/**
 * Converts HTML elements into Markdown elements while maintaining document structure
 *
 * @param parent - The parent HeaderElement that contains this content
 * @param elem - Either a SerializedHTMLElement object or a string representing text content
 * @param prevState - The conversion state from parent elements, tracking list/blockquote nesting
 * @returns A single MarkdownElement or an array of MarkdownElements
 *
 * This function recursively processes HTML elements and converts them to a Markdown representation:
 * - Text nodes are converted based on their parent context (paragraphs, list items, blockquotes)
 * - Headers are converted with appropriate heading levels (h1-h6)
 * - Lists maintain proper nesting depth
 * - Blockquotes track their nesting level
 * - Code blocks preserve formatting
 *
 * The conversion state tracks:
 * - defaultType: The current container type (paragraph, list item, blockquote)
 * - listDepth: Current nesting level for lists
 * - blockQuoteDepth: Current nesting level for blockquotes
 *
 * @example
 * // Converting an h1 element
 * htmlElementToMarkdownElements(parentHeader, {
 *   tagName: 'h1',
 *   content: ['Hello World']
 * });
 * // Returns: { type: 'header', level: 1, content: 'Hello World', ... }
 */
export function htmlElementToMarkdownElements(
  parent: HeaderElement,
  elem: SerializedHTMLElement | string,
  prevState: ConversionState = {
    defaultType: MarkdownElementType.Paragraph,
    listDepth: 0,
    blockQuoteDepth: 0,
  }
): MarkdownElement | MarkdownElement[] {
  // Found text so create an element based on the previous state
  if (typeof elem === 'string') {
    if (elem.trim().length === 0) return [];
    if (
      prevState.defaultType === MarkdownElementType.UnorderedListItem ||
      prevState.defaultType === MarkdownElementType.OrderedListItem
    ) {
      return {
        parent,
        type: prevState.defaultType,
        content: elem,
        depth: prevState.listDepth,
      };
    }
    if (prevState.defaultType === MarkdownElementType.BlockQuote) {
      return {
        parent,
        type: prevState.defaultType,
        content: elem,
        depth: prevState.blockQuoteDepth,
      };
    }
    return { parent, type: prevState.defaultType, content: elem };
  }

  const type = tagNameMap[elem.tagName] ?? MarkdownElementType.Paragraph;

  // Update the state based on the current element
  const state: ConversionState = { ...prevState };
  if (
    type === MarkdownElementType.UnorderedList ||
    type === MarkdownElementType.OrderedList
  ) {
    state.listDepth += 1;
    state.defaultType =
      type === MarkdownElementType.UnorderedList
        ? MarkdownElementType.UnorderedListItem
        : MarkdownElementType.OrderedListItem;
  }
  if (type === MarkdownElementType.BlockQuote) {
    state.defaultType = MarkdownElementType.BlockQuote;
    state.blockQuoteDepth += 1;
  }

  // Headers
  if (type === MarkdownElementType.Header) {
    return {
      parent,
      type,
      level: Number(elem.tagName[1]),
      content: collapseString(stringifyHTMLElements(elem.content)),
      children: [],
    };
  }

  // Code blocks
  if (type === MarkdownElementType.CodeBlock) {
    return {
      parent,
      type,
      content: sanitizeString(stringifyHTMLElementsUnformatted(elem.content)),
    };
  }

  // Typical case, we want to flatten the DOM and only create elements when we see text
  return elem.content.flatMap(el =>
    htmlElementToMarkdownElements(parent, el, state)
  );
}

/**
 * Combines consecutive paragraph elements in an array of markdown elements into single elements.
 * This function is used to consolidate adjacent paragraph elements to create more cohesive content
 * and avoid unnecessary breaks in the text.
 * @param {MarkdownElement[]} elements - Array of markdown elements to process
 * @returns {MarkdownElement[]} Array with adjacent paragraph elements merged
 *
 * @example
 * // Input:
 *  ```
 * [
 *   { type: 'PARAGRAPH', content: 'First ' },
 *   { type: 'PARAGRAPH', content: 'sentence.' },
 *   { type: 'HEADER', content: 'Title' },
 *   { type: 'PARAGRAPH', content: 'New paragraph.' }
 * ]
 * ```
 * // Output:
 * ```
 * [
 *   { type: 'PARAGRAPH', content: 'First sentence.' },
 *   { type: 'HEADER', content: 'Title' },
 *   { type: 'PARAGRAPH', content: 'New paragraph.' }
 * ]
 * ```
 */
export function mergeAdjacentElements(
  elements: MarkdownElement[]
): MarkdownElement[] {
  return elements.reduce<MarkdownElement[]>((acc, elem) => {
    const last = acc[acc.length - 1];
    if (
      last &&
      last.type === MarkdownElementType.Paragraph &&
      last.type === elem.type
    ) {
      last.content += elem.content;
      return acc;
    }
    return [...acc, elem];
  }, []);
}
