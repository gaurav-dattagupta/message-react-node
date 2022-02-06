export interface Channel {
  id: string;
  name: string;
}

export interface Message {
  id: number | null;
  text: string;
  created: Date;
  author: string;
  active: boolean;
}

export interface AjaxRequestParameters {
  path: string;
  data?: any;
  timeout?: number;
  url?: string;
  contentType?: string;
  cacheControl?: string;
}

export type FetchResponse = Response | TypeError;
