import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.annual-leave-calculator",
  mercado: "rw",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "rw.leave-days-per-month": "numero",
    "rw.leave-days-per-month-minor": "numero",
    "rw.leave-extra-every-years": "numero",
    "rw.leave-max-days": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months worked in the leave year", min: 0, max: 12, porDefecto: 12 },
    { id: "anios", tipo: "entero", etiqueta: "Full years with the enterprise", min: 0, porDefecto: 3 },
    { id: "menor", tipo: "si-no", etiqueta: "Aged 16 or 17", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.meses < 0 || e.meses > 12) throw new ErrorEntrada("Enter between 0 and 12 months.", "meses");
    if (e.anios < 0) throw new ErrorEntrada("Years cannot be negative.", "anios");
    const porMes = e.menor ? v["rw.leave-days-per-month-minor"] : v["rw.leave-days-per-month"];
    const base = e.meses * porMes;
    const extra = Math.floor(e.anios / v["rw.leave-extra-every-years"]);
    const total = Math.min(base + extra, v["rw.leave-max-days"]);
    const observaciones = ["Days are working days. Public holidays do not count as leave."];
    if (base + extra > v["rw.leave-max-days"]) observaciones.push(`The law caps paid annual leave at ${v["rw.leave-max-days"]} working days, so the total is limited.`);
    if (e.anios < 1) observaciones.push("A new employee takes annual leave after 12 months of service, probation included. If the contract ends earlier, the days earned are paid.");
    return { total, base, extra, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Paid annual leave", formato: "dias", destacada: true },
    { clave: "base", etiqueta: "Earned by months worked", formato: "dias" },
    { clave: "extra", etiqueta: "Extra days for years of service", formato: "dias" },
  ],
});
