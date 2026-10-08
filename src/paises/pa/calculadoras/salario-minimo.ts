import { definirCalculadora, enMapa, ErrorEntrada, porRegion } from "@/motor/calculo";

const SEMANAS_POR_MES = 52 / 12;

export default definirCalculadora({
  id: "pa.salario-minimo",
  mercado: "pa",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "pa.salario-minimo-hora-region-1": "mapa",
    "pa.salario-minimo-hora-region-2": "mapa",
    "pa.salario-minimo-domestico": "numero-por-region",
    "pa.jornada-semanal": "mapa",
  },
  campos: [
    {
      id: "region",
      tipo: "region",
      etiqueta: "Región donde trabajas",
      ayuda: "La Región 1 son los distritos que nombra el decreto. Todos los demás son Región 2.",
      porDefecto: "region-1",
    },
    {
      id: "actividad",
      tipo: "opcion-dato",
      etiqueta: "Actividad de la empresa",
      dato: "pa.salario-minimo-hora-region-1",
      porDefecto: "comercio-menor-gran",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tabla = entrada.region === "region-2" ? valores["pa.salario-minimo-hora-region-2"] : valores["pa.salario-minimo-hora-region-1"];
    if (entrada.region === "region-2" && !(entrada.actividad in tabla)) {
      throw new ErrorEntrada("Esta actividad tiene salario mínimo solo en la Región 1.", "actividad");
    }
    const hora = enMapa(tabla, entrada.actividad);
    const horasSemana = enMapa(valores["pa.jornada-semanal"], "diurna");
    const semanal = hora * horasSemana;
    const mensual = semanal * SEMANAS_POR_MES;
    return {
      hora,
      semanal: redondear(semanal),
      quincenal: redondear(mensual / 2),
      mensual: redondear(mensual),
      domestico: porRegion(valores["pa.salario-minimo-domestico"], entrada.region),
      observaciones: [
        "El mínimo legal es por hora. El semanal y el mensual suponen una jornada diurna completa.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Salario mínimo por hora", formato: "moneda", destacada: true },
    { clave: "semanal", etiqueta: "Por semana de jornada completa", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Por quincena", formato: "moneda" },
    { clave: "mensual", etiqueta: "Por mes", formato: "moneda" },
    { clave: "domestico", etiqueta: "Mínimo mensual del trabajo doméstico en tu región", formato: "moneda" },
  ],
});
