import { crearPaginaMundo } from "../../_mundo/pagina";

// «Tu sueldo en el mundo» en bg (SLUG_MUNDO). La lógica vive en ../../_mundo/pagina.tsx.
const p = crearPaginaMundo("bg");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
