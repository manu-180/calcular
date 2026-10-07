import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.uma",
  mercado: "mx",
  concepto: "conversor-unidad",
  slug: "uma",
  estado: "publicado",
  requiere: {
    "mx.uma-diaria": "numero",
    "mx.uma-mensual": "numero",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "uma-a-pesos", etiqueta: "UMA a pesos" },
        { valor: "pesos-a-uma", etiqueta: "Pesos a UMA" },
      ],
      porDefecto: "uma-a-pesos",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
    {
      id: "valor",
      tipo: "opcion",
      etiqueta: "Valor de la UMA",
      opciones: [
        { valor: "diaria", etiqueta: "Diaria (multas y la mayoría de los límites)" },
        { valor: "mensual", etiqueta: "Mensual" },
        { valor: "anual", etiqueta: "Anual" },
      ],
      porDefecto: "diaria",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = valores["mx.uma-mensual"];
    // El valor anual no es un dato aparte: por método legal es la UMA mensual por 12 (INEGI, DOF 9/01/2026).
    const uma = entrada.valor === "diaria" ? valores["mx.uma-diaria"] : entrada.valor === "mensual" ? mensual : redondear(mensual * 12);
    if (uma <= 0) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const pesos = entrada.sentido === "uma-a-pesos" ? redondear(entrada.cantidad * uma) : null;
    const umas = entrada.sentido === "pesos-a-uma" ? entrada.cantidad / uma : null;
    return { uma, pesos, umas };
  },
  resultado: [
    { clave: "uma", etiqueta: "Valor de una UMA", formato: "moneda" },
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "umas", etiqueta: "Equivale a (UMA)", formato: "numero", decimales: 4, destacada: true },
  ],
});
