import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.asociacion-solidarista",
  mercado: "cr",
  concepto: "propio",
  slug: "asociacion-solidarista",
  estado: "publicado",
  requiere: {
    "cr.solidarista-ahorro": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario reportado a la CCSS", min: 0 },
    {
      id: "ahorro",
      tipo: "porcentaje",
      etiqueta: "Ahorro obligatorio que fijó la asamblea",
      ayuda: "Entre 3 % y 5 % del salario.",
      min: 0,
      max: 100,
      porDefecto: 5,
    },
    {
      id: "aportePatronal",
      tipo: "porcentaje",
      etiqueta: "Aporte del patrono pactado",
      ayuda: "Lo acuerdan la empresa y la asociación. Revise su reglamento.",
      min: 0,
      max: 100,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses de aportes", min: 1, max: 600, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = enMapa(valores["cr.solidarista-ahorro"], "minimo");
    const maximo = enMapa(valores["cr.solidarista-ahorro"], "maximo");
    if (entrada.ahorro < minimo || entrada.ahorro > maximo) {
      throw new ErrorEntrada(`El ahorro obligatorio tiene que estar entre ${minimo} % y ${maximo} % del salario.`, "ahorro");
    }
    const ahorro = redondear(porcentaje(entrada.salario, entrada.ahorro));
    const patrono = redondear(porcentaje(entrada.salario, entrada.aportePatronal));
    return {
      ahorro,
      patrono,
      mensual: redondear(ahorro + patrono),
      acumuladoAhorro: redondear(ahorro * entrada.meses),
      acumuladoPatrono: redondear(patrono * entrada.meses),
      observaciones: [
        "El aporte patronal es parte de su cesantía: si lo despiden, el patrono paga la diferencia hasta completar la cesantía de ley.",
        "No incluye los excedentes que reparte la asociación.",
      ],
    };
  },
  resultado: [
    { clave: "ahorro", etiqueta: "Ahorro que se le rebaja por mes", formato: "moneda" },
    { clave: "patrono", etiqueta: "Aporte del patrono por mes", formato: "moneda" },
    { clave: "mensual", etiqueta: "Total que entra por mes", formato: "moneda", destacada: true },
    { clave: "acumuladoAhorro", etiqueta: "Su ahorro acumulado", formato: "moneda" },
    { clave: "acumuladoPatrono", etiqueta: "Aporte patronal acumulado", formato: "moneda" },
  ],
});
