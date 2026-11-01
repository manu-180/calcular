// El hebreo tiene tres categorías de plural (Intl.PluralRules he: one, two, other) y el dual cambia la
// palabra en las unidades de tiempo: «יום אחד», «יומיים», «3 ימים»; «שנה אחת», «שנתיים», «5 שנים».
// {n} va el número; la forma del dual («יומיים», «חודשיים») ya lo dice con la palabra y no lo lleva.
// Para sustantivos sin dual (שקל, אחוז) «dos» repite la forma del plural con {n}.
export interface FormasHe {
  uno: string;
  dos: string;
  otros: string;
}

const REGLAS = new Intl.PluralRules("he");

export function formaHe(n: number, f: FormasHe): string {
  const c = REGLAS.select(n);
  return c === "one" ? f.uno : c === "two" ? f.dos : f.otros;
}

export function pluralHe(n: number, f: FormasHe, cifra: string = String(n)): string {
  return formaHe(n, f).replace("{n}", cifra);
}

// Formas comunes de las unidades de tiempo, para las frases de las universales y del sitio.
export const DIAS_HE: FormasHe = { uno: "יום אחד", dos: "יומיים", otros: "{n} ימים" };
export const SEMANAS_HE: FormasHe = { uno: "שבוע אחד", dos: "שבועיים", otros: "{n} שבועות" };
export const HORAS_HE: FormasHe = { uno: "שעה אחת", dos: "שעתיים", otros: "{n} שעות" };
export const MESES_HE: FormasHe = { uno: "חודש אחד", dos: "חודשיים", otros: "{n} חודשים" };
export const ANIOS_HE: FormasHe = { uno: "שנה אחת", dos: "שנתיים", otros: "{n} שנים" };

// Una cifra que llega ya formateada («1,250», «3.5») se pasa a número para elegir la forma y se
// muestra tal como llegó.
export function pluralHeTexto(cifra: string, f: FormasHe): string {
  const n = Number(cifra.replace(/[^\d.-]/g, ""));
  return pluralHe(Number.isFinite(n) ? n : 0, f, cifra);
}

// Los prefijos de una letra (ב, ל, מ, ה, ו, ש) van pegados a la palabra hebrea; delante de una cifra,
// de una palabra en letras latinas o de un {marcador} van con guion: «ב-2026», «ל-Zetaland».
export function prefijoHe(prefijo: string, texto: string): string {
  return /^[א-ת]/.test(texto) ? `${prefijo}${texto}` : `${prefijo}-${texto}`;
}
