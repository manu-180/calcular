import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

export default definirCasos(calculadora, [
  {
    nombre: "HT 10.000 a la tasa normal",
    origen: { tipo: "recalculado", detalle: "16 % de 10.000 = 1.600 (art. 230 CGI). TTC 11.600." },
    fecha: "2026-10-29",
    entrada: { montant: 10000, sens: "ht", taux: "normal" },
    esperado: { tva: 1600, ttc: 11600, ht: 10000, tasa: 16 },
  },
  {
    nombre: "TTC 11.800 en telefonía",
    origen: { tipo: "recalculado", detalle: "18 % (LFR 2023): HT = 11.800 / 1,18 = 10.000; TVA 1.800." },
    fecha: "2026-10-29",
    entrada: { montant: 11800, sens: "ttc", taux: "telephonie" },
    esperado: { ht: 10000, tva: 1800, tasa: 18 },
  },
  {
    nombre: "Exportación",
    origen: { tipo: "recalculado", detalle: "Tasa cero: TTC = HT." },
    fecha: "2026-10-29",
    entrada: { montant: 5000, sens: "ht", taux: "export" },
    esperado: { tva: 0, ttc: 5000 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Sin monto." },
    fecha: "2026-10-29",
    entrada: { montant: 0, sens: "ht", taux: "normal" },
    esperaError: true,
  },
]);
