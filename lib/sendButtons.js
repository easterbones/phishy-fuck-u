export async function sendButtonMessage(conn, jid, testo, footer, bottoni, quoted = null) {
  const sections = [
    {
      title: footer,
      rows: bottoni.map(btn => ({
        title: btn.text,
        rowId: btn.id
      }))
    }
  ]

  const listMessage = {
    text: testo,
    footer: footer,
    title: '',
    buttonText: 'Scegli',
    sections
  }

  await conn.sendMessage(jid, listMessage, { quoted })
}
