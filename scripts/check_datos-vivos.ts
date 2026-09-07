// Verificación del detector de deriva (src/lib/datos-vivos.ts).
// Correr con: npx tsx scripts/check_datos-vivos.ts
//
// POR QUÉ DELEGA EN VEZ DE TENER SUS PROPIOS CASOS: la suite real ya existía en
// tools/datos-vivos-test.ts (24 casos: bandas de sanidad, salto brusco, fuente caída, shape del
// BCRA) pero vivía fuera de scripts/, así que check-all.ts NO la corría y la lib llegaba a un
// deploy sin ningún gate que la frenara. Duplicar los casos acá los dejaría desincronizados; este
// archivo existe para que el runner los descubra. Los casos nuevos van en tools/datos-vivos-test.ts.
//
// Sin --vivo a propósito: los checks no pegan contra BCRA ni INDEC (un organismo caído no puede
// pintar de rojo un gate de pre-deploy).

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raizRepo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const r = spawnSync("npx -y tsx tools/datos-vivos-test.ts", {
  cwd: raizRepo,
  shell: true,
  encoding: "utf8",
});

process.stdout.write(`${r.stdout ?? ""}${r.stderr ?? ""}`);
process.exit(r.status === 0 ? 0 : 1);
