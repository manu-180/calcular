import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.valor-ui",
  mercado: "uy",
  concepto: "conversor-unidad",
  slug: "valor-ui",
  estado: "publicado",
  requiere: {
    "uy.ui": "serie",
    "uy.bpc": "numero",
  },
  campos: [
    {
      id: "unidad",
      tipo: "opcion",
      etiqueta: "Unidad",
      opciones: [
        { valor: "ui", etiqueta: "Unidad Indexada (UI)" },
        { valor: "bpc", etiqueta: "Base de Prestaciones y Contribuciones (BPC)" },
      ],
      porDefecto: "ui",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-pesos", etiqueta: "De la unidad a pesos" },
        { valor: "desde-pesos", etiqueta: "De pesos a la unidad" },
      ],
      porDefecto: "a-pesos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ui = valores["uy.ui"];
    const valorUnidad = entrada.unidad === "ui" ? ui.valor : valores["uy.bpc"];
    const aPesos = entrada.sentido === "a-pesos";
    return {
      valorUnidad,
      fechaUi: entrada.unidad === "ui" ? ui.fecha : null,
      pesos: aPesos ? redondear(entrada.monto * valorUnidad) : null,
      enUnidad: aPesos ? null : entrada.monto / valorUnidad,
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "enUnidad", etiqueta: "Equivale a (unidades)", formato: "numero", decimales: 4, destacada: true },
    { clave: "valorUnidad", etiqueta: "Valor de la unidad", formato: "moneda", decimales: 4 },
    { clave: "fechaUi", etiqueta: "Fecha del valor de la UI", formato: "fecha" },
  ],
});
