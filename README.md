# simple-google-spreadsheets
Limited functionality google spreadsheets lib for JavaScript and TypeScript

# Instruction
Package aim is to push data to a Google Spreadsheet you first need a service account.

### Methods
For now there is only one method: `putDataNear(sheet: string, referenceColumn: string, reference: string, targetColumn: string, data: string): Promise<void>;`  

It puts data in `targetColumn` in same row eith `referenceColumn`. It tries to find `reference` value and if doesn't find, it creates a new row with `reference` and `data`.

### How to get it and connect to google table:
1. Create a Google Cloud Platform Project:

- Go to the [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project.
2. Enable the Google Sheets API for Your Project:

- In the Cloud Console, navigate to the "API & Services > Dashboard" panel.
- Click "+ ENABLE APIS AND SERVICES".
- Search for "Google Sheets API", select it, and enable it for your project.
3. Create Credentials:

- In the Cloud Console, go to "API & Services > Credentials".
- Click "Create credentials" and choose "Service account" for server-to-server interactions.
- Fill in the service account details and grant it a role with the appropriate access (e.g., "Editor").
- Create a JSON key for this service account, which will be downloaded to your system. This file contains your client ID, private key, and other important information.
4. Share Your Spreadsheet with Your Service Account:

- Open your Google spreadsheet.
- Share it with the email address of the service account you created (it will end with @...gserviceaccount.com).

## Then install this package
`npm i push-to-spreadsheets`

## Then use it to put data in the table
Example table:  
<img width="577" alt="image" src="https://github.com/crystalbit/push-to-spreadsheets/assets/12694644/f5f6cad4-8cc8-4ddc-9ee7-6848c0d28036">  
Header here was made manually.

Code:
```TypeScript
import { Spreadsheet } from "push-to-spreadsheets";

const spreadsheet = new Spreadsheet('eA.....', 'src/constants/google-service-acc.json');

await spreadsheet.putDataNear('Sheet1', 'A', '08.11.2023 00', 'B', '108');
await spreadsheet.putDataNear('Sheet1', 'A', '08.11.2023 00', 'C', '79');

await spreadsheet.putDataNear('Sheet1', 'A', '08.11.2023 01', 'B', '79');
await spreadsheet.putDataNear('Sheet1', 'A', '08.11.2023 01', 'C', '62');
```

Here:
- `eA.....` is identifier from url to your spreadsheet `https://docs.google.com/spreadsheets/d/<here>`
-  `src/constants/google-service-acc.json` - your credentials file
-  `Sheet1` - name of your sheet in the document
-  A, B, C - vertical column names

## Known problems
- Errors are not caught
- Only one limited method
  
