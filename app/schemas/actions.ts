export const actionSchema = {
  type: "array",
  items: {
    anyOf: [
      // M365 EXCEL
      {
        description: `
            This is the Excel by M365 action, which allows you to perform actions on an Excel file. The available actions are:
                - create-table-row: creates a new row in the table
                - get-table-row: gets the first row from the table that matches a lookup value in a specific column
                - get-table-rows: gets all rows from the table that match a lookup value in a specific column
                - update-table-row: updates a specific row in the table based on a lookup value in a specific column
          `,
        type: "object",
        properties: {
          app: {
            type: "string",
            enum: ["m365-excel"],
          },
          event: {
            type: "string",
            enum: [
              "create-table-row",
              "get-table-row",
              "get-table-rows",
              "update-table-row",
            ],
          },
        },
      },
      // POSTMAN
      {
        description:
          "This is the Email by Postman action, which allows you to send an email to recipients.",
        type: "object",
        properties: {
          app: {
            type: "string",
            enum: ["postman"],
          },
          event: {
            type: "string",
            enum: ["send-email"],
          },
        },
        required: ["app", "event"],
      },
      // POSTMAN SMS
      {
        description:
          "This is the SMS by Postman action, which allows you to send an SMS to recipients.",
        type: "object",
        properties: {
          app: {
            type: "string",
            enum: ["postman-sms"],
          },
          event: {
            type: "string",
            enum: ["send-sms"],
          },
        },
        required: ["app", "event"],
      },
      // SLACK
    ],
  },
};
