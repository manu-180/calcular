import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.salario-minimo",
  mercado: "do",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "do.salario-minimo": "mapa",
    "do.salario-minimo-hogar": "numero",
    "do.divisor-salario-diario": "numero",
    "do.jornada-diaria": "numero",
  },
  campos: [
    {
      id: "sector",
      tipo: "opcion",
      etiqueta: "Dónde trabajas",
      opciones: [
        { valor: "empresa", etiqueta: "En una empresa privada" },
        { valor: "hogar", etiqueta: "En una casa (trabajo del hogar)" },
      ],
      porDefecto: "empresa",
    },
    {
      id: "tamano",
      tipo: "opcion-dato",
      etiqueta: "Tamaño de la empresa",
      ayuda: "Si no sabes el tamaño, pregunta en Recursos Humanos o mira tu contrato.",
      dato: "do.salario-minimo",
      porDefecto: "grande",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = entrada.sector === "hogar" ? valores["do.salario-minimo-hogar"] : enMapa(valores["do.salario-minimo"], entrada.tamano);
    const diario = mensual / valores["do.divisor-salario-diario"];
    const observaciones: string[] = [];
    if (entrada.sector === "hogar") observaciones.push("Para el trabajo del hogar hay un solo mínimo, sin importar el tamaño. El tamaño de empresa no cuenta.");
    observaciones.push("Zonas francas, hoteles, restaurantes, construcción y trabajo agrícola tienen salarios mínimos propios. Este cálculo es para el sector privado no sectorizado.");
    return {
      mensual,
      quincenal: redondear(mensual / 2),
      diario: redondear(diario),
      hora: redondear(diario / valores["do.jornada-diaria"]),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "Por quincena", formato: "moneda" },
    { clave: "diario", etiqueta: "Por día", formato: "moneda" },
    { clave: "hora", etiqueta: "Por hora", formato: "moneda" },
  ],
});
