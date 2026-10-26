import { crearPaginaHoras } from "../../_horas/pagina";

// «¿Cuántas horas de trabajo cuesta?» en ar (SLUG_HORAS). La lógica vive en ../../_horas/pagina.tsx.
const p = crearPaginaHoras("ar");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
