import { definirCalculadora } from "@/motor/calculo";

// Las liquidaciones de sueldo en Chile dividen el sueldo mensual por 30 para el valor día, sin importar
// cuántos días tenga el mes (es el mismo divisor que usa la fórmula de la hora extra de la DT).
const DIAS_MES = 30;

export default definirCalculadora({
  id: "cl.sueldo-proporcional",
  mercado: "cl",
  concepto: "propio",
  slug: "sueldo-proporcional",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el mes",
      ayuda: "Si entraste a mitad de mes, cuenta desde tu primer día hasta el 30. Si faltaste sin goce de sueldo, resta esos días.",
      min: 0,
      max: 30,
      porDefecto: 15,
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    const valorDia = entrada.sueldo / DIAS_MES;
    return {
      valorDia: redondear(valorDia),
      proporcional: redondear(valorDia * entrada.dias),
      descuento: redondear(valorDia * (DIAS_MES - entrada.dias)),
    };
  },
  resultado: [
    { clave: "proporcional", etiqueta: "Sueldo proporcional", formato: "moneda", destacada: true },
    { clave: "valorDia", etiqueta: "Valor de un día", formato: "moneda" },
    { clave: "descuento", etiqueta: "Diferencia con el mes completo", formato: "moneda" },
  ],
});
