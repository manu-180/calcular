import type { Campo, DefinicionCalculadora, MundoCalculadora, PeriodoMundo } from "../tipos";

export type Inferencia = { ok: true; mundo: MundoCalculadora } | { ok: false; motivo: string };

// Palabras de período en los idiomas del motor. Se compara por palabra (o prefijo de palabra
// compuesta, como Monatslohn o Jahresgehalt), nunca por substring: «mano» no es «año». En ucraniano y
// ruso, «річна»/«місячна» y «годовая»/«месячная» y sus formas van por prefijo («річн», «місячн»,
// «годов», «месячн», «ежегодн», «ежемесячн»). Las palabras llegan sin diacríticos (palabras() los
// quita): el rumano («anual», «anuală», «lunar», «lunară», «pe lună») se compara así, y en checo
// «roční», «ročně» y «měsíční», «měsíčně» van por prefijo («rocn», «mesicn»), como en griego
// «ετήσιος», «ετησίως» y «μηνιαίος», «μηνιαίως» («ετησι», «μηνιαι»).
const ANUAL = ["anual", "anuales", "annual", "annually", "year", "yearly", "annuel", "annuelle", "annee", "an", "ans", "ano", "anos", "anno", "annuo", "annua", "annuale", "ral", "ctc", "jaar", "jaarlijks", "yillik", "yil", "рік", "року", "год", "года", "anuala", "anuale", "anuali", "rok", "roku", "rocne", "ετος", "ετη", "年", "연", "연봉", "年収", "年薪"];
const PREFIJO_ANUAL = ["jahr", "jahres", "jährlich", "jaarsalaris", "year", "річн", "годов", "ежегодн", "rocn", "ετησι"];
const MENSUAL = ["mensual", "mensuales", "monthly", "month", "mes", "mois", "mensuel", "mensuelle", "mese", "mensile", "maand", "maandelijks", "mensal", "aylik", "oylik", "місяць", "місяця", "месяц", "месяца", "luna", "lunii", "mesic", "mesice", "mesicne", "μηνα", "μηνας", "μηνες", "月", "월", "월급", "月給", "月薪"];
const PREFIJO_MENSUAL = ["monat", "maand", "month", "mensu", "mensil", "місячн", "месячн", "ежемесячн", "lunar", "mesicn", "μηνιαι"];

function palabras(texto: string): string[] {
  return texto
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    // La ı del turco no se descompone: «yıllık» y «aylık» se comparan como «yillik» y «aylik».
    .replace(/ı/g, "i")
    .split(/[^\p{L}]+/u)
    .filter(Boolean);
}

function separarCamel(id: string): string {
  return id.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function periodoDe(...textos: string[]): PeriodoMundo | null {
  const ps = textos.flatMap((t) => palabras(separarCamel(t)));
  const anual = ps.some((p) => ANUAL.includes(p) || PREFIJO_ANUAL.some((x) => p.startsWith(x)));
  const mensual = ps.some((p) => MENSUAL.includes(p) || PREFIJO_MENSUAL.some((x) => p.startsWith(x)));
  if (anual === mensual) return null;
  return anual ? "anio" : "mes";
}

// Un selector cuyas opciones incluyen un período anual y uno mensual («Dit bedrag is: per maand / per
// jaar»): se fija en el anual y el bruto pasa a ser anual.
function selectorDePeriodo(campos: readonly Campo[]): { campo: string; anual: string } | null {
  for (const c of campos) {
    if (c.tipo !== "opcion" || c.visibleSi) continue;
    const anual = c.opciones.find((o) => periodoDe(o.valor, o.etiqueta) === "anio");
    const mensual = c.opciones.find((o) => periodoDe(o.valor, o.etiqueta) === "mes");
    if (anual && mensual) return { campo: c.id, anual: anual.valor };
  }
  return null;
}

// Primer campo de moneda = bruto; fila destacada de moneda = neto. Los demás campos quedan en su
// valor por defecto. Solo se acepta si la grilla la valida (grilla.ts): un período mal adivinado da
// un neto mayor que el bruto o menor que la cuarta parte, y la calculadora queda excluida.
export function inferirMundo(definicion: Pick<DefinicionCalculadora, "campos" | "resultado">): Inferencia {
  const bruto = definicion.campos.find((c) => c.tipo === "moneda" && !c.visibleSi && c.requerido !== false);
  if (!bruto) return { ok: false, motivo: "no tiene un campo de moneda obligatorio para el bruto" };
  const neto = definicion.resultado.find((f) => f.destacada && f.formato === "moneda");
  if (!neto) return { ok: false, motivo: "no tiene una fila destacada de moneda para el neto" };
  const selector = selectorDePeriodo(definicion.campos);
  const periodoBruto = selector ? "anio" : periodoDe(bruto.id, bruto.etiqueta);
  if (!periodoBruto) return { ok: false, motivo: `no se sabe si «${bruto.etiqueta}» es mensual o anual` };
  const periodoNeto = periodoDe(neto.clave, neto.etiqueta) ?? periodoBruto;
  return {
    ok: true,
    mundo: {
      bruto: bruto.id,
      periodoBruto,
      neto: neto.clave,
      periodoNeto,
      ...(selector ? { entrada: { [selector.campo]: selector.anual } } : {}),
    },
  };
}
