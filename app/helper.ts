import { APP_MAP, EVENT_MAP } from "./constants";

export const getAppName = (app: string) => {
  return APP_MAP[app as keyof typeof APP_MAP];
};

export const getEventName = (event: string) => {
  return EVENT_MAP[event as keyof typeof EVENT_MAP];
};
