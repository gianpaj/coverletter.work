declare interface Page {
  title: string;
  text: string;
  locale?: string;
  markdownTree: SerializedHTMLElement[];
}
