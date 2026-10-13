import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.bonificacion-familiar",
  mercado: "py",
  concepto: "propio",
  slug: "bonificacion-familiar",
  estado: "publicado",
  requiere: {
    "py.salario-minimo": "numero",
    "py.bonificacion-familiar": "numero",
    "py.bonificacion-familiar-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Tu salario mensual", min: 0 },
    {
      id: "hijos",
      tipo: "entero",
      etiqueta: "Hijos con derecho",
      ayuda: "Menores de 17 años (o con discapacidad total, sin límite de edad), a tu cargo y que vivan en Paraguay.",
      min: 0,
      max: 20,
      porDefecto: 1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const minimo = valores["py.salario-minimo"];
    const tope = redondear(porcentaje(minimo, valores["py.bonificacion-familiar-tope"]));
    const porHijo = redondear(porcentaje(minimo, valores["py.bonificacion-familiar"]));
    const corresponde = entrada.salario <= tope;
    const observaciones = [
      "Se cobra desde que avisás por escrito al empleador y le das el certificado de nacimiento de cada hijo.",
      "Si los dos padres trabajan en relación de dependencia, la cobra uno solo.",
    ];
    if (!corresponde) observaciones.unshift("Tu salario pasa el tope, así que no te corresponde la bonificación familiar.");
    return {
      porHijo,
      tope,
      total: corresponde ? redondear(porHijo * entrada.hijos) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "porHijo", etiqueta: "Bonificación por cada hijo", formato: "moneda" },
    { clave: "tope", etiqueta: "Salario máximo para cobrarla", formato: "moneda" },
    { clave: "total", etiqueta: "Bonificación familiar del mes", formato: "moneda", destacada: true },
  ],
});
