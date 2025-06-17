export function evaluateHand(cards) {
    const values = "23456789TJQKA";
    const suits = {};
    const counts = {};
    let isFlush = true;
    let isStraight = false;
    
    // Ordinare le carte in base al valore
    const sortedValues = cards.map(c => c[0]).sort((a, b) => values.indexOf(a) - values.indexOf(b));
    
    // Popolare i conteggi
    cards.forEach(card => {
        const value = card[0];
        const suit = card[1];
        counts[value] = (counts[value] || 0) + 1;
        if (!suits[suit]) suits[suit] = 0;
        suits[suit]++;
    });
    
    // Controllo scala
    for (let i = 0; i < sortedValues.length - 1; i++) {
        if (values.indexOf(sortedValues[i + 1]) !== values.indexOf(sortedValues[i]) + 1) {
            isStraight = false;
            break;
        } else {
            isStraight = true;
        }
    }
    
    // Controllo colore (flush)
    isFlush = Object.keys(suits).length === 1;
    
    // Conta le occorrenze delle carte
    const countValues = Object.values(counts).sort((a, b) => b - a);
    
    if (isStraight && isFlush) return { rank: 8, name: "Scala reale o scala colore" };
    if (countValues.includes(4)) return { rank: 7, name: "Poker" };
    if (countValues.includes(3) && countValues.includes(2)) return { rank: 6, name: "Full" };
    if (isFlush) return { rank: 5, name: "Colore" };
    if (isStraight) return { rank: 4, name: "Scala" };
    if (countValues.includes(3)) return { rank: 3, name: "Tris" };
    if (countValues.filter(c => c === 2).length === 2) return { rank: 2, name: "Doppia coppia" };
    if (countValues.includes(2)) return { rank: 1, name: "Coppia" };
    return { rank: 0, name: "Carta alta" };
}
