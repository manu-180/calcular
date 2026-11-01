import { SLUG_RANKINGS } from "@/motor/rankings/rutas";
import { crearIndiceRankings } from "../../../_rankings/pagina";
import { paginaPorSeccion } from "../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
const p = paginaPorSeccion(SLUG_RANKINGS, crearIndiceRankings);

export const revalidate = 86400;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
