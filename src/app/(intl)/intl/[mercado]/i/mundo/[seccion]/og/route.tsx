import { SLUG_MUNDO } from "@/motor/mundo/rutas";
import { crearOgMundo } from "../../../../_mundo/og";
import { getPorSeccion } from "../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
export const GET = getPorSeccion(SLUG_MUNDO, crearOgMundo);
