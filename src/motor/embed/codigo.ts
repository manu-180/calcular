import { ACENTO_BASE, TEMA_BASE, type TemaEmbed } from "./opciones";
import { ALTO_INICIAL } from "./mensajes";

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Donde va el nombre de la calculadora en el título del iframe cuando el texto viaja como plantilla al
// navegador (las funciones del diccionario no cruzan de servidor a cliente).
export const MARCA_NOMBRE = "{{nombre}}";

export interface OpcionesUrl {
  tema: TemaEmbed;
  // "#rrggbb" ya validado (acentoDe) o null para el verde de la marca.
  acento: string | null;
}

// /<mercado>/embed/<slug>?tema=oscuro&acento=2563eb. Los valores base no se escriben: la URL más corta
// es la del caso común y la que se ve mejor pegada en un blog.
export function consultaEmbed({ tema, acento }: OpcionesUrl): string {
  const partes: string[] = [];
  if (tema !== TEMA_BASE) partes.push(`tema=${tema}`);
  if (acento && acento !== ACENTO_BASE) partes.push(`acento=${acento.slice(1)}`);
  return partes.length ? `?${partes.join("&")}` : "";
}

export function rutaEmbed(mercado: string, slug: string, opciones: OpcionesUrl): string {
  return `/${mercado}/embed/${slug}${consultaEmbed(opciones)}`;
}

export interface EntradaCodigo extends OpcionesUrl {
  origen: string;
  mercado: string;
  slug: string;
  // Ancho máximo en px; null para ocupar todo el ancho disponible.
  anchoPx: number | null;
  tituloIframe: string;
  // Con texto: se agrega el link de crédito debajo del iframe (es el que cuenta como enlace del sitio).
  credito: { texto: string; href: string } | null;
}

export function codigoParaPegar(e: EntradaCodigo): string {
  const maximo = e.anchoPx ? `max-width:${e.anchoPx}px;` : "";
  // El src no se escapa: la URL solo lleva [a-z0-9-/:.?=&#] (slug, tema y acento validados), y un `&amp;`
  // pegado en un editor visual de WordPress se rompe más seguido que un `&` pelado, que HTML acepta.
  const iframe = `<iframe src="${`${e.origen}${rutaEmbed(e.mercado, e.slug, e)}`}" title="${escapar(e.tituloIframe)}" width="100%" height="${ALTO_INICIAL}" loading="lazy" style="border:0;width:100%;${maximo}border-radius:16px"></iframe>`;
  const script = `<script src="${escapar(`${e.origen}/embed.js`)}" async></script>`;
  const credito = e.credito ? `\n<p><a href="${escapar(e.credito.href)}" target="_blank" rel="noopener">${escapar(e.credito.texto)}</a></p>` : "";
  return `${iframe}\n${script}${credito}`;
}
