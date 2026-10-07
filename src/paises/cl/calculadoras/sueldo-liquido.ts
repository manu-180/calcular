import { aplicarEscala, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.sueldo-liquido",
  mercado: "cl",
  concepto: "sueldo-neto",
  slug: "sueldo-liquido",
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
    {
      id: "imponible",
      tipo: "moneda",
      etiqueta: "Sueldo bruto imponible",
      ayuda: "Sueldo base más gratificación, horas extra, bonos y comisiones del mes.",
      min: 0,
    },
    {
      id: "noImponible",
      tipo: "moneda",
      etiqueta: "Colación y movilización",
      ayuda: "Lo que no paga cotizaciones ni impuesto. Si no tienes, deja 0.",
      min: 0,
      porDefecto: 0,
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "Tu AFP", dato: "cl.comision-afp" },
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
    {
      id: "planIsapre",
      tipo: "numero",
      etiqueta: "Valor de tu plan de Isapre en UF",
      ayuda: "Solo si tu sistema de salud es Isapre. Si tu plan cuesta menos que la cotización legal, se descuenta igual la cotización legal.",
      min: 0,
      porDefecto: 0,
    },
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
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"].valor;
    const utm = valores["cl.utm"].valor;
    const tope = redondear(valores["cl.tope-imponible"] * uf);
    const topeCesantia = redondear(valores["cl.tope-imponible-cesantia"] * uf);
    const base = Math.min(entrada.imponible, tope);
    const tasaAfp = valores["cl.cotizacion-afp"] + enMapa(valores["cl.comision-afp"], entrada.afp);
    const afp = redondear(porcentaje(base, tasaAfp));
    const saludLegal = redondear(porcentaje(base, valores["cl.salud"]));
    const plan = entrada.salud === "isapre" ? redondear(entrada.planIsapre * uf) : 0;
    const salud = Math.max(saludLegal, plan);
    const cesantia = entrada.contrato === "indefinido" ? redondear(porcentaje(Math.min(entrada.imponible, topeCesantia), valores["cl.cesantia-trabajador"])) : 0;
    const tributable = Math.max(0, entrada.imponible - afp - saludLegal - cesantia);
    const impuesto = redondear(aplicarEscala(valores["cl.impuesto-unico"], tributable / utm) * utm);
    const descuentos = afp + salud + cesantia + impuesto;
    const observaciones: string[] = [];
    if (entrada.imponible > tope) observaciones.push("Tu sueldo pasa el tope imponible: AFP y salud se calculan solo hasta ese tope.");
    if (plan > saludLegal) observaciones.push("Lo que tu plan de Isapre cobra por sobre la cotización legal se descuenta del sueldo, pero no rebaja el impuesto.");
    return {
      imponible: entrada.imponible,
      afp,
      salud,
      cesantia,
      tributable,
      impuesto,
      descuentos,
      noImponible: entrada.noImponible,
      liquido: entrada.imponible - descuentos + entrada.noImponible,
      tope,
      observaciones,
    };
  },
  resultado: [
    { clave: "imponible", etiqueta: "Sueldo bruto imponible", formato: "moneda" },
    { clave: "afp", etiqueta: "AFP (cotización y comisión)", formato: "moneda" },
    { clave: "salud", etiqueta: "Salud", formato: "moneda" },
    { clave: "cesantia", etiqueta: "Seguro de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "tributable", etiqueta: "Base para el impuesto", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto único", formato: "moneda" },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "noImponible", etiqueta: "Colación y movilización", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Sueldo líquido", formato: "moneda", destacada: true },
    { clave: "tope", etiqueta: "Tope imponible del mes", formato: "moneda" },
  ],
});
