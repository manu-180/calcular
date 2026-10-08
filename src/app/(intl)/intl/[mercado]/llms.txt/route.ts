import { urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// /llms.txt de calcularya (llega por rewrite, ver RUTA_LLMS en src/motor/hosts.ts). El de public/
// describe calcular.ar y no puede salir en este dominio.
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
      const lineas = registro.calculadorasPublicables(m.codigo, fecha, modo).flatMap((c) => {
        const p = registro.pagina(m.codigo, c.definicion.slug, fecha, modo);
        return p ? [`- [${p.contenido.h1}](${urlIntl(m.codigo, c.definicion.slug)})`] : [];
      });
      return `## ${m.nombre}\n\n- [Calculadoras de ${m.nombre}](${urlIntl(m.codigo)})\n${lineas.join("\n")}\n- [Fuentes oficiales de ${m.nombre}](${urlIntl(m.codigo, "fuentes")})`;
    });
  const texto = `# ${NOMBRE_SITIO_INTL}

> Calculadoras laborales e impositivas gratuitas para Latinoamérica, con datos de fuentes oficiales de cada país. Cada página muestra la fuente y la fecha en que se verificó cada dato.

${secciones.join("\n\n")}
`;
  return new Response(texto, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
