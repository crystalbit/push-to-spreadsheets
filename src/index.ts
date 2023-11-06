import { google, sheets_v4 } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];


export class Spreadsheet {
  private sheets: sheets_v4.Sheets;

  constructor(
    private spreadsheetId: string,
    keyFile: string,
  ) {
    const auth = new google.auth.GoogleAuth({
      keyFile: keyFile,
      scopes: SCOPES,
    });
    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async putDataNear(
    sheet: string,
    referenceColumn: string,
    reference: string,
    targetColumn: string,
    data: string,
  ) {
    const readRange = `${sheet}!${referenceColumn}:${referenceColumn}`;
    const readResponse = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: readRange,
    });
    const values = readResponse.data.values;
    let rowIndex = values?.length ?? 0;
    if (values?.length) {
      for (let i = 0; i < values.length; i++) {
        const rowValue = values[i][0]; // Since we're looking at one column, use the first element.
        if (rowValue === reference) {
          rowIndex = i; // The row index in the API is zero-based, matching JavaScript array indexing.
          break;
        }
      }
    }
    if (rowIndex === values?.length) {
      // store new item in reference
      const writeRange = `${sheet}!${referenceColumn}${rowIndex + 1}:${referenceColumn}${rowIndex + 1}`;
    /*const updateResponse =*/ await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: writeRange,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[reference]],
        },
      });
    }
    const writeRange = `${sheet}!${targetColumn}${rowIndex + 1}:${targetColumn}${rowIndex + 1}`;
    /*const updateResponse =*/ await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: writeRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[data]],
      },
    });
  }
};
