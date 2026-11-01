import { definirCasos } from "@/motor/calculo";
import calculadora from "./gil-prisha";

export default definirCasos(calculadora, [
  {
    nombre: "Mujer nacida en mayo de 1965: 63 y 9 meses",
    origen: { tipo: "recalculado", detalle: "Tabla del ביטוח לאומי: 1965 = 63 y 9 meses; 15.5.1965 + 765 meses = 15.2.2029; 70 años: 15.5.2035." },
    fecha: "2026-10-26",
    entrada: { min: "isha", leida: "1965-05-15" },
    esperado: { gil: "63 שנים ו-9 חודשים", prisha: "2029-02-15", zakaut: "2035-05-15", nishar: 27 },
  },
  {
    nombre: "Hombre nacido en marzo de 1960: 67",
    origen: { tipo: "recalculado", detalle: "67 años: 10.3.2027; 70 años: 10.3.2030; faltan 4 meses enteros desde el 26.10.2026." },
    fecha: "2026-10-26",
    entrada: { min: "gever", leida: "1960-03-10" },
    esperado: { gil: "67 שנים", prisha: "2027-03-10", zakaut: "2030-03-10", nishar: 4 },
  },
  {
    nombre: "Mujer nacida en 1955: 62, ya alcanzada",
    origen: { tipo: "recalculado", detalle: "Franja 5/1947 a 12/1959 = 62: 1.1.2017." },
    fecha: "2026-10-26",
    entrada: { min: "isha", leida: "1955-01-01" },
    esperado: { gil: "62 שנים", prisha: "2017-01-01", nishar: 0 },
  },
  {
    nombre: "Mujer nacida en 1970: 65",
    origen: { tipo: "recalculado", detalle: "1/1970 en adelante = 65: 31.8.2035." },
    fecha: "2026-10-26",
    entrada: { min: "isha", leida: "1970-08-31" },
    esperado: { gil: "65 שנים", prisha: "2035-08-31" },
  },
  {
    nombre: "Fecha anterior a la tabla",
    origen: { tipo: "recalculado", detalle: "La tabla empieza en junio de 1944." },
    fecha: "2026-10-26",
    entrada: { min: "isha", leida: "1944-01-01" },
    esperaError: true,
  },
]);
