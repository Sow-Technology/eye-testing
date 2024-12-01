import dbConnect from "@/lib/dbConnect";
import MedicalHistory from "@/lib/MedicalHistory";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();
    console.log(reqBody);
    await dbConnect();
    const medicalHistory = await MedicalHistory.create({ ...reqBody });
    console.log(medicalHistory);
    return NextResponse.json({ success: true, data: medicalHistory });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
