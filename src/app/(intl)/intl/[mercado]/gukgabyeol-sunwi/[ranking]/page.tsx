import { crearPaginaRanking } from "../../_rankings/pagina";

// Cada ranking en ko (SLUGS_RANKING). La lógica vive en ../../_rankings/pagina.tsx.
const p = crearPaginaRanking("ko");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
