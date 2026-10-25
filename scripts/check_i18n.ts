// Diccionarios del motor y del sitio en todos los idiomas y tratos: resuelve cada combinación y
// falla si una clave queda vacía, si un texto de otro idioma es idéntico al español (señal de que no
// se tradujo), si los {marcadores} no coinciden con los del español o si un texto rompe las reglas de
// redacción de su idioma (scripts/reglas_idioma.ts). Las funciones se llaman con argumentos de
// muestra y se revisa lo que devuelven.
// Uso: npx tsx scripts/check_i18n.ts
import { DICCIONARIOS_SITIO } from "../src/motor/i18n";
import { DICCIONARIOS_CALCULADORA } from "../src/motor/i18n/calculadora";
import { DICCIONARIOS_EMBED } from "../src/motor/i18n/embed";
import { GRAMATICA } from "../src/motor/i18n/gramatica";
import { resolverLegales } from "../src/motor/i18n/legales";
import { resolver, type Diccionarios } from "../src/motor/i18n/resolver";
import { esPortuguesEuropeo, PT_LUSOFONIA, variantesDeLocale } from "../src/motor/i18n/variantes";
import { nombresUnidad } from "../src/motor/i18n/unidades";
import { DICCIONARIOS_MOTOR } from "../src/motor/textos";
import { IDIOMAS, type Idioma, type Trato } from "../src/motor/tipos";
import { DICCIONARIOS_INICIO } from "../src/motor/ui/textos-inicio";
import { DICCIONARIOS_MUNDO } from "../src/motor/i18n/mundo";
import { DICCIONARIOS_RANKINGS } from "../src/motor/i18n/rankings";
import { DICCIONARIOS_HORAS } from "../src/motor/i18n/horas";
import { DICCIONARIOS_CALENDARIO } from "../src/motor/i18n/calendario";
import { anchoVisual } from "../src/motor/ancho";
import { problemasDeTexto } from "./reglas_idioma";

const TRATOS: readonly Trato[] = ["tu", "usted", "vos"];
const MUESTRA = "7";

// Textos que pueden coincidir con el español porque son la misma palabra en ese idioma, una sigla o
// una marca. Clave: "idioma:diccionario.ruta" (ruta sin el trato); "*:" vale para todos los idiomas.
const IGUALES_PERMITIDOS = new Set([
  "*:mundo.ranking.regiones.europa",
  "pt:horas.ranking.horas",
  "pt:calendario.ics.calculadora",
  "it:calendario.ceja",
  "pt:mundo.metodo.bancoMundial",
  "pt:rankings.de",
  "pt:rankings.tabla.pais",
  "*:sitio.marca.nombre",
  "*:sitio.footer.sitio",
  "*:sitio.footer.derechos",
  "*:inicio.vivo.actualizadoSerie",
  "pt:inicio.novedades.valores",
  "pt:inicio.novedades.antes",
  // pt comparte con el español palabras idénticas
  "pt:sitio.global.calculadoras",
  "pt:unidades.semanas.uno",
  "pt:unidades.semanas.otros",
  "pt:sitio.header.paisActual",
  "pt:sitio.header.latinoamerica",
  "pt:sitio.footer.paises",
  "pt:sitio.og.paises",
  "pt:sitio.shell.encabezado.buscar",
  "pt:sitio.shell.buscador.abrir",
  "pt:sitio.shell.buscador.resultados",
  "pt:sitio.shell.buscador.resultado",
  "pt:sitio.shell.buscador.resultadosPlural",
  "pt:sitio.shell.paises.titulo",
  "pt:calculadora.resultado",
  "pt:motor.calcular",
  "pt:motor.resultado",
  "pt:inicio.arranque.neutroIr",
  "pt:inicio.selector.buscar",
  "pt:inicio.selector.paises",
  "pt:inicio.novedades.etiqueta.editorial",
  "pt:inicio.novedades.etiqueta.serie",
  "pt:inicio.novedades.rss",
  "pt:unidades.horas.uno",
  "pt:unidades.horas.otros",
  "pt:unidades.meses.otros",
  // la misma palabra en ese idioma
  "de:embed.pagina.colores.3",
  "sv:embed.pagina.colores.3",
  "nb:embed.pagina.colores.3",
  "sv:embed.pagina.tema",
  "da:embed.pagina.tema",
  "nb:embed.pagina.tema",
  "it:embed.pagina.colores.0",
  "it:embed.pagina.colores.3",
  "it:embed.pagina.tema",
  "pt:embed.pagina.buscar",
  "pt:embed.pagina.calculadora",
  "pt:embed.pagina.claro",
  "pt:embed.pagina.colores.0",
  "pt:embed.pagina.colores.1",
  "pt:embed.pagina.colores.3",
  "pt:embed.pagina.copiado",
  "pt:embed.pagina.copiar",
  "pt:embed.pagina.tema",
  "en:motor.no",
  "it:motor.no",
  "it:sitio.fuentes.region",
  "it:legales.sobre.bloques.2.titulo",
  "it:inicio.novedades.etiqueta.editorial",
  "de:legales.privacidad.bloques.3.titulo",
  "en:legales.privacidad.bloques.3.titulo",
  "nl:legales.privacidad.bloques.3.titulo",
  "it:legales.privacidad.bloques.3.titulo",
  "nl:legales.sobre.bloques.2.titulo",
]);

