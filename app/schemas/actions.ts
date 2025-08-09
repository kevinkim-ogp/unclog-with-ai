export const actionSchema = {
  type: "array",
  items: {
    anyOf: [
      // CUSTOM API
      {
        type: "object",
        description:
          "Custom API action allows you to make a HTTP request to a specified URL, with the option to add headers and JSON body.",
        properties: {
          app: {
            type: "string",
            enum: ["custom-api"],
          },
          event: {
            type: "string",
            enum: ["http-request"],
          },
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
      },
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
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
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
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
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
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
      },
      // SLACK
      // TELEGRAM-BOT
      {
        type: "object",
        properties: {
          app: {
            type: "string",
            enum: ["telegram-bot"],
          },
          event: {
            type: "string",
            enum: ["send-message"],
          },
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
      },
      // TILES
      {
        description: `
            This is the Tiles action, which allows you to perform actions on a Tile. Tiles is a platform designed for storing and sharing flat data, providing a seamless experience similar to using a spreadsheet application like Excel. The available actions are:
                - create-row: creates a new row in the Tile
                - find-single-row: gets the first row from the table that match the filters
                - find-multiple-rows: gets all rows from the table that match the filters
                - update-row: updates a specific row in the table based on the tile row id
          `,
        type: "object",
        properties: {
          app: {
            type: "string",
            enum: ["tiles"],
          },
          event: {
            type: "string",
            enum: [
              "create-row",
              "find-single-row",
              "find-multiple-rows",
              "update-row",
            ],
          },
          description: {
            type: "string",
          },
        },
        required: ["app", "event", "description"],
      },
    ],
  },
};
