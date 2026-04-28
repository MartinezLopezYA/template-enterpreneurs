import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { welcomeEmailTemplate } from "@/templates/email/welcome";
import { notificationEmailTemplate } from "@/templates/email/notification";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, to, ...data } = body;

    let html: string;

    switch (type) {
      case "welcome":
        html = welcomeEmailTemplate(data);
        break;
      case "notification":
        html = notificationEmailTemplate(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    await sendEmail({ to, subject: data.subject ?? "Notificación", html });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
