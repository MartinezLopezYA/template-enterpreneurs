export interface NotificationEmailData {
  name: string;
  subject: string;
  message: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function notificationEmailTemplate(data: NotificationEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.subject}</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #1e40af; color: #fff; padding: 24px 32px; }
    .header h2 { margin: 0; font-size: 20px; }
    .body { padding: 32px; color: #374151; line-height: 1.6; }
    .message-box { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; margin: 16px 0; }
    .btn { display: inline-block; margin-top: 24px; padding: 12px 32px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .footer { padding: 16px 32px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${data.subject}</h2>
    </div>
    <div class="body">
      <p>Hola <strong>${data.name}</strong>,</p>
      <div class="message-box">
        <p style="margin:0">${data.message}</p>
      </div>
      ${data.ctaLabel && data.ctaUrl ? `<a href="${data.ctaUrl}" class="btn">${data.ctaLabel}</a>` : ""}
    </div>
    <div class="footer">
      <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
