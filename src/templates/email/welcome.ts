export interface WelcomeEmailData {
  name: string;
  email: string;
  loginUrl?: string;
}

export function welcomeEmailTemplate(data: WelcomeEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenido</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #2563eb; color: #fff; padding: 32px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 32px; color: #374151; }
    .body p { line-height: 1.6; }
    .btn { display: inline-block; margin-top: 24px; padding: 12px 32px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
    .footer { padding: 16px 32px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>¡Bienvenido, ${data.name}!</h1>
    </div>
    <div class="body">
      <p>Hola <strong>${data.name}</strong>,</p>
      <p>Tu cuenta ha sido creada exitosamente con el correo <strong>${data.email}</strong>.</p>
      <p>Estamos emocionados de tenerte con nosotros. Puedes acceder a tu cuenta desde el siguiente botón:</p>
      ${data.loginUrl ? `<a href="${data.loginUrl}" class="btn">Acceder a mi cuenta</a>` : ""}
    </div>
    <div class="footer">
      <p>Si no creaste esta cuenta, ignora este correo.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
