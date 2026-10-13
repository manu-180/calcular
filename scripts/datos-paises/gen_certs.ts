// Copia los intermedios de scripts/datos-paises/certs/*.pem a lib/certs-embebidos.ts. El cron de
// Vercel (/api/cron/datos-vivos) corre los detectores de los países dentro del bundle de Next, donde
// la carpeta certs/ no viaja: sin la copia, todo detector con tlsTolerante (BCU de Uruguay, entre
// otros) saldría "fuente caída" en el cron. check_datos_paises.ts falla si la copia queda vieja.
// Uso: npx tsx scripts/datos-paises/gen_certs.ts
import { writeFileSync } from "node:fs";
import path from "node:path";
import { textoCertsEmbebidos } from "./lib/certs";

writeFileSync(path.join(__dirname, "lib", "certs-embebidos.ts"), textoCertsEmbebidos());
console.log("ok: scripts/datos-paises/lib/certs-embebidos.ts");
