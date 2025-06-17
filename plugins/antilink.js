let handler = async (m, { conn, isBotAdmin, isAdmin }) => {
  // Verifica se è un messaggio in gruppo
  if (!m.isGroup) return;
  // Verifica se il bot è admin
  if (!isBotAdmin) return;

  // Controlla se il messaggio contiene un link di gruppo WhatsApp
  if (/chat\.whsatsapp\.com\/[A-Za-z0-9]{20,24}/i.test(m.text)) {
    // Evita di bannare se chi lo manda è admin (opzionale)
    if (isAdmin) return;

    try {
      await conn.sendMessage(m.chat, {
        text: `🚫 Link di gruppo rilevato!\n@${m.sender.split('@')[0]} sei stato bannato.`,
        mentions: [m.sender]
      });
      await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    } catch (err) {
      console.error("Errore durante il ban:", err);
    }
  }
};

handler.customPrefix = /chat\.whatsapp\.com\/[A-Za-z0-9]{20,24}/i;
handler.command = new RegExp; // nessun comando, reagisce solo al messaggio
handler.group = true;
handler.register = true;
handler.before = true;

export default handler;
