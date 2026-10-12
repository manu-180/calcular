import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.4x1000",
  mercado: "co",
  concepto: "propio",
  slug: "4x1000",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.gmf-tarifa": "numero",
    "co.gmf-exencion": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Valor del retiro o la transferencia", min: 0 },
    { id: "marcada", tipo: "si-no", etiqueta: "La cuenta está marcada como exenta del 4x1000", porDefecto: false },
    {
      id: "usado",
      tipo: "moneda",
      etiqueta: "Lo que ya retiraste este mes de esa cuenta",
      ayuda: "Solo si la cuenta está marcada. La exención es por mes.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const exencionMes = valores["co.gmf-exencion"] * valores["co.uvt"];
    const disponible = entrada.marcada ? Math.max(0, exencionMes - entrada.usado) : 0;
    const exento = Math.min(entrada.monto, disponible);
    const gravado = entrada.monto - exento;
    const gmf = redondear(porcentaje(gravado, valores["co.gmf-tarifa"]));
    return {
      exencionMes,
      exento,
      gravado,
      gmf,
      total: entrada.monto + gmf,
    };
  },
  resultado: [
    { clave: "exencionMes", etiqueta: "Exención mensual de la cuenta marcada", formato: "moneda", decimales: 0 },
    { clave: "exento", etiqueta: "Parte del movimiento que no paga", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "gravado", etiqueta: "Parte que paga 4x1000", formato: "moneda", decimales: 0 },
    { clave: "gmf", etiqueta: "4x1000 a pagar", formato: "moneda", decimales: 0, destacada: true },
    { clave: "total", etiqueta: "Lo que sale de tu cuenta en total", formato: "moneda", decimales: 0 },
  ],
});
