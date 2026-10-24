import { crearPaginaRanking } from "../../_rankings/pagina";

// Cada ranking en de (SLUGS_RANKING). La lógica vive en ../../_rankings/pagina.tsx.
const p = crearPaginaRanking("de");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
