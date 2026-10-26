// El árabe tiene seis categorías de plural (Intl.PluralRules: zero, one, two, few, many, other) y el
// sustantivo cambia en cada una: 1 يوم واحد, 2 يومان, 3 a 10 أيام, 11 a 99 يومًا, 100 يوم. {n} va el
// número; una forma sin {n} (el dual, «يومان») ya lo dice con la palabra.
export interface FormasAr {
  cero?: string;
  uno: string;
  dos: string;
  pocos: string;
  muchos: string;
  otros: string;
}

const REGLAS = new Intl.PluralRules("ar");

export function formaAr(n: number, f: FormasAr): string {
  switch (REGLAS.select(n)) {
    case "zero":
      return f.cero ?? f.otros;
    case "one":
      return f.uno;
    case "two":
      return f.dos;
    case "few":
      return f.pocos;
    case "many":
      return f.muchos;
    default:
      return f.otros;
  }
}

export function pluralAr(n: number, f: FormasAr, cifra: string = String(n)): string {
  return formaAr(n, f).replace("{n}", cifra);
}
