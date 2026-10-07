import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.valor-utm",
  mercado: "cl",
  concepto: "propio",
  slug: "valor-utm",
  estado: "publicado",
  requiere: {
    "cl.utm": "serie",
  },
  campos: [
    {
      id: "unidad",
      tipo: "opcion",
      etiqueta: "Unidad",
      opciones: [
        { valor: "utm", etiqueta: "UTM (mensual)" },
        { valor: "uta", etiqueta: "UTA (anual, 12 UTM)" },
      ],
      porDefecto: "utm",
    },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "a-pesos", etiqueta: "Unidades a pesos" },
        { valor: "a-unidades", etiqueta: "Pesos a unidades" },
      ],
      porDefecto: "a-pesos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const utm = valores["cl.utm"];
    const valorUnidad = entrada.unidad === "uta" ? utm.valor * 12 : utm.valor;
    const aPesos = entrada.sentido === "a-pesos";
    return {
      valorUtm: utm.valor,
      valorUta: utm.valor * 12,
      mesUtm: utm.fecha,
      pesos: aPesos ? redondear(entrada.monto * valorUnidad) : null,
      unidades: aPesos ? null : entrada.monto / valorUnidad,
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "unidades", etiqueta: "Equivale a (unidades)", formato: "numero", decimales: 4, destacada: true },
    { clave: "valorUtm", etiqueta: "Valor de la UTM", formato: "moneda" },
    { clave: "valorUta", etiqueta: "Valor de la UTA", formato: "moneda" },
    { clave: "mesUtm", etiqueta: "Rige desde", formato: "fecha" },
  ],
});
