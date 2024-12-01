import { google } from "googleapis";
import { NextResponse } from "next/server";

// Initialize the Google Sheets API client
const sheets = google.sheets({ version: "v4" });

// Authenticate with the Google Sheets API
const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  ["https://www.googleapis.com/auth/spreadsheets"]
);

export async function POST(req) {
  try {
    const { answers, userInfo, reward } = await req.json(); // Parse JSON body from request

    // Validate the incoming data
    if (!answers || !userInfo || !reward) {
      return NextResponse.json({
        message: "Missing required data",
        status: 400,
      });
    }

    // Flatten the answers object into an array, handling arrays by joining them with a delimiter
    const answerValues = Object.values(answers).map((answer) =>
      Array.isArray(answer) ? answer.join(", ") : answer
    );

    console.log("answer", answers);
    console.log("val", answerValues);

    // Prepare the row data
    const rowData = [
      ...answerValues,
      userInfo.email,
      reward.title,
      reward.offer,
      new Date().toISOString(), // Timestamp
    ];

    // Append the row to the Google Sheet
    const appendResponse = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A2:Z", // Start from A2 to skip the header row
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS", // This ensures new data is always added as a new row
      resource: {
        values: [rowData],
      },
    });

    return NextResponse.json({
      message: "Survey submitted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting survey:", error);

    // Check if it's a Google API error
    if (error.code === 403) {
      return NextResponse.json({
        message:
          "Access denied. Please check your Google Sheets API credentials.",
        status: 403,
      });
    }

    if (error.code === 404) {
      return NextResponse.json({
        message: "Google Sheet not found. Please check your Sheet ID.",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "An error occurred while submitting the survey",
      status: 500,
    });
  }
}
