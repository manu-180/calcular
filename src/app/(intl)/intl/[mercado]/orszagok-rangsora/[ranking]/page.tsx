import { crearPaginaRanking } from "../../_rankings/pagina";

// Cada ranking en hu (SLUGS_RANKING). La lógica vive en ../../_rankings/pagina.tsx.
const p = crearPaginaRanking("hu");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
