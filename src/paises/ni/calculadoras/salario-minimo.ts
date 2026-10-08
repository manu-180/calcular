import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.salario-minimo",
  mercado: "ni",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "ni.salario-minimo": "mapa",
    "ni.jornada-diaria": "mapa",
  },
  campos: [{ id: "sector", tipo: "opcion-dato", dato: "ni.salario-minimo", etiqueta: "Sector donde trabajás", porDefecto: "industria-manufacturera" }],
  calcular(entrada, valores, { redondear }) {
    const mensual = enMapa(valores["ni.salario-minimo"], entrada.sector);
    const diario = redondear(mensual / DIAS_MES);
    const observaciones = [
      "El diario y la hora son de referencia: salen de dividir el mensual entre 30 días y entre las horas de la jornada diurna.",
      "Nadie puede cobrar menos que el mínimo de su sector por una jornada completa. Si ya ganás más, no te lo pueden bajar.",
    ];
    if (entrada.sector === "agropecuario") observaciones.unshift("En el sector agropecuario el mínimo incluye la alimentación.");
    return {
      mensual,
      diario,
      hora: redondear(diario / enMapa(valores["ni.jornada-diaria"], "diurna")),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Por día", formato: "moneda" },
    { clave: "hora", etiqueta: "Por hora (jornada diurna)", formato: "moneda" },
  ],
});
