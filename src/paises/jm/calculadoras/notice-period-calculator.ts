import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function tramo(anios: number): string {
  if (anios < 5) return "under-5";
  if (anios < 10) return "5-10";
  if (anios < 15) return "10-15";
  if (anios < 20) return "15-20";
  return "20-plus";
}

export default definirCalculadora({
  id: "jm.notice-period-calculator",
  mercado: "jm",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "jm.notice-weeks": "mapa",
    "jm.employee-notice-weeks": "numero",
  },
  campos: [
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service with the employer", min: 0, max: 60, porDefecto: 6 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal pay for a week", min: 0, porDefecto: 40000 },
    { id: "contrato", tipo: "entero", etiqueta: "Notice in your contract, in weeks (optional)", min: 0, max: 104, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.anios < 0) throw new ErrorEntrada("Years of service cannot be negative.", "anios");
    const legal = enMapa(v["jm.notice-weeks"], tramo(e.anios));
    const semanas = Math.max(legal, e.contrato ?? 0);
    const observaciones: string[] = [];
    if ((e.contrato ?? 0) > legal) observaciones.push("Your contract gives more notice than the Act, so the longer period applies.");
    return {
      semanas,
      enLugar: redondear(semanas * e.semanal),
      legal,
      empleado: v["jm.employee-notice-weeks"],
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Notice your employer must give you", formato: "semanas", destacada: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of that notice", formato: "moneda" },
    { clave: "legal", etiqueta: "Minimum under the Employment (Termination and Redundancy Payments) Act", formato: "semanas" },
    { clave: "empleado", etiqueta: "Notice you must give if you resign", formato: "semanas" },
  ],
});
