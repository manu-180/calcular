import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

export default definirCalculadora({
  id: "cl.sueldo-bruto",
  mercado: "cl",
  concepto: "propio",
  slug: "sueldo-bruto",
  estado: "publicado",
  requiere: {
    "cl.cotizacion-afp": "numero",
    "cl.comision-afp": "mapa",
    "cl.salud": "numero",
    "cl.cesantia-trabajador": "numero",
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.impuesto-unico": "escala",
    "cl.uf": "serie",
    "cl.utm": "serie",
  },
  campos: [
    { id: "liquido", tipo: "moneda", etiqueta: "Sueldo líquido que quieres recibir", min: 0 },
    {
      id: "noImponible",
      tipo: "moneda",
      etiqueta: "Colación y movilización",
      ayuda: "La parte del líquido que no paga cotizaciones ni impuesto. Si no hay, deja 0.",
      min: 0,
      porDefecto: 0,
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "AFP", dato: "cl.comision-afp" },
    {
      id: "salud",
      tipo: "opcion",
      etiqueta: "Sistema de salud",
      opciones: [
        { valor: "fonasa", etiqueta: "Fonasa" },
        { valor: "isapre", etiqueta: "Isapre" },
      ],
      porDefecto: "fonasa",
    },
    { id: "planIsapre", tipo: "numero", etiqueta: "Valor del plan de Isapre en UF", ayuda: "Solo si el sistema de salud es Isapre.", min: 0, porDefecto: 0 },
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indefinido", etiqueta: "Indefinido" },
        { valor: "plazo-fijo", etiqueta: "A plazo fijo, por obra o faena" },
      ],
      porDefecto: "indefinido",
    },
  ],
  calcular(entrada, valores, contexto) {
    if (entrada.noImponible > entrada.liquido) throw new ErrorEntrada("La colación y movilización no pueden ser más que el líquido.", "noImponible");
    const liquidoDe = (imponible: number) =>
      sueldoLiquido.calcular(
        { imponible, noImponible: entrada.noImponible, afp: entrada.afp, salud: entrada.salud, planIsapre: entrada.planIsapre, contrato: entrada.contrato },
        valores,
        contexto,
      );
    // El líquido sube con el bruto, así que se busca el menor bruto en pesos enteros que llega al
    // líquido pedido. Con impuesto marginal de 40 % y cotizaciones, el líquido nunca crece menos
    // de un tercio por peso: el techo alcanza.
    let bajo = 0;
    let alto = Math.ceil(entrada.liquido * 3) + 1;
    while (bajo < alto) {
      const medio = Math.floor((bajo + alto) / 2);
      if (liquidoDe(medio).liquido >= entrada.liquido) alto = medio;
      else bajo = medio + 1;
    }
    const r = liquidoDe(bajo);
    return {
      imponible: bajo,
      afp: r.afp,
      salud: r.salud,
      cesantia: r.cesantia,
      impuesto: r.impuesto,
      descuentos: r.descuentos,
      liquido: r.liquido,
      observaciones: r.observaciones,
    };
  },
  resultado: [
    { clave: "imponible", etiqueta: "Sueldo bruto imponible", formato: "moneda", destacada: true },
    { clave: "afp", etiqueta: "AFP (cotización y comisión)", formato: "moneda" },
    { clave: "salud", etiqueta: "Salud", formato: "moneda" },
    { clave: "cesantia", etiqueta: "Seguro de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Impuesto único", formato: "moneda" },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "liquido", etiqueta: "Sueldo líquido con ese bruto", formato: "moneda" },
  ],
});
