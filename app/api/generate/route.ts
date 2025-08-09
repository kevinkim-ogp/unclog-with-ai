import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { actionSchema } from "@/app/schemas/actions";
import { triggerSchema } from "@/app/schemas/triggers";

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

    Additional information for the trigger:
      - If the trigger is unclear, you should prioritise formsg over webhook.
      - If there is mention of integration as the start of the workflow, the trigger is most likely a webhook.
      - Most reminder workflows start with a scheduler trigger.
      - As much as possible, try to consider all other triggers before using a webhook.

    The actions property must adhere to the following rules:
      - The 'app' must be one of "calculator", "formatter", "custom-api", "delay", "formatter", "lettersg", "m365-excel", "paysg", "postman", "postman-sms", "slack", "telegram-bot", "tiles", or "toolbox".
      - The 'event' value depends on the 'app':
        - If the 'app' is "calculator", the 'event' must be one of "perform-calculation", or "round-to-decimal-places".
        - If the 'app' is "custom-api", the 'event' must be "http-request".
        - If the 'app' is "delay", the 'event' must be "delay-for", or "delay-until".
        - If the 'app' is "formatter", the 'event' must be one of "add-subtract-date-time", or "convert-date-time".
        - If the 'app' is "lettersg", the 'event' must be "create-letter".
          - lettersg is a tool that enables users to easily create and send official, personalised e-letters and certifications either via PDFs or links.
        - If the 'app' is "m365-excel", the 'event' must be one of "create-table-row", "get-table-row", "get-table-rows", or "update-table-row".
        - If the 'app' is "paysg", the 'event' must be one of "create-payment", "create-payment-form-submission", "create-payment-form-submission-subscription", "get-payment", or "send-email".
          - PaySG is a simplified payment collections system for government agencies.
          - "create-payment" is used to create a new payment.
          - "create-payment-form-submission" is used to create a new submission for a payment form for one-time payment, and initiate a payment request.
          - "create-payment-form-submission-subscription" is used to create a new payment form submission for subscriptions, and initiate a payment request.
          - "get-payment" is used to get details of a payment that has previously been created.
          - "send-email" is used to send email to payee for a payment that has previously been created.
        - If the 'app' is "postman", the 'event' must be "send-transactional-email".
        - If the 'app' is "postman-sms", the 'event' must be "send-sms".
        - If the 'app' is "slack", the 'event' must be one of "find-message", or "send-message-to-channel".
        - If the 'app' is "telegram-bot", the 'event' must be "send-message".
        - If the 'app' is "tiles", the 'event' must be one of "create-row", "find-multiple-rows", "find-single-row", or "update-row".
        - If the 'app' is "toolbox", the 'event' must be one of "if-then", "for-each", or "only-continue-if".

      Constraints for actions:
        - The "delay" action must not be used after a "for-each" action.
        - The "if-then" action must not have a "for-each" action after it.
        - The "if-then" action is simply a logical condition helper and should have actions after it to perform the follow-up action.
          Given a scenario where if option A, then send email; if option B, then send SMS; if option C, then send telegram:
          1. "if-then" action for condition A.
          2. "send-email" action for condition A.
          3. "if-then" action for condition B.
          4. "send-sms" action for condition B.
          5. "if-then" action for condition C.
          6. "send-telegram" action for condition C.
        - The "only-continue-if" action is a logical conditional helper. If the condition is true, then continue with the next action, otherwise, the workflow will stop.

      Additional information for actions:
        - If sending reminder is unclear, the priority is to use: email, then SMS, then telegram.
        - The "for-each" action is used to loop through a list of items that is passed to it. Any actions added after the "for-each" action will be executed for each item in the list.
        - Usually routing queries require the use of "if-then" actions, and there are usually actions after the "if-then" action.

      The description property in both trigger and actions must be a short description of which part of the workflow this action addresses.

      Now, create a workflow object based on the user request: ${message}.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          trigger: triggerSchema,
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

  return NextResponse.json({
    input: message,
    output: response.text,
  });
}
