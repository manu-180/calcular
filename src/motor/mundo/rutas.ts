import type { Idioma } from "../tipos";

// Slug de «Tu sueldo en el mundo» por idioma. Es el mismo en todas las ediciones de un idioma, así el
// clúster hreflang se arma solo para cualquier país nuevo.
export const SLUG_MUNDO: Record<Idioma, string> = {
  sq: "paga-ne-bote",
  es: "sueldo-en-el-mundo",
  pt: "salario-pelo-mundo",
  en: "salary-around-the-world",
  fr: "salaire-dans-le-monde",
  de: "gehalt-weltweit",
  it: "stipendio-nel-mondo",
  nl: "salaris-wereldwijd",
  ja: "sekai-no-kyuyo",
  ko: "segye-yeonbong",
  zh: "shijie-gongzi",
  bg: "zaplatata-po-sveta",
  mn: "delkhiin-tsalin",
  hy: "ashkhatavardzy-ashkharhum",
  sl: "placa-po-svetu",
  et: "palk-maailmas",
  is: "laun-um-allan-heim",
  lv: "alga-pasaule",
  mk: "platata-niz-svetot",

  pl: "wynagrodzenie-na-swiecie",
  sv: "lon-i-varlden",
  da: "lon-i-verden",
  nb: "lonn-i-verden",
  fi: "palkka-maailmalla",
  ar: "rawatib-alalam",
  id: "gaji-di-dunia",
  tr: "ulkelere-gore-maas",
  bn: "bishwe-beton",
  // «เงินเดือนทั่วโลก» en RTGS (ADR 0002, D13): salary-around-the-world ya es la ruta del inglés.
  th: "ngoen-duean-thua-lok",
  uk: "zarplata-u-sviti",
  uz: "mamlakatlar-boyicha-ish-haqi",
  ru: "zarplata-v-mire",
  ro: "salariu-in-lume",
  cs: "mzda-ve-svete",
  el: "misthos-ston-kosmo",
  hu: "fizetes-a-vilagban",
  he: "sachar-baolam",
  sr: "plata-u-svetu",
  sk: "mzda-vo-svete",
  ka: "khelpasi-msoplioshi",
  hr: "placa-u-svijetu",
};

export const RUTA_MUNDO_AR = "/sueldo-en-el-mundo";

export function rutaMundo(mercado: string, idioma: Idioma): string {
  return mercado === "ar" ? RUTA_MUNDO_AR : `/${mercado}/${SLUG_MUNDO[idioma]}`;
}

// El sueldo que la persona ya cargó en su calculadora viaja a la página del mundo por sessionStorage,
// nunca en la URL: un monto en la query queda en logs, historial y en lo que se comparte.
export const CLAVE_TRASPASO = "cy-mundo-bruto";

// Cuántos países promete el link a la página desde cada calculadora de sueldo («más de N países»).
// Es un piso con margen, no la cuenta: check_mundo falla si la grilla no tiene más que esto.
export const PAISES_PUENTE = 35;

// Una edición en otro idioma (ca-fr, be-fr, lu-de) tiene código `<país>-<idioma>` y sus calculadoras
// `<edición>.<id local>`: lo exige el registro (mercadoDeEdicion y definirEdicion en motor/registro.ts).
// La grilla tiene solo la edición principal, así que el traspaso guarda esa y busca su adaptador.
export function edicionPrincipal(mercado: string): string {
  return mercado.split("-")[0];
}

export function calculadoraPrincipal(mercado: string, calculadora: string): string {
  const principal = edicionPrincipal(mercado);
  return principal !== mercado && calculadora.startsWith(`${mercado}.`) ? `${principal}.${calculadora.slice(mercado.length + 1)}` : calculadora;
}
