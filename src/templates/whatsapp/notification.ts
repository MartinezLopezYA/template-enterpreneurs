export interface NotificationWhatsAppData {
  name: string;
  title: string;
  message: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function notificationWhatsAppTemplate(data: NotificationWhatsAppData): string {
  return [
    `🔔 *${data.title}*`,
    ``,
    `Hola, *${data.name}*.`,
    ``,
    data.message,
    data.ctaLabel && data.ctaUrl ? `\n👉 ${data.ctaLabel}: ${data.ctaUrl}` : "",
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}
