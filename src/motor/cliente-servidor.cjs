// Loader de Turbopack (ver turbopack.rules en next.config.ts): del lado del servidor, cada
// src/paises/<m>/calculadoras/<slug>.cliente.tsx pasa a ser un componente vacío sin "use client".
// Así no genera una referencia de cliente y su JS no se suma a todas las páginas intl.
module.exports = function clienteDelLadoDelServidor() {
  return "export default function ClienteSoloNavegador() {\n  return null;\n}\n";
};
