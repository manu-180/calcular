import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "../lib/fechas";

export default definirCalculadora({
  id: "bt.probation-period-calculator",
  mercado: "bt",
  concepto: "propio",
  slug: "probation-period-calculator",
  estado: "publicado",
  requiere: {
    "bt.probation-max-days": "numero",
    "bt.probation-notice-days": "numero",
    "bt.probation-min-contract-months": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Date you started work", min: "2000-01-01", porDefecto: "hoy" },
    { id: "meses", tipo: "entero", etiqueta: "Length of the contract, in months", min: 1, max: 240, porDefecto: 12 },
    { id: "dias", tipo: "entero", etiqueta: "Probation written in your contract, in days", min: 1, max: 1000, porDefecto: 180 },
  ],
  calcular(e, v) {
    if (e.dias < 1) throw new ErrorEntrada("Enter the days of probation in your contract.", "dias");
    const permitido = e.meses >= v["bt.probation-min-contract-months"];
    const maximo = v["bt.probation-max-days"];
    const aplicados = Math.min(e.dias, maximo);
    const observaciones: string[] = [];
    if (!permitido) observaciones.push("Section 72 lets a contract of one year or more include probation. A shorter contract may not have it.");
    if (e.dias > maximo) observaciones.push("The probation in your contract is longer than the Act allows, so the end date uses the legal maximum.");
    return {
      fin: permitido ? sumarDias(e.inicio, aplicados - 1) : null,
      aplicados: permitido ? aplicados : 0,
      aviso: v["bt.probation-notice-days"],
      maximo,
      observaciones,
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Last day of probation", formato: "fecha", destacada: true },
    { clave: "aplicados", etiqueta: "Days of probation that count", formato: "dias" },
    { clave: "aviso", etiqueta: "Notice either side gives during probation", formato: "dias" },
    { clave: "maximo", etiqueta: "Longest probation the Act allows", formato: "dias" },
  ],
});
