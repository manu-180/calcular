import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { rentaAnual } from "../lib/renta";

// El empleador retiene de febrero a diciembre: el impuesto proyectado se divide para 11 (Reglamento
// de la LRTI, art. 104). En enero no hay retención.
const MESES_DE_RETENCION = 11;

export default definirCalculadora({
  id: "ec.impuesto-a-la-renta",
  mercado: "ec",
  concepto: "impuesto-renta",
  slug: "impuesto-a-la-renta",
  estado: "publicado",
  requiere: {
    "ec.impuesto-renta": "escala",
    "ec.aporte-personal-iess": "numero",
    "ec.canasta-basica-enero": "numero",
    "ec.canastas-por-cargas": "mapa",
    "ec.canastas-catastroficas": "numero",
    "ec.rebaja-gastos-personales": "numero",
  },
  campos: [
    {
      id: "ingresos",
      tipo: "moneda",
      etiqueta: "Ingresos gravados del año",
      ayuda: "Sueldos, horas extra, comisiones y bonos. Sin décimos, fondos de reserva ni utilidades.",
      min: 0,
    },
    {
      id: "dependencia",
      tipo: "si-no",
      etiqueta: "Son ingresos de un trabajo en relación de dependencia",
      ayuda: "Si es así, se resta tu aporte personal al IESS antes de calcular el impuesto.",
      porDefecto: true,
    },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos personales del año",
      ayuda: "Vivienda, alimentación, educación, salud, vestimenta, turismo nacional, arte y cultura. Sin IVA.",
      min: 0,
      porDefecto: 0,
    },
    { id: "cargas", tipo: "opcion-dato", etiqueta: "Cargas familiares", dato: "ec.canastas-por-cargas", porDefecto: "0" },
    {
      id: "catastrofica",
      tipo: "si-no",
      etiqueta: "Tú o una carga tienen discapacidad o una enfermedad catastrófica, rara o huérfana",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const aporte = entrada.dependencia ? redondear(porcentaje(entrada.ingresos, valores["ec.aporte-personal-iess"])) : 0;
    const base = redondear(entrada.ingresos - aporte);
    const r = rentaAnual(
      base,
      entrada.gastos,
      entrada.cargas,
      entrada.catastrofica,
      {
        escala: valores["ec.impuesto-renta"],
        canasta: valores["ec.canasta-basica-enero"],
        canastasPorCargas: valores["ec.canastas-por-cargas"],
        canastasCatastroficas: valores["ec.canastas-catastroficas"],
        rebaja: valores["ec.rebaja-gastos-personales"],
      },
      redondear,
    );
    const observaciones: string[] = [];
    if (entrada.gastos > r.tope) observaciones.push("Tus gastos pasan el tope: la rebaja se calcula solo hasta el tope.");
    if (r.rebaja > 0 && r.rebaja === r.causado) observaciones.push("La rebaja por gastos personales cubre todo tu impuesto. Lo que sobra no se devuelve.");
    return {
      aporte,
      base,
      causado: r.causado,
      tope: r.tope,
      rebaja: r.rebaja,
      impuesto: r.impuesto,
      mensual: entrada.dependencia ? redondear(r.impuesto / MESES_DE_RETENCION) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "aporte", etiqueta: "Aporte personal al IESS", formato: "moneda", ocultarSiCero: true },
    { clave: "base", etiqueta: "Base imponible", formato: "moneda" },
    { clave: "causado", etiqueta: "Impuesto causado según la tabla", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope de gastos personales", formato: "moneda" },
    { clave: "rebaja", etiqueta: "Rebaja por gastos personales", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto a la renta del año", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Retención mensual (de febrero a diciembre)", formato: "moneda" },
  ],
});
