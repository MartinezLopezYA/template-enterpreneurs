export interface WelcomeWhatsAppData {
  name: string;
  loginUrl?: string;
}

export function welcomeWhatsAppTemplate(data: WelcomeWhatsAppData): string {
  return [
    `👋 ¡Hola, *${data.name}*!`,
    ``,
    `Tu cuenta ha sido creada exitosamente. Estamos felices de tenerte con nosotros.`,
    data.loginUrl ? `\n🔗 Accede aquí: ${data.loginUrl}` : "",
    ``,
    `Si tienes dudas, no dudes en escribirnos. 😊`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}
