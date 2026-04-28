export interface SendWhatsAppOptions {
  to: string;
  message: string;
}

export async function sendWhatsApp(options: SendWhatsAppOptions): Promise<void> {
  const res = await fetch(process.env.WHATSAPP_API_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.WHATSAPP_FROM,
      to: `whatsapp:${options.to}`,
      body: options.message,
    }),
  });

  if (!res.ok) {
    throw new Error(`WhatsApp send failed: ${res.status} ${res.statusText}`);
  }
}
