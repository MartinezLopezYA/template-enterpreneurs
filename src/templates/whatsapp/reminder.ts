export interface ReminderWhatsAppData {
  name: string;
  eventName: string;
  date: string;
  location?: string;
  url?: string;
}

export function reminderWhatsAppTemplate(data: ReminderWhatsAppData): string {
  return [
    `⏰ *Recordatorio: ${data.eventName}*`,
    ``,
    `Hola, *${data.name}*. Te recordamos que tienes pendiente:`,
    ``,
    `📅 *Evento:* ${data.eventName}`,
    `🗓 *Fecha:* ${data.date}`,
    data.location ? `📍 *Lugar:* ${data.location}` : "",
    data.url ? `🔗 *Más info:* ${data.url}` : "",
    ``,
    `¡No lo olvides! 💪`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}
