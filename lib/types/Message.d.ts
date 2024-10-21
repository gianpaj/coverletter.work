// FIXME: import CoreMessage from 'ai' package but don't break the type declaration by using the 'import' keyword
declare type Message = CoreMessage & {
  id: string;
};
