import { google } from 'googleapis';

export default async function handler(req, res) {

  const body = req.body;

  try {
    const client = new google.auth.JWT(
      process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, ['https://www.googleapis.com/auth/spreadsheets']
    );

    client.authorize(async function(err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({error: true}));
      }

      const service = google.sheets({version: 'v4', auth: client});
      
      const timestamp = new Date().toLocaleString('en-US');
      const getRows1 = await service.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `Attendee!E1:E1000`,
      });
      const getRows2 = await service.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `Speaker!E1:E1000`,
      });
      const getRows3 = await service.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `Performance!E1:E1000`,
      });

      const rows1 = getRows1.data.values
      const rows2 = getRows2.data.values
      const rows3 = getRows3.data.values
      let rows = rows1.concat(rows2)
      rows.concat(rows3)

      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === body.email) {
          return res.status(201).send('Email already exists')
        }
      }
      
      let values = [];
      if (body.type === 'Attendee') {
        values = [
          timestamp,
          body.type,
          body.fName,
          body.lName,
          body.email,
          body.student,
          body.school,
          body.grade,
          body.appq1,
          body.appq2,
          body.aif
        ]
      } else if (body.type === 'Speaker') {
        values = [
          timestamp,
          body.type,
          body.fName,
          body.lName,
          body.email,
          body.dob,
          body.school,
          body.socials,
          body.idea,
          body.outline,
          body.exp,
          body.why,
          body.accomplishments,
          body.interest,
          body.video,
          body.doc,
          body.aif
        ]
      } else if (body.type === 'Performance') {
        values = [
          timestamp,
          body.type,
          body.fName,
          body.lName,
          body.email,
          body.dob,
          body.school,
          body.socials,
          body.title,
          body.idea,
          body.video,
          body.aif
        ]
      }

      const response = await service.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: `${body.type}!A:Z`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [values]
        },
      });
      
      return res.status(201).json({
        data: response.data,
      })
    });
  } catch (e) {
    return res.status(400).send(JSON.stringify({error: true, message: e.message}));
  }
}
