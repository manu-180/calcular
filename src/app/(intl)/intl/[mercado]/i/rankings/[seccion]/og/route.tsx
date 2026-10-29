import { SLUG_RANKINGS } from "@/motor/rankings/rutas";
import { crearOgRankings } from "../../../../_rankings/og";
import { getPorSeccion } from "../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
export const GET = getPorSeccion(SLUG_RANKINGS, crearOgRankings);
