import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.valor-uf",
  mercado: "cl",
  concepto: "conversor-unidad",
  slug: "valor-uf",
  estado: "publicado",
  requiere: {
    "cl.uf": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "uf-a-pesos", etiqueta: "UF a pesos" },
        { valor: "pesos-a-uf", etiqueta: "Pesos a UF" },
      ],
      porDefecto: "uf-a-pesos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"];
    const aPesos = entrada.sentido === "uf-a-pesos";
    return {
      valorUf: uf.valor,
      fechaUf: uf.fecha,
      pesos: aPesos ? redondear(entrada.monto * uf.valor) : null,
      enUf: aPesos ? null : entrada.monto / uf.valor,
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "enUf", etiqueta: "Equivale a (UF)", formato: "numero", decimales: 4, destacada: true },
    { clave: "valorUf", etiqueta: "Valor de la UF", formato: "moneda", decimales: 2 },
    { clave: "fechaUf", etiqueta: "Fecha del valor", formato: "fecha" },
  ],
});
