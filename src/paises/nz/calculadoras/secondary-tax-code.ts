import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const CODIGOS = ["SB", "S", "SH", "ST", "SA"] as const;

export default definirCalculadora({
  id: "nz.secondary-tax-code",
  mercado: "nz",
  concepto: "propio",
  slug: "secondary-tax-code",
  estado: "publicado",
  requiere: {
    "nz.income-tax-rates": "escala",
    "nz.acc-earners-levy-rate": "numero",
    "nz.student-loan-rate": "numero",
  },
  campos: [
    { id: "total", tipo: "moneda", etiqueta: "Your expected yearly income from all jobs", min: 0, porDefecto: 50000 },
    { id: "pago", tipo: "moneda", etiqueta: "Pay from your second job each pay day", min: 0, porDefecto: 400 },
    { id: "prestamo", tipo: "si-no", etiqueta: "You have a student loan", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.total <= 0) throw new ErrorEntrada("Enter your expected income from all jobs.", "total");
    if (entrada.pago < 0) throw new ErrorEntrada("Pay can't be negative.", "pago");
    const escala = v["nz.income-tax-rates"];
    let i = escala.findIndex((f) => f.hasta === null || entrada.total <= f.hasta);
    if (i < 0) i = escala.length - 1;
    const codigo = `${CODIGOS[Math.min(i, CODIGOS.length - 1)]}${entrada.prestamo ? " SL" : ""}`;
    const tasa = escala[i].tasa + v["nz.acc-earners-levy-rate"];
    const paye = redondear((entrada.pago * tasa) / 100);
    const prestamo = entrada.prestamo ? redondear((entrada.pago * v["nz.student-loan-rate"]) / 100) : 0;
    return {
      codigo,
      tasa,
      paye,
      prestamo,
      neto: redondear(entrada.pago - paye - prestamo),
    };
  },
  resultado: [
    { clave: "codigo", etiqueta: "Your secondary tax code", formato: "texto", destacada: true },
    { clave: "tasa", etiqueta: "PAYE rate on that pay (including the ACC levy)", formato: "porcentaje", decimales: 2 },
    { clave: "paye", etiqueta: "PAYE each pay day", formato: "moneda" },
    { clave: "prestamo", etiqueta: "Student loan each pay day", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Take-home from your second job", formato: "moneda" },
  ],
});
