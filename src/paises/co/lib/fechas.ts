import type { FechaISO } from "@/motor/tipos";

// Aritmética de calendario sin Date: el motor exige cálculos puros y Date arrastra la zona horaria
// del servidor. Se cuenta con días julianos de calendario gregoriano.

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

function aDiaJuliano(a: number, m: number, d: number): number {
  const y = m <= 2 ? a - 1 : a;
  const mm = m <= 2 ? m + 12 : m;
  const b = Math.floor(y / 400) - Math.floor(y / 100) + Math.floor(y / 4);
  return 365 * y + b + Math.floor((306001 * (mm + 1)) / 10000) + d;
}

function desdeDiaJuliano(n: number): FechaISO {
  for (let a = Math.floor(n / 366) - 1; ; a++) {
    if (aDiaJuliano(a + 1, 1, 1) > n) {
      for (let m = 12; m >= 1; m--) {
        const inicio = aDiaJuliano(a, m, 1);
        if (inicio <= n) return formato(a, m, n - inicio + 1);
      }
    }
  }
}

function formato(a: number, m: number, d: number): FechaISO {
  return `${a}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` as FechaISO;
}

export function diasDelMes(a: number, m: number): number {
  return aDiaJuliano(m === 12 ? a + 1 : a, m === 12 ? 1 : m + 1, 1) - aDiaJuliano(a, m, 1);
}

export function sumarDias(f: FechaISO, n: number): FechaISO {
  const [a, m, d] = partes(f);
  return desdeDiaJuliano(aDiaJuliano(a, m, d) + n);
}

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  const [a1, m1, d1] = partes(desde);
  const [a2, m2, d2] = partes(hasta);
  return aDiaJuliano(a2, m2, d2) - aDiaJuliano(a1, m1, d1);
}

// Suma meses calendario; si el día no existe en el mes de llegada (31 de abril), usa el último.
export function sumarMeses(f: FechaISO, n: number): FechaISO {
  const [a, m, d] = partes(f);
  const total = a * 12 + (m - 1) + n;
  const an = Math.floor(total / 12);
  const mn = (total % 12) + 1;
  return formato(an, mn, Math.min(d, diasDelMes(an, mn)));
}
