import { SLUG_SUELDOS } from "@/motor/sueldos/rutas";
import { crearPaginaSueldos } from "../../../../_sueldos/pagina";
import { paginaPorSeccion } from "../../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
const p = paginaPorSeccion(SLUG_SUELDOS, crearPaginaSueldos);

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
