import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.holiday-pay",
  mercado: "nz",
  concepto: "vacaciones",
  slug: "holiday-pay",
  estado: "publicado",
  requiere: {
    "nz.annual-holidays-weeks": "numero",
    "nz.holiday-pay-payg-rate": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "What do you want to work out?",
      opciones: [
        { valor: "taking", etiqueta: "Pay for annual holidays I'm taking" },
        { valor: "payg", etiqueta: "8% holiday pay (pay-as-you-go or leaving before 12 months)" },
      ],
      porDefecto: "taking",
    },
    { id: "ganancias", tipo: "moneda", etiqueta: "Gross earnings in the last 12 months (or since you started)", min: 0, porDefecto: 62400 },
    { id: "semanaOrdinaria", tipo: "moneda", etiqueta: "Your ordinary weekly pay", min: 0, porDefecto: 1200, ayuda: "What you usually get for a normal week, including regular allowances and overtime." },
    { id: "semanasTrabajadas", tipo: "numero", etiqueta: "Weeks those earnings cover", min: 1, max: 52, porDefecto: 52 },
    { id: "semanasVacaciones", tipo: "numero", etiqueta: "Weeks of holiday you're taking", min: 0, max: 52, porDefecto: 1 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ganancias <= 0) throw new ErrorEntrada("Enter your gross earnings.", "ganancias");
    if (entrada.modo === "payg") {
      return {
        total: redondear((entrada.ganancias * v["nz.holiday-pay-payg-rate"]) / 100),
        semanal: null,
        awe: null,
        owp: null,
        base: null,
        derecho: v["nz.annual-holidays-weeks"],
        observaciones: ["When you leave, any 8% already paid for holidays you took in advance or on a pay-as-you-go basis comes off this amount."],
      };
    }
    if (entrada.semanasVacaciones <= 0) throw new ErrorEntrada("Enter how many weeks of holiday you're taking.", "semanasVacaciones");
    const awe = redondear(entrada.ganancias / entrada.semanasTrabajadas);
    const owp = redondear(entrada.semanaOrdinaria);
    const semanal = Math.max(awe, owp);
    return {
      total: redondear(semanal * entrada.semanasVacaciones),
      semanal,
      awe,
      owp,
      base: awe > owp ? "Average weekly earnings" : "Ordinary weekly pay",
      derecho: v["nz.annual-holidays-weeks"],
      observaciones: [] as string[],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Holiday pay", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Holiday pay a week", formato: "moneda" },
    { clave: "base", etiqueta: "Based on", formato: "texto" },
    { clave: "awe", etiqueta: "Average weekly earnings", formato: "moneda" },
    { clave: "owp", etiqueta: "Ordinary weekly pay", formato: "moneda" },
    { clave: "derecho", etiqueta: "Annual holidays after 12 months", formato: "numero", decimales: 0, ayuda: "Weeks a year." },
  ],
});
