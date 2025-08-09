export const triggerSchema = {
  description: "This is the action that starts the workflow",
  anyOf: [
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
        description: {
          type: "string",
        },
      },
      required: ["app", "event", "description"],
    },
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
        description: {
          type: "string",
        },
      },
      required: ["app", "event", "description"],
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
  ],
};
