import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.jornal-minimo",
  mercado: "py",
  concepto: "propio",
  slug: "jornal-minimo",
  estado: "publicado",
  requiere: {
    "py.minimos": "mapa",
  },
  campos: [
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
      ],
      porDefecto: "diurna",
    },
    { id: "dias", tipo: "entero", etiqueta: "Días trabajados", min: 0, max: 31, porDefecto: 26 },
  ],
  calcular(entrada, valores, { redondear }) {
    const jornal = enMapa(valores["py.minimos"], entrada.jornada === "nocturna" ? "jornal-nocturno" : "jornal");
    return {
      jornal,
      total: redondear(jornal * entrada.dias),
      observaciones: ["El jornal mínimo es el salario mínimo mensual dividido 26. Es el piso para quien cobra por día trabajado o a destajo."],
    };
  },
  resultado: [
    { clave: "jornal", etiqueta: "Jornal mínimo", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Mínimo por tus días", formato: "moneda" },
  ],
});
