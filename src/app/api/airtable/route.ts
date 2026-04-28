import { NextRequest, NextResponse } from "next/server";
import { getRecords, createRecord } from "@/lib/airtable";

export async function GET(req: NextRequest) {
  const table = req.nextUrl.searchParams.get("table");
  if (!table) {
    return NextResponse.json({ error: "table param required" }, { status: 400 });
  }

  try {
    const records = await getRecords(table);
    return NextResponse.json({ records });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const table = req.nextUrl.searchParams.get("table");
  if (!table) {
    return NextResponse.json({ error: "table param required" }, { status: 400 });
  }

  try {
    const fields = await req.json();
    const record = await createRecord(table, fields);
    return NextResponse.json({ record }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