type Hoja = { ruta: string; texto: string };

function hojas(valor: unknown, ruta: string, salida: Hoja[]): Hoja[] {
  if (typeof valor === "string") salida.push({ ruta, texto: valor });
  else if (typeof valor === "function") hojas((valor as (...a: string[]) => unknown)(...Array.from({ length: valor.length }, () => MUESTRA)), ruta, salida);
  else if (Array.isArray(valor)) valor.forEach((v, i) => hojas(v, `${ruta}.${i}`, salida));
  else if (valor && typeof valor === "object") for (const [k, v] of Object.entries(valor)) hojas(v, ruta ? `${ruta}.${k}` : k, salida);
  else salida.push({ ruta, texto: "" });
  return salida;
}

const marcadores = (t: string) => [...t.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

// Locales con parche regional que cambia la escritura entera: se revisan como un idioma más. En
// portugués, la base (Brasil), Portugal y Angola como muestra de la lusofonía con la norma europea.
const LOCALES: Readonly<Partial<Record<Idioma, readonly (string | undefined)[]>>> = { zh: ["zh-TW", "zh-HK", "zh-CN", "zh-SG"], pt: [undefined, "pt-PT", "pt-AO"] };
const variantes = (idioma: Idioma): readonly (string | undefined)[] => LOCALES[idioma] ?? [undefined];

type Fuente = { nombre: string; resolver: (idioma: Idioma, trato: Trato, locale?: string) => unknown };
const desde = <T>(nombre: string, dics: Diccionarios<T>): Fuente => ({ nombre, resolver: (i, t, l) => resolver(dics, i, t, l) });

const FUENTES: readonly Fuente[] = [
  desde("sitio", DICCIONARIOS_SITIO),
  desde("calculadora", DICCIONARIOS_CALCULADORA),
  desde("embed", DICCIONARIOS_EMBED),
  desde("motor", DICCIONARIOS_MOTOR),
  desde("inicio", DICCIONARIOS_INICIO),
  desde("mundo", DICCIONARIOS_MUNDO),
  desde("rankings", DICCIONARIOS_RANKINGS),
  desde("horas", DICCIONARIOS_HORAS),
  desde("calendario", DICCIONARIOS_CALENDARIO),
  { nombre: "legales", resolver: (i, t, l) => resolverLegales(i, t, { actualizado: "13/10/2026", mail: "correo@calcularya.test" }, l) },
  { nombre: "unidades", resolver: (i, _t, l) => nombresUnidad(i, l ?? i) },
];

const fallas: string[] = [];
const usadas = new Set<string>();
let revisadas = 0;

for (const fuente of FUENTES) {
  for (const trato of TRATOS) {
    const es = new Map(hojas(fuente.resolver("es", trato), "", []).map((h) => [h.ruta, h.texto]));
    for (const idioma of IDIOMAS) for (const locale of variantes(idioma)) {
      const lista = hojas(fuente.resolver(idioma, trato, locale), "", []);
      const rutas = new Set(lista.map((h) => h.ruta));
      for (const r of es.keys()) if (!rutas.has(r) && !/\.\d+(?:\.|$)/.test(r)) fallas.push(`${idioma}/${trato} ${fuente.nombre}.${r}: falta`);
      for (const { ruta, texto } of lista) {
        revisadas++;
        const donde = `${locale ?? idioma}/${trato} ${fuente.nombre}.${ruta}`;
        if (!texto.trim()) {
          fallas.push(`${donde}: vacío`);
          continue;
        }
        const enEs = es.get(ruta);
        if (enEs !== undefined && marcadores(enEs) !== marcadores(texto)) fallas.push(`${donde}: marcadores {${marcadores(texto)}} distintos de los del español {${marcadores(enEs)}}`);
        if (idioma !== "es" && enEs === texto) {
          const clave = `${fuente.nombre}.${ruta}`;
          const permitida = [`${idioma}:${clave}`, `*:${clave}`].find((k) => IGUALES_PERMITIDOS.has(k));
          if (permitida) usadas.add(permitida);
          else fallas.push(`${donde}: igual al español («${texto}»), ¿falta traducir?`);
        }
        if (fuente.nombre !== "unidades") for (const p of problemasDeTexto(texto, idioma, trato, locale)) fallas.push(`${donde}: ${p} en «${texto.slice(0, 70)}»`);
      }
    }
  }
}

for (const idioma of IDIOMAS) {
  for (const trato of TRATOS) for (const locale of variantes(idioma)) {
    const seo = resolver(DICCIONARIOS_SITIO, idioma, trato, locale).seo;
    const donde = `${locale ?? idioma}/${trato} sitio.seo`;
    if (anchoVisual(seo.tituloGlobal) > 60) fallas.push(`${donde}.tituloGlobal: ${anchoVisual(seo.tituloGlobal)} de ancho (máximo 60)`);
    if (anchoVisual(seo.descripcionGlobal) > 160) fallas.push(`${donde}.descripcionGlobal: ${anchoVisual(seo.descripcionGlobal)} de ancho (máximo 160)`);
  }
  if (!GRAMATICA[idioma]) fallas.push(`${idioma}: falta la gramática de países`);
}

// Norma europea del portugués: todo pt-* menos pt-BR, con una sola función (src/motor/i18n/variantes.ts).
for (const l of ["pt-PT", "pt-AO", "pt-MZ", "pt-CV", "pt-GW", "pt-ST", "pt-TL"]) if (!esPortuguesEuropeo(l)) fallas.push(`esPortuguesEuropeo(${l}) tendría que ser true`);
for (const l of ["pt-BR", "pt", "es-ES", "en-PT", undefined]) if (esPortuguesEuropeo(l)) fallas.push(`esPortuguesEuropeo(${l}) tendría que ser false`);
if (variantesDeLocale("pt-AO").join() !== `pt-PT,${PT_LUSOFONIA},pt-AO`) fallas.push(`variantesDeLocale(pt-AO) da ${variantesDeLocale("pt-AO").join()}`);
if (variantesDeLocale("pt-PT").join() !== "pt-PT" || variantesDeLocale("pt-BR").join() !== "pt-BR") fallas.push("variantesDeLocale cambió pt-PT o pt-BR");
// Angola y Mozambique leen lo mismo que Portugal (salvo lo de la lusofonía) y nada que sea de Brasil
// o que nombre impuestos de Portugal.
for (const fuente of FUENTES) {
  const pt = hojas(fuente.resolver("pt", "usted", "pt-PT"), "", []);
  const br = new Map(hojas(fuente.resolver("pt", "usted", "pt-BR"), "", []).map((h) => [h.ruta, h.texto]));
  for (const l of ["pt-AO", "pt-MZ"]) {
    const otro = new Map(hojas(fuente.resolver("pt", "usted", l), "", []).map((h) => [h.ruta, h.texto]));
    for (const h of pt) {
      const t = otro.get(h.ruta);
      if (t === h.texto) continue;
      if (t === br.get(h.ruta)) fallas.push(`${l}/usted ${fuente.nombre}.${h.ruta}: sale como en Brasil («${String(t).slice(0, 60)}»), no con la norma europea`);
    }
    for (const [ruta, t] of otro) if (/(IRS|IMI|IMT|IUC)|Segurança Social/.test(t)) fallas.push(`${l}/usted ${fuente.nombre}.${ruta}: nombra un impuesto de Portugal («${t.slice(0, 60)}»)`);
  }
}

for (const k of IGUALES_PERMITIDOS) if (!usadas.has(k)) fallas.push(`IGUALES_PERMITIDOS: «${k}» ya no hace falta, sacala`);

for (const f of fallas) console.error(`❌ ${f}`);
console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisadas} textos en ${IDIOMAS.length} idiomas × ${TRATOS.length} tratos`);
process.exit(fallas.length ? 1 : 0);
