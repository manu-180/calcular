import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.monotributo-social",
  mercado: "uy",
  concepto: "propio",
  slug: "monotributo-social",
  estado: "publicado",
  requiere: {
    "uy.monotributo-social-jubilatorio": "mapa",
    "uy.monotributo-social-sin-snis": "mapa",
    "uy.monotributo-salud": "mapa",
    "uy.monotributo-social-gradualidad": "mapa",
  },
  campos: [
    {
      id: "etapa",
      tipo: "opcion",
      etiqueta: "Meses que llevás con el monotributo social",
      opciones: [
        { valor: "1", etiqueta: "Del mes 1 al 12" },
        { valor: "2", etiqueta: "Del mes 13 al 24" },
        { valor: "3", etiqueta: "Del mes 25 al 36" },
        { valor: "4", etiqueta: "Desde el mes 37" },
      ],
      porDefecto: "1",
    },
    {
      id: "salud",
      tipo: "opcion",
      etiqueta: "Cobertura de salud",
      opciones: [
        { valor: "sin-snis", etiqueta: "Sin Fonasa (solo seguro de enfermedad)" },
        { valor: "snis", etiqueta: "Con Fonasa, sin cónyuge ni hijos a cargo" },
        { valor: "snis-hijos", etiqueta: "Con Fonasa, con hijos a cargo" },
        { valor: "snis-conyuge", etiqueta: "Con Fonasa, con cónyuge a cargo" },
        { valor: "snis-conyuge-hijos", etiqueta: "Con Fonasa, con cónyuge e hijos a cargo" },
      ],
      porDefecto: "sin-snis",
    },
  ],
  calcular(entrada, valores) {
    const jubilatorio = enMapa(valores["uy.monotributo-social-jubilatorio"], entrada.etapa);
    // Sin Fonasa, el 8 % de una BPC también es gradual (tabla del BPS). Con Fonasa, la salud se paga entera.
    const total = entrada.salud === "sin-snis" ? enMapa(valores["uy.monotributo-social-sin-snis"], entrada.etapa) : jubilatorio + enMapa(valores["uy.monotributo-salud"], entrada.salud);
    return {
      porcentaje: enMapa(valores["uy.monotributo-social-gradualidad"], entrada.etapa),
      jubilatorio,
      salud: total - jubilatorio,
      total,
      observaciones: ["Es el aporte de cada integrante del emprendimiento. Reemplaza los aportes al BPS y los impuestos nacionales, salvo los de importación."],
    };
  },
  resultado: [
    { clave: "porcentaje", etiqueta: "Parte del aporte que pagás en esta etapa", formato: "porcentaje" },
    { clave: "jubilatorio", etiqueta: "Aportes jubilatorios y FRL", formato: "moneda" },
    { clave: "salud", etiqueta: "Salud (Fonasa o seguro de enfermedad)", formato: "moneda" },
    { clave: "total", etiqueta: "Total a pagar por mes", formato: "moneda", destacada: true },
  ],
});
