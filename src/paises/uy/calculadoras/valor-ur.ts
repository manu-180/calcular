import { definirCalculadora } from "@/motor/calculo";
import { nombreMes } from "../lib/ipc";

export default definirCalculadora({
  id: "uy.valor-ur",
  mercado: "uy",
  concepto: "propio",
  slug: "valor-ur",
  estado: "publicado",
  requiere: {
    "uy.ur": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-pesos", etiqueta: "De UR a pesos" },
        { valor: "desde-pesos", etiqueta: "De pesos a UR" },
      ],
      porDefecto: "a-pesos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ur = valores["uy.ur"];
    const aPesos = entrada.sentido === "a-pesos";
    return {
      valorUr: ur.valor,
      mes: nombreMes(ur.fecha),
      pesos: aPesos ? redondear(entrada.monto * ur.valor) : null,
      enUr: aPesos ? null : entrada.monto / ur.valor,
      observaciones: ["La UR cambia una vez por mes. Se usa en préstamos hipotecarios, cuotas de vivienda y multas."],
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "enUr", etiqueta: "Equivale a (UR)", formato: "numero", decimales: 4, destacada: true },
    { clave: "valorUr", etiqueta: "Valor de la UR", formato: "moneda" },
    { clave: "mes", etiqueta: "Mes del valor", formato: "texto" },
  ],
});
