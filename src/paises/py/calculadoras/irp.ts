import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.irp",
  mercado: "py",
  concepto: "impuesto-renta",
  slug: "irp",
  estado: "publicado",
  requiere: {
    "py.irp-escala": "escala",
    "py.irp-monto-no-alcanzado": "numero",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ingresos brutos del año por tu trabajo",
      ayuda: "Salarios, honorarios y otras remuneraciones por servicios personales, de enero a diciembre.",
      min: 0,
    },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos deducibles del año",
      ayuda: "Gastos tuyos y de tu familia a cargo, en el país y con comprobante: alimentación, ropa, alquiler, salud, educación, entre otros.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const umbral = valores["py.irp-monto-no-alcanzado"];
    const alcanzado = entrada.ingresos > umbral;
    const rentaNeta = Math.max(0, entrada.ingresos - entrada.gastos);
    // Ley 6380/2019, art. 69: escala progresiva; cada porción de la renta neta paga la tasa de su tramo.
    const impuesto = alcanzado ? redondear(aplicarEscalaMarginal(valores["py.irp-escala"], rentaNeta)) : 0;
    const observaciones: string[] = [];
    if (!alcanzado) observaciones.push("Tus ingresos no pasan el monto no alcanzado, así que no pagás IRP. Si estás inscripto, igual presentás la declaración.");
    else observaciones.push("La declaración jurada del IRP se presenta y se paga en marzo del año siguiente.");
    return {
      rentaNeta,
      impuesto,
      tasaEfectiva: entrada.ingresos > 0 ? (impuesto / entrada.ingresos) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaNeta", etiqueta: "Renta neta (ingresos menos gastos)", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRP a pagar", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre tus ingresos", formato: "porcentaje" },
  ],
});
