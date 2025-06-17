const commands = [];

/**
 * Registra un comando nel sistema.
 * @param {Object} info - Informazioni sul comando.
 * @param {Function} func - Funzione da eseguire.
 * @returns {Object} - Il comando registrato.
 */
function cmd(info, func) {
  const data = info;
  data.function = func;
  if (!data.dontAddCommandList) data.dontAddCommandList = false;
  if (!data.desc) data.desc = '';
  if (!data.fromMe) data.fromMe = false;
  if (!data.category) data.category = 'misc';
  if (!data.filename) data.filename = "Non Specificato";

  commands.push(data);
  return data;
}

export {
  cmd,
  cmd as AddCommand,
  cmd as Function,
  cmd as Module,
  commands
};
