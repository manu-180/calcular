import { SLUG_HORAS } from "@/motor/horas/rutas";
import { crearOgHoras } from "../../../../_horas/og";
import { getPorSeccion } from "../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
export const GET = getPorSeccion(SLUG_HORAS, crearOgHoras);
