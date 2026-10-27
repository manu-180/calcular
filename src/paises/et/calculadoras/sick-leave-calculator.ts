import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// El artículo 86 cuenta la licencia en meses; la calculadora pide días y toma el mes de 30 días.
const DIAS_MES = 30;

export default definirCalculadora({
  id: "et.sick-leave-calculator",
  mercado: "et",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "et.sick-full-months": "numero",
    "et.sick-half-months": "numero",
    "et.sick-half-rate": "numero",
    "et.sick-unpaid-months": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary", min: 0, porDefecto: 9000 },
    { id: "dias", tipo: "entero", etiqueta: "Days of sick leave in the last 12 months", min: 1, max: 180, porDefecto: 45, ayuda: "Count from the first day of the illness. Separate spells add up." },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    const limiteCompleto = v["et.sick-full-months"] * DIAS_MES;
    const limiteMedio = limiteCompleto + v["et.sick-half-months"] * DIAS_MES;
    const limiteTotal = limiteMedio + v["et.sick-unpaid-months"] * DIAS_MES;
    if (e.dias > limiteTotal) throw new ErrorEntrada("Sick leave cannot go beyond six months in a 12-month period.", "dias");
    const completos = Math.min(e.dias, limiteCompleto);
    const medios = Math.max(0, Math.min(e.dias, limiteMedio) - limiteCompleto);
    const sinPago = Math.max(0, e.dias - limiteMedio);
    const diario = e.salario / DIAS_MES;
    const pagoCompleto = redondear(completos * diario);
    const pagoMedio = redondear(porcentaje(medios * diario, v["et.sick-half-rate"]));
    return {
      total: redondear(pagoCompleto + pagoMedio),
      completos,
      pagoCompleto,
      medios,
      pagoMedio,
      sinPago,
      perdido: redondear(e.dias * diario - pagoCompleto - pagoMedio),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Pay during your sick leave", formato: "moneda", destacada: true },
    { clave: "completos", etiqueta: "Days on full pay", formato: "dias" },
    { clave: "pagoCompleto", etiqueta: "Pay for those days", formato: "moneda" },
    { clave: "medios", etiqueta: "Days on half pay", formato: "dias" },
    { clave: "pagoMedio", etiqueta: "Pay for half-pay days", formato: "moneda", ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "Days without pay", formato: "dias" },
    { clave: "perdido", etiqueta: "Salary you do not receive", formato: "moneda" },
  ],
});
