import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.cesantia-iess",
  mercado: "ec",
  concepto: "propio",
  slug: "cesantia-iess",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.cesantia-personal": "numero",
    "ec.cesantia-patronal": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Remuneración mensual promedio", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses aportados", min: 0, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(entrada.sueldo, valores["ec.sbu"]);
    const personal = redondear(porcentaje(base, valores["ec.cesantia-personal"]));
    const patronal = redondear(porcentaje(base, valores["ec.cesantia-patronal"]));
    const mensual = redondear(personal + patronal);
    return {
      personal,
      patronal,
      mensual,
      acumulado: redondear(mensual * entrada.meses),
      observaciones: [
        "Es una estimación sin los rendimientos que suma el fondo. El saldo exacto lo ves en tu cuenta del IESS.",
        "Con jornada completa, el aporte se calcula como mínimo sobre el salario básico.",
      ],
    };
  },
  resultado: [
    { clave: "personal", etiqueta: "Tu aporte mensual a cesantía", formato: "moneda" },
    { clave: "patronal", etiqueta: "Aporte mensual de tu empleador", formato: "moneda" },
    { clave: "mensual", etiqueta: "Total que se ahorra cada mes", formato: "moneda" },
    { clave: "acumulado", etiqueta: "Cesantía acumulada aproximada", formato: "moneda", destacada: true },
  ],
});
