import type { Campo, DefinicionCalculadora, MundoCalculadora, PeriodoMundo } from "../tipos";

export type Inferencia = { ok: true; mundo: MundoCalculadora } | { ok: false; motivo: string };

// Eslovaco: «ročný», «ročne» entran por el prefijo «rocn» del checo; «mesačný», «mesačne» por «mesacn».
// Palabras de período en los idiomas del motor. Se compara por palabra (o prefijo de palabra
// compuesta, como Monatslohn o Jahresgehalt), nunca por substring: «mano» no es «año». En ucraniano y
// ruso, «річна»/«місячна» y «годовая»/«месячная» y sus formas van por prefijo («річн», «місячн»,
// «годов», «месячн», «ежегодн», «ежемесячн»). Las palabras llegan sin diacríticos (palabras() los
// quita): el rumano («anual», «anuală», «lunar», «lunară», «pe lună») se compara así, y en checo
// «roční», «ročně» y «měsíční», «měsíčně» van por prefijo («rocn», «mesicn»), como en griego
// «ετήσιος», «ετησίως» y «μηνιαίος», «μηνιαίως» («ετησι», «μηνιαι»). El húngaro («éves», «évi»,
// «évente», «havi», «havonta») también se compara sin diacríticos. En hebreo van también las formas
// con la preposición pegada («לשנה», «בחודש»): palabras() corta por letra y no la separa. En búlgaro,
// En serbio «godišnja», «godišnje» y «mesečna», «mesečno» (y el ijekavski «mjesečno») van por prefijo.
// Armenio: «տարի», «ամիս» y los prefijos «տարեկան» y «ամսական» (ADR 0002, D30).
// En albanés «vit», «vjet», «vjetor» y «muaj», «mujor» (ya sin diacríticos; ADR 0002, D31).
// En vietnamita «năm» y «tháng» llegan como «nam» y «thang»; «Việt Nam» se une antes para que el nombre
// del país no cuente como «año» (ADR 0002, D37).
// «година», «месец» y los prefijos «годиш» y «месеч» («годишна», «месечна»; ADR 0002, D24).
// En croata «godišnja», «godišnje» y «mjesečna», «mjesečno» van por prefijo.
// En letón «gads», «gada», «gadā», «gadu» y el prefijo «ikgadej» («ikgadējā»), y el prefijo «menes» («mēnesis»,
// «mēneša», «mēnesī», «mēnešalga») con «ikmenes» («ikmēneša»; ADR 0002, D35).
const ANUAL = ["nam", "տարի", "տարվա", "տարում", "vit", "viti", "vjet", "vjetor", "vjetore", "leto", "letu", "letno", "letna", "aasta", "aastas", "aastane", "aastapalk", "ar", "ari", "ars", "arlega", "gads", "gada", "gadu", "година", "anual", "anuales", "annual", "annually", "year", "yearly", "annuel", "annuelle", "annee", "an", "ans", "ano", "anos", "anno", "annuo", "annua", "annuale", "ral", "ctc", "jaar", "jaarlijks", "жилийн", "yillik", "yil", "рік", "року", "год", "года", "anuala", "anuale", "anuali", "rok", "roku", "rocne", "ετος", "ετη", "წელი", "წელიწადი", "წელიწადში", "eves", "evi", "evente", "שנתי", "שנתית", "לשנה", "בשנה", "年", "연", "연봉", "年収", "年薪"];
const PREFIJO_ANUAL = ["letn", "arslaun", "arstekj", "arleg", "jahr", "jahres", "jährlich", "jaarsalaris", "year", "річн", "годов", "ежегодн", "rocn", "ετησι", "godisnj", "годиш", "წლიურ", "ყოველწლიურ", "godisnj", "жил", "տարեկան", "ikgadej"];
const MENSUAL = ["thang", "manuður", "manuði", "mesec", "meseca", "mesecu", "ամիս", "ամսվա", "ամսում", "muaj", "muajin", "mujor", "mujore", "kuu", "kuine", "igakuine", "kuupalk", "месец", "mesiac", "mesiace", "mesiaca", "mensual", "mensuales", "monthly", "month", "mes", "mois", "mensuel", "mensuelle", "mese", "mensile", "maand", "maandelijks", "сар", "сарын", "mensal", "aylik", "oylik", "місяць", "місяця", "месяц", "месяца", "luna", "lunii", "mesic", "mesice", "mesicne", "μηνα", "μηνας", "μηνες", "თვე", "თვეში", "havi", "havonta", "חודשי", "חודשית", "לחודש", "בחודש", "月", "월", "월급", "月給", "月薪"];
const PREFIJO_MENSUAL = ["mesacn", "mesecn", "manað", "monat", "maand", "month", "mensu", "mensil", "місячн", "месячн", "ежемесячн", "lunar", "mesicn", "μηνιαι", "mesecn", "mjesecn", "месеч", "თვიურ", "ყოველთვიურ", "mjesecn", "сарын", "ամսական", "menes", "ikmenes"];

function palabras(texto: string): string[] {
  return texto
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    // La ı del turco no se descompone: «yıllık» y «aylık» se comparan como «yillik» y «aylik».
    .replace(/ı/g, "i")
    .replace(/viet\s+nam/g, "vietnam")
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
