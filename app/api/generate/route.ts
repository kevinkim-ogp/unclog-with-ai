import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { actionSchema } from "@/app/schemas/actions";

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  const ai = new GoogleGenAI({});
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    You are a highly skilled workflow automation expert. Your task is to analyze user requests and construct a valid workflow object based on the provided schema. The workflow must contain a 'trigger' and an array of 'actions'.

    The trigger property must adhere to the following rules:
      - The 'app' must be one of "formsg", "webhook", or "scheduler".
      - The 'event' value depends on the 'app':
        - If the 'app' is "formsg", the 'event' must be "new-submission".
        - If the 'app' is "scheduler", the 'event' must be one of "every-day", "every-hour", "every-week", or "every-month".
        - If the 'app' is "webhook", the 'event' should be a free-form string representing a custom webhook endpoint, such as "catch-raw-webhook".

    The actions property must adhere to the following rules:
      - The 'app' must be one of "calculator", "formatter", "custom-api", "delay", "formatter", "lettersg", "m365-excel", "paysg", "postman", "postman-sms", "slack", "telegram-bot", "tiles", or "toolbox".
      - The 'event' value depends on the 'app':
        - If the 'app' is "calculator", the 'event' must be one of "perform-calculation", or "round-to-decimal-places".
        - If the 'app' is "custom-api", the 'event' must be "http-request".
        - If the 'app' is "delay", the 'event' must be "delay-for", or "delay-until".
        - If the 'app' is "formatter", the 'event' must be one of "add-subtract-date-time", or "convert-date-time".
        - If the 'app' is "lettersg", the 'event' must be "create-letter".
        - If the 'app' is "m365-excel", the 'event' must be one of "create-table-row", "get-table-row", "get-table-rows", or "update-table-row".
        - If the 'app' is "paysg", the 'event' must be one of "create-payment", "create-payment-form-submission", "create-payment-form-submission-subscription", "get-payment", or "send-email".
        - If the 'app' is "postman", the 'event' must be "send-transactional-email".
        - If the 'app' is "postman-sms", the 'event' must be "send-sms".
        - If the 'app' is "slack", the 'event' must be one of "find-message", or "send-message-to-channel".
        - If the 'app' is "telegram-bot", the 'event' must be "send-message".
        - If the 'app' is "tiles", the 'event' must be one of "create-row", "find-multiple-rows", "find-single-row", or "update-row".
        - If the 'app' is "toolbox", the 'event' must be one of "if-then", "for-each", or "only-continue-if".

      Now, create a workflow object based on the user request: ${message}.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          trigger: {
            description: "This is the action that starts the workflow",
            anyOf: [
              {
                description:
                  "This is a scheduler trigger, which starts the workflow at a specified interval based on the event",
                type: "object",
                properties: {
                  app: {
                    type: "string",
                    enum: ["scheduler"],
                  },
                  event: {
                    type: "string",
                    enum: ["every-day", "every-hour", "every-week"],
                  },
                },
                required: ["app", "event"],
              },
              {
                description:
                  "This is a webhook trigger, which starts the workflow when a webhook is received",
                type: "object",
                properties: {
                  app: {
                    type: "string",
                    enum: ["webhook"],
                  },
                  event: {
                    type: "string",
                    enum: ["catch-raw-webhook"],
                  },
                },
                required: ["app", "event"],
              },
              {
                description:
                  "This is a formsg trigger, which starts the workflow when a new submission is received",
                type: "object",
                properties: {
                  app: {
                    type: "string",
                    enum: ["formsg"],
                  },
                  event: {
                    type: "string",
                    enum: ["new-submission"],
                  },
                },
                required: ["app", "event"],
              },
            ],
          },
          actions: actionSchema,
        },
        propertyOrdering: ["trigger", "actions"],
      },
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    },
  });

  console.log(message);
  console.log(response.text);

  //   const response = await genai.generateContent(message);
  //   const response = message;

  return NextResponse.json({
    input: message,
    output: response.text,
  });
}
