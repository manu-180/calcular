import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { rentaAnual } from "../lib/renta";

// Reglamento de la LRTI, art. 104: se proyecta el año (sin décimos), se resta el aporte personal, se
// aplica la tabla menos la rebaja por gastos personales y se divide para 11 (de febrero a diciembre).
const MESES_DE_RETENCION = 11;

export default definirCalculadora({
  id: "ec.sueldo-neto",
  mercado: "ec",
  concepto: "sueldo-neto",
  slug: "sueldo-neto",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.aporte-personal-iess": "numero",
    "ec.impuesto-renta": "escala",
    "ec.canasta-basica-enero": "numero",
    "ec.canastas-por-cargas": "mapa",
    "ec.canastas-catastroficas": "numero",
    "ec.rebaja-gastos-personales": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo mensual",
      ayuda: "Tu remuneración del mes: sueldo, horas extra y comisiones.",
      min: 0,
    },
    { id: "decimos", tipo: "si-no", etiqueta: "Cobras los décimos cada mes", porDefecto: true },
    {
      id: "gastos",
      tipo: "moneda",
      etiqueta: "Gastos personales proyectados para el año",
      ayuda: "Los que pusiste en tu proyección de gastos personales. Si no la presentaste, deja 0.",
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
    if (entrada.sueldo <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "sueldo");
    const aporte = redondear(porcentaje(entrada.sueldo, valores["ec.aporte-personal-iess"]));
    const base = redondear((entrada.sueldo - aporte) * 12);
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
    const retencion = redondear(r.impuesto / MESES_DE_RETENCION);
    const decimoTercero = entrada.decimos ? redondear(entrada.sueldo / 12) : 0;
    const decimoCuarto = entrada.decimos ? redondear(valores["ec.sbu"] / 12) : 0;
    const observaciones: string[] = [];
    if (retencion > 0) observaciones.push("En enero no te retienen impuesto a la renta, así que ese mes recibes un poco más.");
    observaciones.push("Si llevas más de un año con tu empleador, también recibes el fondo de reserva: calcúlalo en la calculadora de fondos de reserva.");
    return {
      sueldo: entrada.sueldo,
      aporte,
      retencion,
      impuestoAnual: r.impuesto,
      decimoTercero,
      decimoCuarto,
      neto: redondear(entrada.sueldo - aporte - retencion + decimoTercero + decimoCuarto),
      observaciones,
    };
  },
  resultado: [
    { clave: "sueldo", etiqueta: "Sueldo mensual", formato: "moneda" },
    { clave: "aporte", etiqueta: "Aporte personal al IESS", formato: "moneda" },
    { clave: "retencion", etiqueta: "Retención de impuesto a la renta", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercero mensual", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto mensual", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Sueldo neto del mes", formato: "moneda", destacada: true },
    { clave: "impuestoAnual", etiqueta: "Impuesto a la renta proyectado del año", formato: "moneda" },
  ],
});
