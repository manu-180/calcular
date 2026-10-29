import { SLUG_CALENDARIO } from "@/motor/calendario/slugs";
import { crearPaginaCalendario } from "../../../_calendario/pagina";
import { paginaPorSeccion } from "../../../_seccion";

// Todos los idiomas en una ruta: next.config reescribe acá cada /<m>/<slug> (src/motor/secciones.ts).
const p = paginaPorSeccion(SLUG_CALENDARIO, crearPaginaCalendario);

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
