// El italiano elide el artículo delante de un número que se lee con vocal: «l'8%», «l'11%», «lo 0,5%»,
// pero «il 15%» y «il 1.000» (mille). Los textos en italiano arman el porcentaje con esto para no
// escribir «il 8%», que a un italiano le suena a error de traducción.
type Preposizione = "" | "di" | "a" | "da" | "su" | "in";

const FORME: Record<Preposizione, Record<"il" | "l" | "lo", string>> = {
  "": { il: "il ", l: "l'", lo: "lo " },
  di: { il: "del ", l: "dell'", lo: "dello " },
  a: { il: "al ", l: "all'", lo: "allo " },
  da: { il: "dal ", l: "dall'", lo: "dallo " },
  su: { il: "sul ", l: "sull'", lo: "sullo " },
  in: { il: "nel ", l: "nell'", lo: "nello " },
};

function intero(x: string): number {
  const s = x.trim().replace(/[’'   ]/g, "");
  if (s.includes(",")) return Number(s.split(",")[0].replace(/\./g, ""));
  if (/\.\d{3}(\.|$)/.test(s)) return Number(s.replace(/\./g, ""));
  return Number(s.split(".")[0]);
}

export function articolo(numero: string, prep: Preposizione = ""): string {
  const n = intero(numero);
  let forma: "il" | "l" | "lo" = "il";
  if (n === 0) forma = "lo";
  else if (Number.isFinite(n)) {
    const migliaia = n >= 1000 ? Math.floor(n / 1000) : -1;
    if (String(n)[0] === "8" || n === 1 || n === 11 || (migliaia === 11 && n < 1_000_000)) forma = "l";
  }
  return FORME[prep][forma] + numero;
}

export function percento(numero: string, prep: Preposizione = ""): string {
  return `${articolo(numero, prep)}%`;
}
