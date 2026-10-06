// "server-only" tira fuera de un Server Component. Los checks que cargan módulos del servidor lo
// importan PRIMERO (antes que cualquier src/): deja un módulo vacío en la caché de require.
// No es un check (no empieza con check_).

import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const req = createRequire(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "package.json"));
const so = req.resolve("server-only");
req.cache[so] = { id: so, filename: so, loaded: true, exports: {} } as NodeJS.Module;
