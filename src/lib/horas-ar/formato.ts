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

// El link compartido lleva el ítem y los minutos, nunca el sueldo: «asado.130».
const CODIGO = /^([a-z]+)\.([1-9]\d{0,7})$/;

export function codigoHoras(id: string, minutos: number): string {
  return `${id}.${Math.round(minutos)}`;
}

export function leerCodigoHoras(c: string | null | undefined): { id: string; minutos: number } | null {
  const m = c ? CODIGO.exec(c) : null;
  if (!m || !itemCotidiano(m[1])) return null;
  return { id: m[1], minutos: Number(m[2]) };
}

export const mayuscula = (s: string) => (s ? s[0].toLocaleUpperCase("es-AR") + s.slice(1) : s);

export function fraseCompartir(nombre: string, minutos: number | null): string {
  return minutos ? `${mayuscula(nombre)} me cuesta ${duracion(minutos).texto} de trabajo. ¿Y a vos?` : `¿Cuántas horas de trabajo te cuesta ${nombre}? Calculalo con tu sueldo:`;
}
