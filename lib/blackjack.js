let handler = async (m, { conn, usedPrefix, command, text }) => {
    // Inizializza il gioco se non esiste
    conn.blackjack = conn.blackjack || {};

    // Se l'utente scrive .blackjack, inizia una nuova partita
    if (command === 'blackjack') {
        if (conn.blackjack[m.sender]) {
            return await m.reply(`Hai già una partita in corso! Scrivi *${usedPrefix}pesca* per pescare una carta o *${usedPrefix}ferma* per fermarti.`);
        }

        let deck = generateDeck();
        let playerHand = [drawCard(deck), drawCard(deck)];
        let dealerHand = [drawCard(deck), drawCard(deck)];
        let playerSum = calculateHand(playerHand);
        let dealerSum = calculateHand(dealerHand);

        // Salva lo stato del gioco
        conn.blackjack[m.sender] = {
            deck,
            playerHand,
            dealerHand,
            playerSum,
            dealerSum,
            gameOver: false
        };

        let message = `🃏 ┃ 𝐁𝐋𝐀𝐂𝐊𝐉𝐀𝐂𝐊\n\n`;
        message += `Le tue carte: ${formatHand(playerHand)} (Totale: ${playerSum})\n`;
        message += `Carta del banco: ${dealerHand[0]} ?\n\n`;
        message += `Scrivi *${usedPrefix}pesca* per pescare una carta o *${usedPrefix}ferma* per fermarti.`;

        return await m.reply(message);
    }

    // Se l'utente scrive .pesca
    if (command === 'pesca') {
        if (!conn.blackjack[m.sender]) {
            return await m.reply(`Non hai una partita in corso. Scrivi *${usedPrefix}blackjack* per iniziare.`);
        }

        let game = conn.blackjack[m.sender];
        if (game.gameOver) {
            return await m.reply(`La partita è già terminata. Scrivi *${usedPrefix}blackjack* per iniziare una nuova partita.`);
        }

        // Pesca una carta
        game.playerHand.push(drawCard(game.deck));
        game.playerSum = calculateHand(game.playerHand);

        if (game.playerSum > 21) {
            game.gameOver = true;
            await m.reply(`Hai sballato! Le tue carte: ${formatHand(game.playerHand)} (Totale: ${game.playerSum})\nHai perso!`);
            delete conn.blackjack[m.sender]; // Elimina lo stato del gioco
            return;
        }

        return await m.reply(`Le tue carte: ${formatHand(game.playerHand)} (Totale: ${game.playerSum})\nScrivi *${usedPrefix}pesca* per pescare una carta o *${usedPrefix}ferma* per fermarti.`);
    }

    // Se l'utente scrive .ferma o .fermo
    if (command === 'ferma' || command === 'fermo') {
        if (!conn.blackjack[m.sender]) {
            return await m.reply(`Non hai una partita in corso. Scrivi *${usedPrefix}blackjack* per iniziare.`);
        }

        let game = conn.blackjack[m.sender];
        if (game.gameOver) {
            return await m.reply(`La partita è già terminata. Scrivi *${usedPrefix}blackjack* per iniziare una nuova partita.`);
        }

        game.gameOver = true;

        // Il banco pesca carte fino a raggiungere almeno 17
        while (game.dealerSum < 17) {
            game.dealerHand.push(drawCard(game.deck));
            game.dealerSum = calculateHand(game.dealerHand);
        }

        let message = `🃏 ┃ 𝐁𝐋𝐀𝐂𝐊𝐉𝐀𝐂𝐊\n\n`;
        message += `Le tue carte: ${formatHand(game.playerHand)} (Totale: ${game.playerSum})\n`;
        message += `Carte del banco: ${formatHand(game.dealerHand)} (Totale: ${game.dealerSum})\n\n`;

        if (game.dealerSum > 21 || game.playerSum > game.dealerSum) {
            message += `Hai vinto! 🎉`;
        } else if (game.playerSum === game.dealerSum) {
            message += `Pareggio!`;
        } else {
            message += `Hai perso! 🤡`;
        }

        await m.reply(message);
        delete conn.blackjack[m.sender]; // Elimina lo stato del gioco
    }
}

// Funzioni di supporto
function generateDeck() {
    let suits = ['♠', '♣', '♥', '♦'];
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push(`${value}${suit}`);
        }
    }
    return shuffle(deck);
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawCard(deck) {
    return deck.pop();
}

function calculateHand(hand) {
    let sum = 0;
    let aces = 0;
    for (let card of hand) {
        let value = card.slice(0, -1);
        if (value === 'A') {
            sum += 11;
            aces++;
        } else if (['J', 'Q', 'K'].includes(value)) {
            sum += 10;
        } else {
            sum += parseInt(value);
        }
    }
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

function formatHand(hand) {
    return hand.join(' ');
}

// Comandi supportati
handler.help = ['blackjack', 'pesca', 'ferma', 'fermo']
handler.tags = ['game']
handler.command = ['blackjack', 'pesca', 'ferma', 'fermo']

export default handler;