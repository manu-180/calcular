import { SLUG_SUELDOS } from "@/motor/sueldos/rutas";
import { crearOgSueldos } from "../../../../_sueldos/pagina";
import { getPorSeccion } from "../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
export const GET = getPorSeccion(SLUG_SUELDOS, crearOgSueldos);
