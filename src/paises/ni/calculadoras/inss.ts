import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.inss",
  mercado: "ni",
  concepto: "aportes-seguridad-social",
  slug: "inss",
  estado: "publicado",
  requiere: {
    "ni.inss-laboral": "mapa",
    "ni.inss-patronal": "mapa",
    "ni.inatec": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    { id: "regimen", tipo: "opcion-dato", dato: "ni.inss-laboral", etiqueta: "Régimen del INSS", porDefecto: "integral" },
    {
      id: "tamano",
      tipo: "opcion",
      etiqueta: "Cantidad de trabajadores de la empresa",
      opciones: [
        { valor: "menos-50", etiqueta: "Menos de 50" },
        { valor: "50-o-mas", etiqueta: "50 o más" },
      ],
      porDefecto: "menos-50",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaLaboral = enMapa(valores["ni.inss-laboral"], entrada.regimen);
    const tasaPatronal = enMapa(valores["ni.inss-patronal"], `${entrada.regimen}-${entrada.tamano}`);
    const laboral = redondear(porcentaje(entrada.salario, tasaLaboral));
    const patronal = redondear(porcentaje(entrada.salario, tasaPatronal));
    const inatec = redondear(porcentaje(entrada.salario, valores["ni.inatec"]));
    return {
      tasaLaboral,
      laboral,
      tasaPatronal,
      patronal,
      inatec,
      total: redondear(laboral + patronal + inatec),
      observaciones: [
        "No hay techo: desde febrero de 2019 se cotiza sobre todo el salario.",
        "La parte laboral se descuenta de tu salario. La patronal y el INATEC los paga el empleador aparte.",
        "El aguinaldo no paga INSS. Las horas extras, las comisiones y las vacaciones pagadas sí.",
      ],
    };
  },
  resultado: [
    { clave: "tasaLaboral", etiqueta: "Tasa del trabajador", formato: "porcentaje", decimales: 2 },
    { clave: "laboral", etiqueta: "INSS laboral (se descuenta del salario)", formato: "moneda", destacada: true },
    { clave: "tasaPatronal", etiqueta: "Tasa del empleador", formato: "porcentaje", decimales: 2 },
    { clave: "patronal", etiqueta: "INSS patronal", formato: "moneda" },
    { clave: "inatec", etiqueta: "INATEC (a cargo del empleador)", formato: "moneda" },
    { clave: "total", etiqueta: "Total que se entera al INSS y al INATEC", formato: "moneda" },
  ],
});
