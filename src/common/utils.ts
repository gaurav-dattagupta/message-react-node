import { Message } from "./types";
import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const getNewId = (allMessages: Message[] = []): number =>
  ((allMessages.pop() || {}).id || 0) + 1;

type TimeFragments = "seconds" | "minutes" | "hours";

const getNewFraction = (numerator: number, denominator: number = 1): number =>
  Math.floor(numerator / denominator);
const isWithinTimeSegment = (
  fraction: number,
  segmentLimit: number = 1
): boolean => fraction < segmentLimit;

const getTimeMessage = (
  timeDiff: number,
  timeBreaks: Record<TimeFragments, string>,
  defaultMessage: string = ""
): string => {
  let segmentedTime = timeDiff;
  try {
    for (const key in timeBreaks) {
      const timeBreakSegments: Array<string> =
        timeBreaks[key as TimeFragments].split("|");
      const timeFraction: number = parseInt(timeBreakSegments[0] || "1", 10);
      const timeLimit: number = parseInt(timeBreakSegments[1] || "1", 10);
      segmentedTime = getNewFraction(segmentedTime, timeFraction);
      if (isWithinTimeSegment(segmentedTime, timeLimit)) {
        return `${segmentedTime} ${key} ago`;
      }
    }
  } catch (e) {
    return defaultMessage;
  }
  return defaultMessage;
};

export const getMessageDateTime = (date: Date, now: Date): string => {
  const created = new Date(date);
  const timeLapsed = new Date(now).getTime() - created.getTime();
  const timeBreaks: Record<TimeFragments, string> = {
    seconds: "1000|60",
    minutes: "60|60",
    hours: "60|24",
  };
  return getTimeMessage(timeLapsed, timeBreaks, created.toLocaleString());
};

const localStateMessages: Record<string, Message[]> = {};

export const getLocalMessages = (channelId: string): Message[] =>
  localStateMessages[channelId] || [];

export const setLocalMessages = (
  channelId: string,
  messages: Message[]
): void => {
  if (messages.length) {
    localStateMessages[channelId] = [...messages];
  }
};
