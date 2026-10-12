import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.irp-alquiler",
  mercado: "py",
  concepto: "propio",
  slug: "irp-alquiler",
  estado: "publicado",
  requiere: {
    "py.irp-capital-tasa": "numero",
    "py.irp-alquiler-presunta": "numero",
    "py.iva-reducida": "numero",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquileres cobrados en el año", ayuda: "Sin IVA.", min: 0 },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos del inmueble con comprobante",
      ayuda: "Impuesto inmobiliario, mantenimiento, gestión y administración del año.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const presunta = redondear(porcentaje(entrada.alquiler, valores["py.irp-alquiler-presunta"]));
    const real = Math.max(0, entrada.alquiler - entrada.gastos);
    // Ley 6380, art. 59, num. 2: el contribuyente elige; se toma la opción que paga menos.
    const usaPresunta = presunta <= real;
    const rentaNeta = usaPresunta ? presunta : real;
    return {
      presunta,
      real,
      rentaNeta,
      impuesto: redondear(porcentaje(rentaNeta, valores["py.irp-capital-tasa"])),
      observaciones: [
        usaPresunta ? "Te conviene la renta presunta, que sale del alquiler sin restar gastos." : "Te conviene restar tus gastos: la renta real es menor que la presunta.",
        "Va en la declaración del IRP de rentas y ganancias del capital, que se presenta en marzo del año siguiente.",
        `Si sos contribuyente de IVA, el alquiler de vivienda paga además ${valores["py.iva-reducida"]} % de IVA.`,
      ],
    };
  },
  resultado: [
    { clave: "presunta", etiqueta: "Renta presunta (sobre el alquiler)", formato: "moneda" },
    { clave: "real", etiqueta: "Renta real (alquiler menos gastos)", formato: "moneda" },
    { clave: "rentaNeta", etiqueta: "Renta neta que paga", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRP a pagar", formato: "moneda", destacada: true },
  ],
});
