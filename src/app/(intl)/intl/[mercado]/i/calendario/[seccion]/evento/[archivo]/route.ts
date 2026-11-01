import { SLUG_CALENDARIO } from "@/motor/calendario/slugs";
import { crearIcsEvento } from "../../../../../_calendario/ics";
import { getPorSeccion } from "../../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
export const revalidate = 86400;
export const GET = getPorSeccion(SLUG_CALENDARIO, crearIcsEvento);
