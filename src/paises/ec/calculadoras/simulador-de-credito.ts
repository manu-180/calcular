import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const MESES_DEL_ANIO = 12;

export default definirCalculadora({
  id: "ec.simulador-de-credito",
  mercado: "ec",
  concepto: "propio",
  slug: "simulador-de-credito",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto del crédito", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés nominal anual", ayuda: "La que figura en la oferta de tu banco o cooperativa.", min: 0, max: 60 },
    { id: "meses", tipo: "entero", etiqueta: "Plazo en meses", min: 1, max: 360, porDefecto: 24 },
    {
      id: "sistema",
      tipo: "opcion",
      etiqueta: "Tipo de amortización",
      opciones: [
        { valor: "frances", etiqueta: "Cuota fija (francesa)" },
        { valor: "aleman", etiqueta: "Cuota decreciente (alemana)" },
      ],
      porDefecto: "frances",
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.meses < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un mes.", "meses");
    const i = entrada.tasa / 100 / MESES_DEL_ANIO;
    const n = entrada.meses;
    const P = entrada.monto;
    let primera: number;
    let ultima: number;
    let total: number;
    if (entrada.sistema === "aleman") {
      const capital = P / n;
      primera = capital + P * i;
      ultima = capital + capital * i;
      total = P + (i * P * (n + 1)) / 2;
    } else {
      const cuota = i === 0 ? P / n : (P * i) / (1 - Math.pow(1 + i, -n));
      primera = cuota;
      ultima = cuota;
      total = cuota * n;
    }
    return {
      primera: redondear(primera),
      ultima: redondear(ultima),
      intereses: redondear(total - P),
      total: redondear(total),
      observaciones: [
        "La cuota real suma seguros de desgravamen y otros cargos que cobra cada entidad. Pide la tabla de amortización antes de firmar.",
      ],
    };
  },
  resultado: [
    { clave: "primera", etiqueta: "Primera cuota mensual", formato: "moneda", destacada: true },
    { clave: "ultima", etiqueta: "Última cuota mensual", formato: "moneda" },
    { clave: "intereses", etiqueta: "Total de intereses", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar", formato: "moneda" },
  ],
});
