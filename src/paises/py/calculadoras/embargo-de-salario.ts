import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.embargo-de-salario",
  mercado: "py",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "py.embargo-salario": "mapa",
    "py.embargo-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario básico mensual", min: 0 },
    { id: "tipo", tipo: "opcion-dato", dato: "py.embargo-salario", etiqueta: "Tipo de deuda", porDefecto: "otros" },
    {
      id: "otros",
      tipo: "moneda",
      etiqueta: "Lo que ya te embargan por otras deudas",
      ayuda: "Si no tenés otro embargo, dejá 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const porTipo = redondear(porcentaje(entrada.salario, enMapa(valores["py.embargo-salario"], entrada.tipo)));
    // Art. 245: varios embargos juntos nunca pasan del tope sobre el salario básico.
    const tope = redondear(porcentaje(entrada.salario, valores["py.embargo-tope"]));
    const maximo = Math.max(0, Math.min(porTipo, tope - entrada.otros));
    return {
      porTipo,
      maximo,
      teQueda: Math.max(0, entrada.salario - entrada.otros - maximo),
      observaciones: [
        "El aguinaldo y la bonificación familiar no se pueden embargar.",
        "La indemnización y el preaviso solo se pueden embargar a la mitad, y únicamente por pensión alimenticia.",
        "El monto exacto lo fija el juez dentro de estos límites.",
      ],
    };
  },
  resultado: [
    { clave: "porTipo", etiqueta: "Máximo por este tipo de deuda", formato: "moneda" },
    { clave: "maximo", etiqueta: "Embargo máximo posible", formato: "moneda", destacada: true },
    { clave: "teQueda", etiqueta: "Te queda del salario", formato: "moneda" },
  ],
});
