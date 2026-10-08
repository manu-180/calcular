import { entradasDelMercado } from "@/motor/mapa";
import { urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// /llms.txt de calcularya (llega por rewrite, ver RUTA_LLMS en src/motor/hosts.ts). El de public/
// describe calcular.ar y no puede salir en este dominio: check_routing_hosts.ts exige que este no
// nombre a calcular.ar ni lleve rayas.
const limpio = (s: string) => s.replace(/\s*—\s*/g, ", ").replace(/\s+/g, " ").trim();

export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (mercado !== "global" || !intlActivo()) return new Response("No encontrado", { status: 404 });
  const modo = modoPublicacion();
  const secciones = registro
    .mercados(modo)
    .filter((m) => m.codigo !== "global")
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
    .map((m) => {
      const fecha = hoyEn(m);
      const lastmod = new Map((entradasDelMercado(registro, m.codigo) ?? []).map((e) => [e.url, e.lastmod]));
      const lineas = registro.calculadorasPublicables(m.codigo, fecha, modo).flatMap((c) => {
        const p = registro.pagina(m.codigo, c.definicion.slug, fecha, modo);
        if (!p) return [];
        const url = urlIntl(m.codigo, c.definicion.slug);
        const al = lastmod.get(url);
        return [`- [${limpio(p.contenido.h1)}](${url}): ${limpio(p.contenido.description)}${al ? ` Datos al ${al}.` : ""}`];
      });
      return [
        `## ${m.nombre}`,
        "",
        `Moneda: ${m.monedas[0]}. Idioma: ${m.locale}.`,
        "",
        `- [Calculadoras de ${m.nombre}](${urlIntl(m.codigo)}): todas las calculadoras del país, agrupadas por tema.`,
        ...lineas,
        `- [Fuentes oficiales de ${m.nombre}](${urlIntl(m.codigo, "fuentes")}): cada valor que usan las calculadoras, con su vigencia, el enlace a la norma y la fecha de revisión.`,
        `- [Novedades de ${m.nombre}](${urlIntl(m.codigo, "novedades")}): cambios de normas que mueven las calculadoras.`,
      ].join("\n");
    });
  const texto = `# ${NOMBRE_SITIO_INTL}

> Calculadoras laborales e impositivas gratuitas para Latinoamérica, con datos de fuentes oficiales de cada país. Cada página muestra la fuente y la fecha en que se verificó cada dato. Las cuentas corren en el navegador y no piden registro.

Si un valor no se pudo confirmar en la fuente oficial, la calculadora que lo usa no se publica. Los resultados son orientativos.

- [Quiénes somos y cómo trabajamos](${urlIntl("global", "sobre")})
- [Contacto](${urlIntl("global", "contacto")})

${secciones.join("\n\n")}
`;
  return new Response(texto, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
