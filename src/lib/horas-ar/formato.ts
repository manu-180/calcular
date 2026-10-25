import { itemCotidiano } from "./catalogo";

// Iguales en la página, el link compartido y la tarjeta OG.

// Semanas promedio de un mes (52 ÷ 12, redondeado como se usa en las liquidaciones).
export const SEMANAS_POR_MES = 4.33;
export const TOPE_MINUTOS = 99_999_999;

export function valorHora(mensual: number, diasSemana: number, horasDia: number): number | null {
  const horasMes = diasSemana * horasDia * SEMANAS_POR_MES;
  return mensual > 0 && horasMes > 0 ? mensual / horasMes : null;
}

export function minutosDe(monto: number, porHora: number): number {
  return Math.min(TOPE_MINUTOS, Math.max(1, Math.round((monto / porHora) * 60)));
}

const miles = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

// «45 min», «2 h 10 min», «2 h», y desde 100 horas solo horas («312 h»): los minutos ahí no dicen nada.
export function duracion(minutos: number): { texto: string; partes: { n: string; u: string }[] } {
  const m = Math.max(1, Math.round(minutos));
  if (m < 60) return { texto: `${m} min`, partes: [{ n: String(m), u: "min" }] };
  const h = Math.floor(m / 60);
  const resto = m % 60;
  if (h >= 100 || resto === 0) {
    const hh = h >= 100 ? Math.round(m / 60) : h;
    return { texto: `${miles.format(hh)} h`, partes: [{ n: miles.format(hh), u: "h" }] };
  }
  return { texto: `${h} h ${resto} min`, partes: [{ n: String(h), u: "h" }, { n: String(resto), u: "min" }] };
}

// En palabras, para leer en voz alta y para el texto que se comparte: «2 horas y 10 minutos».
export function duracionLarga(minutos: number): string {
  const m = Math.max(1, Math.round(minutos));
  if (m < 60) return `${m} ${m === 1 ? "minuto" : "minutos"}`;
  const h = Math.floor(m / 60);
  const resto = m % 60;
  if (h >= 100 || resto === 0) {
    const hh = h >= 100 ? Math.round(m / 60) : h;
    return `${miles.format(hh)} ${hh === 1 ? "hora" : "horas"}`;
  }
  return `${h} ${h === 1 ? "hora" : "horas"} y ${resto} ${resto === 1 ? "minuto" : "minutos"}`;
}

// Lo que se comparte (link, tarjeta, texto) nunca son los minutos exactos: con el precio público se
// deduciría el valor hora de quien comparte. Viaja un valor de esta escala, casi geométrica: dos valores
// separados por uno siempre están a 1,5 veces o más, así que el tramo que cae en cada valor (entre las
// medias geométricas con sus vecinos) mide al menos √1,5 ≈ 1,22 veces de punta a punta. Para cualquier
// ítem, cada valor compartido corresponde a un valor hora de ±10 % o más (check_horas_ar lo prueba).
// Lo mismo hizo «Tu sueldo en el mundo» con las franjas (docs/decisiones/mundo.md).
const MANTISA = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8];
const MANTISA_LARGA = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8];
export const ESCALA_COMPARTIDA: readonly number[] = [
  5, 10, 15, 20, 25, 30, 40, 50,
  ...MANTISA.map((m) => m * 60),
  ...[10, 100, 1000, 10_000, 100_000].flatMap((e) => MANTISA_LARGA.map((m) => Math.round(m * e * 60))),
  1_000_000 * 60,
];

// El valor de la escala cuyo tramo contiene `minutos` (cortes en la media geométrica entre vecinos).
export function minutosCompartidos(minutos: number): number {
  const e = ESCALA_COMPARTIDA;
  for (let i = 0; i < e.length - 1; i++) if (minutos < Math.sqrt(e[i] * e[i + 1])) return e[i];
  return e[e.length - 1];
}

// El link compartido lleva el ítem y un valor de la escala, nunca el sueldo: «asado.150».
const CODIGO = /^([a-z]+)\.([1-9]\d{0,7})$/;

export function codigoHoras(id: string, minutos: number): string {
  return `${id}.${minutosCompartidos(minutos)}`;
}

// canonico: false si los minutos no son un valor de la escala (la página redirige al valor que toca).
export function leerCodigoHoras(c: string | null | undefined): { id: string; minutos: number; canonico: boolean } | null {
  const m = c ? CODIGO.exec(c) : null;
  if (!m || !itemCotidiano(m[1])) return null;
  const crudo = Number(m[2]);
  const minutos = minutosCompartidos(crudo);
  return { id: m[1], minutos, canonico: minutos === crudo };
}

export const mayuscula = (s: string) => (s ? s[0].toLocaleUpperCase("es-AR") + s.slice(1) : s);

// `minutos` ya tiene que ser un valor de la escala compartida: por eso dice «cerca de».
export function fraseCompartir(nombre: string, minutos: number | null): string {
  return minutos ? `${mayuscula(nombre)} me cuesta cerca de ${duracion(minutos).texto} de trabajo. ¿Y a vos?` : `¿Cuántas horas de trabajo te cuesta ${nombre}? Calculalo con tu sueldo:`;
}
