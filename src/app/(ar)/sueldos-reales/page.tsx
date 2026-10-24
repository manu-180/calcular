import type { Metadata } from "next";
import { NOMBRE_SITIO } from "@/lib/seo";
import { agregadosDe } from "@/lib/sueldos/lectura";
import { paisAportable } from "@/lib/sueldos/paises";
import { textosSueldos } from "@/motor/i18n/sueldos";
import { RUTA_MUNDO_AR } from "@/motor/mundo/rutas";
import { origenAR } from "@/motor/sitio";
import { K } from "@/motor/sueldos/catalogo";
import { ocupacionesPublicadas } from "@/motor/sueldos/filas";
import { RUTA_SUELDOS_AR } from "@/motor/sueldos/rutas";
import { lugares, rellenar } from "@/motor/sueldos/ui/comun";
import { PaginaSueldos } from "@/motor/sueldos/ui/PaginaSueldos";
import "../sueldo-en-el-mundo/estilos-ar.css";

// «Sueldos reales» de Argentina en calcular.ar: la misma página de calcularya, con voseo, en pesos y con
// el aporte en /sueldo-en-el-mundo. Sin ocupaciones publicadas, fuera del índice y del sitemap
// (sitemap.ts lee los mismos datos).

export const revalidate = 3600;

const LOCALE = "es-AR";
const t = textosSueldos("es", "vos", LOCALE);
const { enPais } = lugares("es", "Argentina");

export async function generateMetadata(): Promise<Metadata> {
  const datos = await agregadosDe("ar");
  const title = rellenar(t.pagina.seoTitulo, { enPais, pais: "Argentina" });
  const description = rellenar(t.pagina.seoDescripcion, { enPais, pais: "Argentina", k: K });
  const meta: Metadata = {
    title: { absolute: title },
    description,
    alternates: { canonical: RUTA_SUELDOS_AR },
    openGraph: {
      type: "website",
      siteName: NOMBRE_SITIO,
      locale: "es_AR",
      url: RUTA_SUELDOS_AR,
      title,
      description,
      images: [{ url: `${RUTA_SUELDOS_AR}/og`, width: 1200, height: 630 }],
    },
  };
  return datos && ocupacionesPublicadas(datos) > 0 ? meta : { ...meta, robots: { index: false, follow: true } };
}

export default async function Page() {
  const datos = await agregadosDe("ar");
  return (
    <div className="ca-mundo">
      <PaginaSueldos
        t={t}
        idioma="es"
        locale={LOCALE}
        nombrePais="Argentina"
        moneda={paisAportable("ar")?.moneda ?? "ARS"}
        datos={datos}
        k={K}
        urlAporte={RUTA_MUNDO_AR}
        url={`${origenAR()}${RUTA_SUELDOS_AR}`}
      />
    </div>
  );
}
