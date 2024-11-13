declare interface WebSearchSource {
  title?: string;
  link: string;
}
declare interface WebSearchScrapedSource extends WebSearchSource {
  page: WebSearchPage;
}

enum MessageWebSearchUpdateType {
  Update = 'update',
  Error = 'error',
  Sources = 'sources',
  Finished = 'finished',
}
interface BaseMessageWebSearchUpdate<
  TSubType extends MessageWebSearchUpdateType,
> {
  type: MessageUpdateType.WebSearch;
  subtype: TSubType;
}
interface MessageWebSearchErrorUpdate
  extends BaseMessageWebSearchUpdate<MessageWebSearchUpdateType.Error> {
  message: string;
  args?: string[];
}
interface MessageWebSearchGeneralUpdate
  extends BaseMessageWebSearchUpdate<MessageWebSearchUpdateType.Update> {
  message: string;
  args?: string[];
}
interface MessageWebSearchSourcesUpdate
  extends BaseMessageWebSearchUpdate<MessageWebSearchUpdateType.Sources> {
  message: string;
  sources: WebSearchSource[];
}
type MessageWebSearchFinishedUpdate =
  BaseMessageWebSearchUpdate<MessageWebSearchUpdateType.Finished>;
declare type MessageWebSearchUpdate =
  | MessageWebSearchErrorUpdate
  | MessageWebSearchGeneralUpdate
  | MessageWebSearchSourcesUpdate
  | MessageWebSearchFinishedUpdate;
