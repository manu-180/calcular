import { crearPaginaCalendario } from "../_calendario/pagina";

// Calendario laboral y fiscal en en (SLUG_CALENDARIO). La lógica vive en ../_calendario/pagina.tsx.
const p = crearPaginaCalendario("en");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
