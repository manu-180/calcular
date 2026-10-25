import { crearPaginaRanking } from "../../_rankings/pagina";

// Cada ranking en uz (SLUGS_RANKING). La lógica vive en ../../_rankings/pagina.tsx.
const p = crearPaginaRanking("uz");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
