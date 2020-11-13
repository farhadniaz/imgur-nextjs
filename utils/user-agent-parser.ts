import UserAgentParser from "ua-parser-js";
import { NextPageContext } from "next";

export default function (context?: NextPageContext) {
  let uaString = "";
  if (context.req) {
    uaString = context.req.headers["user-agent"];
  } else if (typeof window !== "undefined") {
    uaString = window.navigator.userAgent;
  }

  return UserAgentParser(uaString);
}
