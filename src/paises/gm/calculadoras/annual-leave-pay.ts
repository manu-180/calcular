import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.annual-leave-pay",
  mercado: "gm",
  concepto: "vacaciones",
  slug: "annual-leave-pay",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "derecho", tipo: "entero", etiqueta: "Annual leave days a year in your contract", min: 0, max: 60, porDefecto: 21, ayuda: "The Labour Act leaves the number of days to your contract, collective agreement or Joint Industrial Council agreement." },
    { id: "meses", tipo: "numero", etiqueta: "Months worked in the current leave year", min: 0, max: 12, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken", min: 0, porDefecto: 0 },
    { id: "salario", tipo: "moneda", etiqueta: "Monthly salary (without bonus or overtime)", min: 0, porDefecto: 10000 },
    { id: "laborables", tipo: "numero", etiqueta: "Working days in a month", min: 1, max: 31, porDefecto: 22, ayuda: "Used to turn your monthly salary into a daily rate." },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly salary.", "salario");
    const acumulados = (entrada.derecho * entrada.meses) / 12;
    const pendientes = Math.max(0, acumulados - entrada.tomados);
    const diario = entrada.salario / entrada.laborables;
    const observaciones = acumulados < entrada.tomados ? ["You have taken more leave than you have built up so far this year."] : [];
    return {
      pago: redondear(pendientes * diario),
      acumulados: redondear(acumulados),
      pendientes: redondear(pendientes),
      diario: redondear(diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Pay for unused leave", formato: "moneda", destacada: true },
    { clave: "acumulados", etiqueta: "Leave built up this year", formato: "dias", decimales: 2 },
    { clave: "pendientes", etiqueta: "Unused leave", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "Daily rate", formato: "moneda" },
  ],
});
