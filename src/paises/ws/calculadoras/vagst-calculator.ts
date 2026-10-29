import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { wst } from "../lib/nomina";

export default definirCalculadora({
  id: "ws.vagst-calculator",
  mercado: "ws",
  concepto: "iva",
  slug: "vagst-calculator",
  estado: "publicado",
  requiere: {
    "ws.vagst-rate": "numero",
    "ws.vagst-threshold": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Amount", min: 0, porDefecto: 1000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What the amount is",
      opciones: [
        { valor: "sin", etiqueta: "Price without VAGST (add VAGST)" },
        { valor: "con", etiqueta: "Price with VAGST (take VAGST out)" },
      ],
      porDefecto: "sin",
    },
    { id: "facturacion", tipo: "moneda", etiqueta: "Your business turnover over 12 months (optional)", min: 0, requerido: false, ayuda: "Used only to check the registration threshold." },
  ],
  calcular(e, v, { redondear }) {
    if (e.monto < 0) throw new ErrorEntrada("The amount cannot be negative.", "monto");
    const tasa = v["ws.vagst-rate"];
    const umbral = v["ws.vagst-threshold"];
    const sin = e.modo === "sin" ? e.monto : redondear(e.monto / (1 + tasa / 100));
    const impuesto = e.modo === "sin" ? redondear(porcentaje(e.monto, tasa)) : redondear(e.monto - sin);
    const con = e.modo === "sin" ? redondear(e.monto + impuesto) : e.monto;
    let registro: string | null = null;
    if (e.facturacion !== null) {
      registro = e.facturacion > umbral ? `Turnover of ${wst(e.facturacion)} is over the threshold, so VAGST registration is required.` : `Turnover of ${wst(e.facturacion)} is at or under the threshold of ${wst(umbral)}.`;
    }
    return {
      sin,
      impuesto,
      con,
      registro,
      observaciones: ["Zero-rated and exempt supplies are not covered here. VAGST is added to most goods and services supplied by a registered business and to most imports."],
    };
  },
  resultado: [
    { clave: "sin", etiqueta: "Price without VAGST", formato: "moneda" },
    { clave: "impuesto", etiqueta: "VAGST", formato: "moneda", destacada: true },
    { clave: "con", etiqueta: "Price with VAGST", formato: "moneda", destacada: true },
    { clave: "registro", etiqueta: "Registration check", formato: "texto" },
  ],
});
