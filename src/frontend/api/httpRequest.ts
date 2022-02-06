'use strict';

import { Channel, Message, AjaxRequestParameters, FetchResponse } from '../../common/types';

class AjaxError extends Error {
  readonly _tag = 'AjaxError';
  constructor(
    readonly status: number,
    readonly statusText: string,
    readonly data: any,
    readonly requestId: string | null
  ) {
    super(`${status}: ${statusText}`);
  }
}
AjaxError.prototype.name = 'AjaxError';

const isNetworkError = (r: FetchResponse): r is TypeError => r instanceof TypeError;

const baseUrl = 'api/';
const currentPath = () => location.href.replace(location.origin, '');

const responseBody = (response: Response) =>
  Promise.resolve(typeof response.json === 'function' ? response.json() : {});

function throwOnNotOk(response: Response) {
  if (response.ok) {
    return response;
  }
  throw response;
}

function toError(response: FetchResponse): Promise<Error> {
  if (isNetworkError(response)) {
    return Promise.resolve(
      new Error('Something went wrong while connecting to the server. Please try again after sometime')
    );
  }

  switch (response.status) {
    case 415:
    case 414:
      return Promise.resolve(new Error('Please ensure that the data sent in the request is not empty.'));
    default:
      return Promise.resolve(new AjaxError(response.status || 500, response.statusText || 'Error', {}, null));
  }
}

export function makeRequest<T>(method: 'GET' | 'POST', params: AjaxRequestParameters): Promise<T> {
  const { path, data, url, contentType, cacheControl } = params;
  const fullUrl = url ? url : `${baseUrl}${path}`;
  return new Promise<T>((resolve, reject) => {
    const headers = Object.entries({
      path: currentPath(),
      'Cache-Control': cacheControl,
      'Content-Type': contentType,
    }).reduce(
      (allHeaders: HeadersInit, [headerKey, headerValue]: Array<string | undefined>) =>
        headerValue ? { ...allHeaders, [headerKey as keyof HeadersInit]: headerValue } : allHeaders,
      {}
    );
    const body = contentType === 'application/json' ? JSON.stringify(data) : data;
    const options = Object.assign(
      {
        method,
        headers: new Headers(headers),
        credentials: 'same-origin' as RequestCredentials,
      },
      method === 'POST' ? { body } : {}
    );

    fetch(fullUrl, options)
      .then(throwOnNotOk)
      .then(responseBody)
      .then(resolve)
      .catch((errorResponse: FetchResponse) => toError(errorResponse).then(reject));
  });
}

const get = <T>(params: AjaxRequestParameters) => makeRequest<T>('GET', params);

const post = <T>(params: AjaxRequestParameters) => makeRequest<T>('POST', params);

export function getChannels(): Promise<Channel[]> {
  return get({ path: 'channels' });
}

export function getChannelMessages(channelId: string): Promise<Message[]> {
  return get({ path: `messages/${channelId}` });
}

export function addMessageToChannel(channelId: string, message: string): Promise<void> {
  return post({
    path: `${channelId}`,
    data: {
      message,
    },
    contentType: 'application/json',
  });
}
