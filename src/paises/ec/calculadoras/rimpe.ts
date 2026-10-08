import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const TOPE_NEGOCIO_POPULAR = 20000;
const TOPE_RIMPE = 300000;

export default definirCalculadora({
  id: "ec.rimpe",
  mercado: "ec",
  concepto: "regimen-simplificado",
  slug: "rimpe",
  estado: "publicado",
  requiere: {
    "ec.rimpe-negocios-populares": "escala",
    "ec.rimpe-emprendedores": "escala",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Quién declara",
      opciones: [
        { valor: "natural", etiqueta: "Persona natural" },
        { valor: "sociedad", etiqueta: "Sociedad" },
      ],
      porDefecto: "natural",
    },
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ingresos brutos del año",
      ayuda: "Lo facturado en el año por las actividades del RIMPE, menos descuentos y devoluciones.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.ingresos > TOPE_RIMPE) throw new ErrorEntrada("Con ingresos de más de USD 300.000 ya no estás en el RIMPE: pasas al régimen general.", "ingresos");
    const negocioPopular = entrada.tipo === "natural" && entrada.ingresos <= TOPE_NEGOCIO_POPULAR;
    const observaciones: string[] = [];
    let impuesto: number | null;
    if (negocioPopular) {
      impuesto = redondear(aplicarEscala(valores["ec.rimpe-negocios-populares"], entrada.ingresos));
      observaciones.push("Como negocio popular no declaras IVA: la cuota ya lo incluye.");
    } else if (entrada.ingresos < TOPE_NEGOCIO_POPULAR) {
      impuesto = null;
      observaciones.push("La tabla del SRI para emprendedores empieza en USD 20.000. Para una sociedad con menos ingresos, consulta tu caso con el SRI.");
    } else {
      impuesto = redondear(aplicarEscala(valores["ec.rimpe-emprendedores"], entrada.ingresos));
      observaciones.push("Como emprendedor declaras el IVA aparte, cada semestre.");
    }
    return {
      categoria: negocioPopular ? "Negocio popular" : "Emprendedor",
      impuesto,
      mensual: impuesto === null ? null : redondear(impuesto / 12),
      tasaEfectiva: impuesto === null || entrada.ingresos === 0 ? null : (impuesto / entrada.ingresos) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "categoria", etiqueta: "Categoría en el RIMPE", formato: "texto" },
    { clave: "impuesto", etiqueta: "Impuesto a la renta del año", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Equivale por mes a", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje sobre tus ingresos", formato: "porcentaje" },
  ],
});
