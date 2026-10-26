import { crearPaginaRanking } from "../../_rankings/pagina";

// Cada ranking en ar (SLUGS_RANKING). La lógica vive en ../../_rankings/pagina.tsx.
const p = crearPaginaRanking("ar");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
