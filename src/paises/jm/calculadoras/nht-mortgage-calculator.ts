import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

function tasaPara(escala: readonly FilaEscala[], ingreso: number): number {
  const fila = escala.find((f) => ingreso >= f.desde && (f.hasta === null || ingreso < f.hasta)) ?? escala[0];
  return fila.tasa;
}

export default definirCalculadora({
  id: "jm.nht-mortgage-calculator",
  mercado: "jm",
  concepto: "propio",
  slug: "nht-mortgage-calculator",
  estado: "publicado",
  requiere: {
    "jm.nht-interest-rates": "escala",
    "jm.nht-max-years": "numero",
    "jm.nht-open-market-limit": "numero",
  },
  campos: [
    { id: "prestamo", tipo: "moneda", etiqueta: "NHT loan amount", min: 0, porDefecto: 9000000 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Your gross weekly income", min: 0, porDefecto: 45000, ayuda: "With co-applicants, use the average of all your weekly incomes." },
    { id: "anios", tipo: "entero", etiqueta: "Years to repay", min: 1, max: 40, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.prestamo <= 0) throw new ErrorEntrada("Enter the loan amount.", "prestamo");
    if (e.anios < 1 || e.anios > v["jm.nht-max-years"]) throw new ErrorEntrada(`NHT loans run for 1 to ${v["jm.nht-max-years"]} years.`, "anios");
    const tasa = tasaPara(v["jm.nht-interest-rates"], e.ingreso);
    const n = e.anios * 12;
    const i = tasa / 100 / 12;
    const cuota = redondear(i === 0 ? e.prestamo / n : (e.prestamo * i) / (1 - Math.pow(1 + i, -n)));
    const total = redondear(cuota * n);
    const observaciones: string[] = [];
    if (e.prestamo > v["jm.nht-open-market-limit"]) observaciones.push("The amount is above the NHT open market limit for one applicant. A co-applicant or a top-up loan from a bank may be needed.");
    observaciones.push("NHT payments also cover life and/or peril insurance, which are not in this figure.");
    return { cuota, tasa, total, intereses: redondear(total - e.prestamo), observaciones };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Monthly payment (principal and interest)", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "NHT interest rate for your income", formato: "porcentaje" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total interest", formato: "moneda" },
  ],
});
