import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.ufv",
  mercado: "bo",
  concepto: "conversor-unidad",
  slug: "ufv",
  estado: "publicado",
  requiere: {
    "bo.ufv": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quiere convertir",
      opciones: [
        { valor: "a-bolivianos", etiqueta: "De UFV a bolivianos" },
        { valor: "a-ufv", etiqueta: "De bolivianos a UFV" },
      ],
      porDefecto: "a-bolivianos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ufv = valores["bo.ufv"];
    const aBolivianos = entrada.sentido === "a-bolivianos";
    return {
      bolivianos: aBolivianos ? redondear(entrada.monto * ufv.valor) : null,
      ufvs: aBolivianos ? null : redondear(entrada.monto / ufv.valor),
      valorUfv: ufv.valor,
      fecha: ufv.fecha,
    };
  },
  resultado: [
    { clave: "bolivianos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "ufvs", etiqueta: "Equivale a (UFV)", formato: "numero", decimales: 2, destacada: true },
    { clave: "valorUfv", etiqueta: "Valor de la UFV (Bs)", formato: "numero", decimales: 5 },
    { clave: "fecha", etiqueta: "Fecha del valor", formato: "fecha" },
  ],
});
