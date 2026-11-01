import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.notice-period-calculator",
  mercado: "ug",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "ug.notice-weeks-under-1y": "numero",
    "ug.notice-months-1-5y": "numero",
    "ug.notice-months-5-10y": "numero",
    "ug.notice-months-10y": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Full years of service", min: 0, max: 60, porDefecto: 3 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 1000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual < 0) throw new ErrorEntrada("Pay cannot be negative.", "mensual");
    const total = e.anios * 12 + e.meses;
    const observaciones: string[] = [];
    let semanas: number | null = null;
    let meses: number | null = null;
    if (total <= 6) {
      observaciones.push("The Act sets no minimum notice for six months of service or less. Check your contract.");
    } else if (total < 12) {
      semanas = v["ug.notice-weeks-under-1y"];
    } else if (total < 60) {
      meses = v["ug.notice-months-1-5y"];
    } else if (total < 120) {
      meses = v["ug.notice-months-5-10y"];
    } else {
      meses = v["ug.notice-months-10y"];
    }
    const enLugar = semanas !== null ? redondear(((e.mensual * 12) / 52) * semanas) : meses !== null ? redondear(e.mensual * meses) : 0;
    observaciones.push("If your pay period is longer than this notice, the notice is one full pay period.");
    return { semanas, meses, enLugar, observaciones };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice", formato: "semanas", destacada: true },
    { clave: "meses", etiqueta: "Minimum notice", formato: "meses", destacada: true },
    { clave: "enLugar", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
