import { NOMBRE_SITIO } from "@/lib/seo";
import { agregadosDe } from "@/lib/sueldos/lectura";
import { ogSueldos } from "@/lib/sueldos/og";
import { textosSueldos } from "@/motor/i18n/sueldos";
import { ocupacionesPublicadas } from "@/motor/sueldos/filas";
import { lugares, rellenar } from "@/motor/sueldos/ui/comun";

const t = textosSueldos("es", "vos", "es-AR");

export async function GET(req: Request) {
  if ([...new URL(req.url).searchParams.keys()].length) return new Response("No encontrado", { status: 404 });
  const datos = await agregadosDe("ar");
  const n = datos ? ocupacionesPublicadas(datos) : 0;
  const { enPais } = lugares("es", "Argentina");
  return ogSueldos({
    titulo: rellenar(t.pagina.h1, { enPais, pais: "Argentina" }),
    bajada: n ? rellenar(t.pagina.ogBajada, { n }) : t.pagina.ogBajadaCero,
    ceja: t.pagina.ceja,
    marca: NOMBRE_SITIO,
    dominio: "calcular.ar",
    iso: "AR",
    idioma: "es",
    locale: "es-AR",
  });
}
