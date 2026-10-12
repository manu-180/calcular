import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.literal-e",
  mercado: "uy",
  concepto: "propio",
  slug: "literal-e",
  estado: "publicado",
  requiere: {
    "uy.literal-e-pago": "numero",
    "uy.literal-e-tope": "numero",
    "uy.literal-e-gradualidad": "mapa",
    "uy.literal-e-tope-ingresos": "numero",
    "uy.ui-inicio-anio": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Lo que facturás (o pensás facturar) en el año", min: 0 },
    {
      id: "etapa",
      tipo: "opcion",
      etiqueta: "Desde cuándo tenés la empresa",
      opciones: [
        { valor: "1", etiqueta: "Empecé hace menos de 12 meses (desde 2021)" },
        { valor: "2", etiqueta: "Entre 12 y 24 meses (desde 2021)" },
        { valor: "3", etiqueta: "Más de 24 meses, o empecé antes de 2021" },
      ],
      porDefecto: "3",
    },
    {
      id: "cfe",
      tipo: "si-no",
      etiqueta: "Facturás solo con comprobantes electrónicos (e-factura o e-ticket)",
      ayuda: "Si es así, el pago no puede pasar del 3,3 % de lo que facturás en el mes.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.ingresos < 0) throw new ErrorEntrada("Los ingresos no pueden ser negativos.", "ingresos");
    const topePesos = redondear(valores["uy.literal-e-tope"] * valores["uy.ui-inicio-anio"]);
    const dentro = entrada.ingresos <= topePesos;
    const observaciones: string[] = [];
    if (!dentro) {
      observaciones.push("Con esos ingresos pasás el límite del literal E: tenés que tributar IVA e IRAE por el régimen general. Consultalo con un contador.");
      return { topePesos, dentro: "No", pagoBase: null, pagoMensual: null, pagoAnual: null, observaciones };
    }
    const pagoBase = redondear(porcentaje(valores["uy.literal-e-pago"], enMapa(valores["uy.literal-e-gradualidad"], entrada.etapa)));
    const tope = entrada.cfe ? redondear(porcentaje(entrada.ingresos / 12, valores["uy.literal-e-tope-ingresos"])) : null;
    const pagoMensual = tope === null ? pagoBase : Math.min(pagoBase, tope);
    if (tope !== null && tope < pagoBase) observaciones.push("Como facturás con comprobantes electrónicos, el pago baja al 3,3 % de lo que facturás en el mes (calculado con tu promedio).");
    observaciones.push("Es el IVA fijo del literal E. Los aportes al BPS de tu empresa se pagan aparte.");
    return { topePesos, dentro: "Sí", pagoBase, pagoMensual, pagoAnual: redondear(pagoMensual * 12), observaciones };
  },
  resultado: [
    { clave: "dentro", etiqueta: "Entrás en el literal E", formato: "texto" },
    { clave: "topePesos", etiqueta: "Límite de facturación del año", formato: "moneda" },
    { clave: "pagoBase", etiqueta: "Pago fijo de IVA según tu etapa", formato: "moneda" },
    { clave: "pagoMensual", etiqueta: "Lo que pagás de IVA por mes", formato: "moneda", destacada: true },
    { clave: "pagoAnual", etiqueta: "En el año", formato: "moneda" },
  ],
});
