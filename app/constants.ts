export const APP_MAP = {
  // TRIGGERS
  formsg: "FormSG",
  scheduler: "Scheduler",
  webhook: "Webhook",

  // ACTIONS
  calculator: "Calculator",
  formatter: "Formatter",
  "custom-api": "Custom API",
  delay: "Delay",
  lettersg: "LettersG",
  "m365-excel": "M365 Excel",
  paysg: "PaySG",
  postman: "Postman",
  "postman-sms": "Postman SMS",
  slack: "Slack",
  "telegram-bot": "Telegram Bot",
  tiles: "Tiles",
  toolbox: "Toolbox",
};

export const EVENT_MAP = {
  // TRIGGERS
  // FormSG
  "new-submission": "New submission",

  // Scheduler
  "every-day": "Every day",
  "every-hour": "Every hour",
  "every-week": "Every week",
  "every-month": "Every month",

  // Webhook
  "catch-raw-webhook": "Catch raw webhook",

  // ACTIONS
  // Calculator
  "perform-calculation": "Perform calculation",
  "round-to-decimal-places": "Round to decimal places",

  // Formatter
  "add-subtract-date-time": "Add/subtract date time",
  "convert-date-time": "Convert date time",

  // LetterSG
  "create-letter": "Create letter",

  // M365 Excel
  "create-table-row": "Create table row",
  "get-table-row": "Get table row",
  "get-table-rows": "Get table rows",
  "update-table-row": "Update table row",

  // PaySG
  "create-payment": "Create payment",
  "create-payment-form-submission": "Create payment form submission",
  "create-payment-form-submission-subscription":
    "Create payment form submission subscription",
  "get-payment": "Get payment",
  "send-email": "Send email",

  // Postman
  "send-transactional-email": "Send email",

  // Postman SMS
  "send-sms": "Send SMS",

  // Slack
  "find-message": "Find message",
  "send-message-to-channel": "Send message to channel",

  // Telegram Bot
  "send-message": "Send message",

  // Tiles
  "create-row": "Create row",
  "find-multiple-rows": "Find multiple rows",
  "find-single-row": "Find single row",
  "update-row": "Update row",

  // Toolbox
  "if-then": "If-then",
  "for-each": "For each",
  "only-continue-if": "Only continue if",
};
