import { NextRequest, NextResponse } from "next/server";
import { sendWhatsApp } from "@/lib/whatsapp";
import { welcomeWhatsAppTemplate } from "@/templates/whatsapp/welcome";
import { notificationWhatsAppTemplate } from "@/templates/whatsapp/notification";
import { reminderWhatsAppTemplate } from "@/templates/whatsapp/reminder";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, to, ...data } = body;

    let message: string;

    switch (type) {
      case "welcome":
        message = welcomeWhatsAppTemplate(data);
        break;
      case "notification":
        message = notificationWhatsAppTemplate(data);
        break;
      case "reminder":
        message = reminderWhatsAppTemplate(data);
        break;
      default:
        return NextResponse.json({ error: "Invalid WhatsApp type" }, { status: 400 });
    }

    await sendWhatsApp({ to, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
