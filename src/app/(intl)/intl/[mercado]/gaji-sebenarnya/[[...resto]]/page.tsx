import { crearPaginaSueldos } from "../../_sueldos/pagina";

// «Sueldos reales» en id (SLUG_SUELDOS). La lógica vive en ../../_sueldos/pagina.tsx. El catch-all vacío es para que el build no la pinte por cada edición: se pinta al primer pedido y queda en caché.
const p = crearPaginaSueldos("id");

export const revalidate = 3600;
export const generateStaticParams = p.generateStaticParams;
export const generateMetadata = p.generateMetadata;
export default p.Pagina;
