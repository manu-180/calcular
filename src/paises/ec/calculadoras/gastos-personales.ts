import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.gastos-personales",
  mercado: "ec",
  concepto: "propio",
  slug: "gastos-personales",
  estado: "publicado",
  requiere: {
    "ec.canasta-basica-enero": "numero",
    "ec.canastas-por-cargas": "mapa",
    "ec.canastas-catastroficas": "numero",
    "ec.rebaja-gastos-personales": "numero",
  },
  campos: [
    { id: "vivienda", tipo: "moneda", etiqueta: "Vivienda (arriendo, intereses de crédito hipotecario, servicios básicos)", min: 0, porDefecto: 0 },
    { id: "alimentacion", tipo: "moneda", etiqueta: "Alimentación", min: 0, porDefecto: 0 },
    { id: "educacion", tipo: "moneda", etiqueta: "Educación, arte y cultura", min: 0, porDefecto: 0 },
    { id: "salud", tipo: "moneda", etiqueta: "Salud", min: 0, porDefecto: 0 },
    { id: "vestimenta", tipo: "moneda", etiqueta: "Vestimenta", min: 0, porDefecto: 0 },
    { id: "turismo", tipo: "moneda", etiqueta: "Turismo nacional", min: 0, porDefecto: 0 },
    { id: "cargas", tipo: "opcion-dato", etiqueta: "Cargas familiares", dato: "ec.canastas-por-cargas", porDefecto: "0" },
    {
      id: "catastrofica",
      tipo: "si-no",
      etiqueta: "Tú o una carga tienen discapacidad o una enfermedad catastrófica, rara o huérfana",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const gastos = redondear(entrada.vivienda + entrada.alimentacion + entrada.educacion + entrada.salud + entrada.vestimenta + entrada.turismo);
    const canastas = entrada.catastrofica ? valores["ec.canastas-catastroficas"] : enMapa(valores["ec.canastas-por-cargas"], entrada.cargas);
    const tope = redondear(valores["ec.canasta-basica-enero"] * canastas);
    const deducibles = Math.min(gastos, tope);
    const rebaja = redondear(porcentaje(deducibles, valores["ec.rebaja-gastos-personales"]));
    const observaciones: string[] = [];
    if (gastos > tope) observaciones.push("Tus gastos pasan el tope: la rebaja se calcula solo hasta el tope.");
    observaciones.push("La rebaja se resta de tu impuesto a la renta y no puede ser mayor que ese impuesto. Lo que sobra no se devuelve.");
    observaciones.push("Los gastos van sin IVA y tienen que estar en comprobantes a tu nombre o de tus cargas.");
    return {
      gastos,
      canastas,
      tope,
      deducibles: redondear(deducibles),
      rebaja,
      rebajaMaxima: redondear(porcentaje(tope, valores["ec.rebaja-gastos-personales"])),
      observaciones,
    };
  },
  resultado: [
    { clave: "gastos", etiqueta: "Total de gastos personales", formato: "moneda" },
    { clave: "canastas", etiqueta: "Canastas básicas de tope", formato: "numero" },
    { clave: "tope", etiqueta: "Tope de gastos personales", formato: "moneda" },
    { clave: "deducibles", etiqueta: "Gastos que cuentan para la rebaja", formato: "moneda" },
    { clave: "rebajaMaxima", etiqueta: "Rebaja máxima posible", formato: "moneda" },
    { clave: "rebaja", etiqueta: "Rebaja de tu impuesto a la renta", formato: "moneda", destacada: true },
  ],
});
