export function evaluateHand(cards) {
    const ranks = "23456789TJQKA";
    const suits = {};
    const rankCounts = {};
    
    cards.forEach(card => {
        const rank = card[0];
        const suit = card[1];
        
        suits[suit] = (suits[suit] || 0) + 1;
        rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    });
    
    const rankValues = Object.keys(rankCounts).map(rank => ranks.indexOf(rank)).sort((a, b) => a - b);
    const isFlush = Object.values(suits).some(count => count === 5);
    const isStraight = rankValues.length === 5 && rankValues[4] - rankValues[0] === 4;
    
    if (isStraight && isFlush) return "Scala colore";
    if (Object.values(rankCounts).includes(4)) return "Poker";
    if (Object.values(rankCounts).includes(3) && Object.values(rankCounts).includes(2)) return "Full";
    if (isFlush) return "Colore";
    if (isStraight) return "Scala";
    if (Object.values(rankCounts).includes(3)) return "Tris";
    if (Object.values(rankCounts).filter(count => count === 2).length === 2) return "Doppia coppia";
    if (Object.values(rankCounts).includes(2)) return "Coppia";
    
    return "Carta alta";
}
