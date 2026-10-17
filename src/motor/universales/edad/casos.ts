import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Nacido el 15/5/1990, al 13/10/2026",
    detalle: "436 meses enteros (15/5/1990 → 15/9/2026) = 36 años y 4 meses; del 15/9 al 13/10 hay 28 días. Total 13.300 días. Próximo cumpleaños 15/5/2027, faltan 214 días.",
    fecha: "2026-10-13",
    entrada: { nacimiento: "1990-05-15", referencia: "2026-10-13" },
    esperado: { anios: 36, totalMeses: 436, totalDias: 13300, totalSemanas: 1900, proximo: "2027-05-15", faltan: 214, cumplira: 37 },
  },
  {
    nombre: "29 de febrero en año no bisiesto",
    detalle: "Nacido el 29/2/2000: 2023 no es bisiesto, así que cumple 23 el 28/2/2023 (276 meses, 0 días). Es el cumpleaños: próximo = hoy, faltan 0. Total 8.400 días.",
    fecha: "2023-02-28",
    entrada: { nacimiento: "2000-02-29", referencia: "2023-02-28" },
    esperado: { anios: 23, totalMeses: 276, totalDias: 8400, proximo: "2023-02-28", faltan: 0, cumplira: 23 },
  },
  {
    nombre: "29 de febrero, al día siguiente",
    detalle: "Nacido el 29/2/2000, al 1/3/2023: 23 años y 1 día. Próximo cumpleaños 29/2/2024: faltan 365 días.",
    fecha: "2023-03-01",
    entrada: { nacimiento: "2000-02-29", referencia: "2023-03-01" },
    esperado: { anios: 23, totalDias: 8401, proximo: "2024-02-29", faltan: 365, cumplira: 24 },
  },
  {
    nombre: "Fin de mes: 31/1 a 1/3",
    detalle: "31/1 + 1 mes = 28/2 (último día de febrero de 2026); del 28/2 al 1/3 hay 1 día: 0 años, 1 mes y 1 día; 29 días en total.",
    fecha: "2026-03-01",
    entrada: { nacimiento: "2026-01-31", referencia: "2026-03-01" },
    esperado: { anios: 0, totalMeses: 1, totalDias: 29, proximo: "2027-01-31", cumplira: 1 },
  },
  {
    nombre: "Nacimiento posterior a la fecha es un error",
    detalle: "No se puede tener edad antes de nacer.",
    fecha: "2026-10-13",
    entrada: { nacimiento: "2027-01-01", referencia: "2026-10-13" },
    esperaError: true,
  },
];
