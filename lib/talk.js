/**
 * Configurazione dei plugin e delle loro permissioni
 */

// Plugin sempre attivi indipendentemente da modalità admin
export const allowedPlugins = [
    'fun-bestemmiometro.js',
    // Aggiungi qui altri plugin che devono essere sempre attivi
];

// Plugin che richiedono la modalità talk attivata
export const talkPlugins = [
    'risposta-bot.js',
    'risposta-giurida.js',
    'risposta-amo.js',
    'risposta-basta.js',
    'risposta-buongiorno.js',
    'risposta-buonasera.js',
    'risposta-buonanotte.js',
    'risposta-minaccia.js',
    'risposta-napoli.js',
    'risposta-ok.js',
    'gp-insulto.js',
    'risposta-phishy.js',
    'risposta-rimasto.js',
    'risposta-segreto.js',
    'risposta-vaffanculo.js',
    'menzione-insulti-random.js',
    'audio-tutti.js'
    // Aggiungi qui altri plugin che richiedono talk attivato
];

/**
 * Verifica se un plugin deve essere eseguito in base alla configurazione del gruppo
 * @param {string} pluginName - Nome del plugin da verificare
 * @param {boolean} adminMode - Se la modalità admin è attiva
 * @param {boolean} talkMode - Se la modalità talk è attiva
 * @param {boolean} isAdmin - Se l'utente è admin
 * @param {boolean} isOwner - Se l'utente è proprietario
 * @param {boolean} isROwner - Se l'utente è proprietario reale
 * @param {boolean} isGroup - Se il messaggio è in un gruppo
 * @returns {boolean} Se il plugin deve essere eseguito
 */
export function shouldRunPlugin(pluginName, adminMode, talkMode, isAdmin, isOwner, isROwner, isGroup) {
    // Debug log
    console.log('Valutazione plugin:', {
        plugin: pluginName,
        adminMode,
        talkMode,
        isAdmin,
        isOwner,
        isGroup,
        isTalkPlugin: talkPlugins.includes(pluginName),
        isAllowedPlugin: allowedPlugins.includes(pluginName)
    });
    
    // Verifica se il plugin è nella lista dei plugin talk
    const isTalkPlugin = talkPlugins.includes(pluginName);
    // Verifica se il plugin è nella lista dei plugin sempre permessi
    const isAllowedPlugin = allowedPlugins.includes(pluginName);
    
    // Se non è in un gruppo, esegui sempre (messaggio privato)
    if (!isGroup) return true;
    
    // Se è owner, esegui sempre
    if (isOwner || isROwner) return true;
    
    // Se è un plugin talk e talk è disattivato, blocca
    if (isTalkPlugin && !talkMode) {
        console.log('⛔ BLOCCATO: Plugin richiede talk ma talk è disattivato:', pluginName);
        return false;
    }
    
    // Se modalità admin è attiva, controlla se l'utente è admin o se il plugin è sempre consentito
    if (adminMode && !isAdmin && !isAllowedPlugin) {
        console.log('Bloccato per modoadmin:', pluginName);
        return false;
    }
    
    // Se passa tutti i controlli, il plugin è consentito
    console.log('✅ Permesso:', pluginName);
    return true;
}