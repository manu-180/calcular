import { definirCalculadora } from "@/motor/calculo";
import { libras } from "../lib/impuestos";

export default definirCalculadora({
  id: "gb.child-benefit",
  mercado: "gb",
  concepto: "propio",
  slug: "child-benefit",
  estado: "publicado",
  requiere: {
    "gb.child-benefit-rates": "mapa",
    "gb.hicbc-threshold": "numero",
    "gb.hicbc-step": "numero",
  },
  campos: [
    { id: "hijos", tipo: "entero", etiqueta: "Children you claim for", min: 1, max: 20, porDefecto: 2 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Higher earner's yearly income (adjusted net income)", min: 0, porDefecto: 50000, ayuda: "Use the income of whichever parent or partner earns more." },
  ],
  calcular(entrada, v, { redondear }) {
    const tasas = v["gb.child-benefit-rates"];
    const semanal = redondear(tasas.eldest + tasas.additional * (entrada.hijos - 1));
    const anual = redondear(semanal * 52);
    const umbral = v["gb.hicbc-threshold"];
    const porcentaje = entrada.ingreso > umbral ? Math.min(100, Math.floor((entrada.ingreso - umbral) / v["gb.hicbc-step"])) : 0;
    const cargo = redondear((anual * porcentaje) / 100);
    const observaciones: string[] = [];
    if (porcentaje >= 100) {
      observaciones.push("The charge cancels all the Child Benefit. It can still be worth claiming and opting out of payments, to protect the State Pension record of a parent who is not working.");
    } else if (porcentaje > 0) {
      observaciones.push(`Income over ${libras(umbral)} means paying back part of the benefit through the High Income Child Benefit Charge.`);
    }
    return { semanal, anual, porcentaje, cargo, neto: redondear(anual - cargo), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Child Benefit you keep for the year", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Child Benefit a week", formato: "moneda" },
    { clave: "anual", etiqueta: "Child Benefit a year (52 weeks)", formato: "moneda" },
    { clave: "porcentaje", etiqueta: "Share paid back as the tax charge", formato: "porcentaje", decimales: 0 },
    { clave: "cargo", etiqueta: "High Income Child Benefit Charge", formato: "moneda" },
  ],
});
