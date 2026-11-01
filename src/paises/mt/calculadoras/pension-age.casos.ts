import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-age";

export default definirCasos(calculadora, [
  {
    nombre: "Born in 1970",
    origen: { tipo: "recalculado", detalle: "Social Security Act, art. 2: pension age is 65 for anyone born in 1962 or after. 15 June 1970 + 65 years = 15 June 2035." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1970-06-15", sexo: "male" },
    esperado: { edad: 65, llega: "2035-06-15" },
  },
  {
    nombre: "Born in 1960",
    origen: { tipo: "recalculado", detalle: "Born 1959 to 1961: 64. 3 March 1960 + 64 = 3 March 2024." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1960-03-03", sexo: "female" },
    esperado: { edad: 64, llega: "2024-03-03" },
  },
  {
    nombre: "Born in 1957",
    origen: { tipo: "recalculado", detalle: "Born 1956 to 1958: 63." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1957-11-20", sexo: "male" },
    esperado: { edad: 63 },
  },
  {
    nombre: "Born in 1953",
    origen: { tipo: "recalculado", detalle: "Born 1952 to 1955: 62." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1953-01-01", sexo: "male" },
    esperado: { edad: 62 },
  },
  {
    nombre: "Woman born in 1950",
    origen: { tipo: "recalculado", detalle: "Proviso (ii): a woman born on or before 31 December 1951 has a pension age of 60." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1950-05-10", sexo: "female" },
    esperado: { edad: 60, llega: "2010-05-10" },
  },
  {
    nombre: "Man born in 1950",
    origen: { tipo: "recalculado", detalle: "Born on or before 31 December 1951: 61." },
    fecha: "2026-10-26",
    entrada: { nacimiento: "1950-05-10", sexo: "male" },
    esperado: { edad: 61 },
  },
]);
