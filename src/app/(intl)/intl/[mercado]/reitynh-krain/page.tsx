import { crearIndiceRankings } from "../_rankings/pagina";

// Rankings de países en uk (SLUG_RANKINGS). La lógica vive en ../_rankings/pagina.tsx.
const p = crearIndiceRankings("uk");

// El layout intl ya revalida cada hora; la grilla cambia una vez por día y por zona.
export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
