let handler = async (m, { conn, args, isOwner, isPremium }) => {
    // Verifica se l'utente è autorizzato (proprietario o premium)
    if (!isOwner && !isPremium) {
        return m.reply('Solo il proprietario o gli utenti premium possono usare questo comando.');
    }

    // Prosegui con il comando se l'utente è autorizzato
    let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    if (!who) return m.reply('Devi menzionare un utente o rispondere a un messaggio!');
    if (!(who in global.db.data.users)) return m.reply('L\'utente non è nel database del gioco.');

    let user = global.db.data.users[who];
    let amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return m.reply('Inserisci un numero valido di dolci da aggiungere!');

    user.uova += amount;
    m.reply(`✅ sei salito di ${amount} uova/i  @${who.split('@')[0]}. Ora sei arrivato a *${user.uova}*!`, null, { mentions: [who] });
};

handler.command = ['add-uova'];
export default handler;
