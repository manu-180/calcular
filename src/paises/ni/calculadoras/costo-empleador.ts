import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.costo-empleador",
  mercado: "ni",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "ni.inss-patronal": "mapa",
    "ni.inss-laboral": "mapa",
    "ni.inatec": "numero",
    "ni.aguinaldo-meses": "numero",
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
    const { salario } = entrada;
    const tasaPatronal = enMapa(valores["ni.inss-patronal"], `${entrada.regimen}-${entrada.tamano}`);
    const inssPatronal = redondear(porcentaje(salario, tasaPatronal));
    const inatec = redondear(porcentaje(salario, valores["ni.inatec"]));
    const aguinaldo = redondear((salario * valores["ni.aguinaldo-meses"]) / 12);
    const mensual = redondear(salario + inssPatronal + inatec + aguinaldo);
    return {
      tasaPatronal,
      inssPatronal,
      inatec,
      aguinaldo,
      mensual,
      anual: redondear(mensual * 12),
      observaciones: [
        "El aguinaldo no paga INSS: se suma aparte, como reserva de cada mes. El INATEC se calcula sobre el salario del mes.",
        "No incluye la indemnización por antigüedad, que se paga solo si termina la relación, ni las horas extras.",
      ],
    };
  },
  resultado: [
    { clave: "inssPatronal", etiqueta: "INSS patronal", formato: "moneda" },
    { clave: "tasaPatronal", etiqueta: "Tasa del INSS patronal", formato: "porcentaje", decimales: 2 },
    { clave: "inatec", etiqueta: "Aporte al INATEC", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (reserva mensual)", formato: "moneda" },
    { clave: "mensual", etiqueta: "Costo mensual del trabajador", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual", formato: "moneda" },
  ],
});
