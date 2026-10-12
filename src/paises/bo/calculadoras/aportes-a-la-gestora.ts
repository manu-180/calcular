import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { aporteNacionalSolidario, aportesLaborales } from "../lib/planilla";

const CLAVES_INDEPENDIENTE = ["cotizacion", "riesgo-comun", "riesgo-laboral", "solidario", "comision"] as const;

export default definirCalculadora({
  id: "bo.aportes-a-la-gestora",
  mercado: "bo",
  concepto: "aportes-seguridad-social",
  slug: "aportes-a-la-gestora",
  estado: "publicado",
  requiere: {
    "bo.aportes-laborales": "mapa",
    "bo.aportes-patronales": "mapa",
    "bo.aportes-independiente": "mapa",
    "bo.ingreso-cotizable-independiente": "mapa",
    "bo.ans-tasas": "mapa",
    "bo.ans-umbrales": "mapa",
    "bo.salario-minimo": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Usted aporta como",
      opciones: [
        { valor: "dependiente", etiqueta: "Trabajador dependiente (con empleador)" },
        { valor: "independiente", etiqueta: "Independiente o consultor" },
      ],
      porDefecto: "dependiente",
    },
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Total ganado del mes o ingreso que declara",
      ayuda: "Dependiente: su total ganado. Independiente: el ingreso cotizable que declara a la Gestora.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const smn = valores["bo.salario-minimo"];
    const tasasAns = valores["bo.ans-tasas"];
    const umbralesAns = valores["bo.ans-umbrales"];
    const observaciones: string[] = [];
    if (entrada.tipo === "dependiente") {
      const a = aportesLaborales(entrada.monto, valores["bo.aportes-laborales"], tasasAns, umbralesAns, redondear);
      const patronales = valores["bo.aportes-patronales"];
      const patronal = redondear(
        redondear(porcentaje(entrada.monto, enMapa(patronales, "solidario"))) + redondear(porcentaje(entrada.monto, enMapa(patronales, "riesgo-profesional"))),
      );
      observaciones.push("Su empleador le descuenta su parte del sueldo y paga la suya aparte. El aporte a la caja de salud no va a la Gestora.");
      return {
        base: entrada.monto,
        asegurado: a.gestora,
        nacionalSolidario: a.nacionalSolidario,
        patronal,
        total: redondear(a.gestora + a.nacionalSolidario + patronal),
        observaciones,
      };
    }
    const limites = valores["bo.ingreso-cotizable-independiente"];
    const minimo = redondear(smn * enMapa(limites, "minimo"));
    const maximo = redondear(smn * enMapa(limites, "maximo"));
    const base = Math.min(Math.max(entrada.monto, minimo), maximo);
    if (entrada.monto < minimo) observaciones.push("El ingreso cotizable no puede ser menor a un salario mínimo: aportamos sobre ese mínimo.");
    if (entrada.monto > maximo) observaciones.push("El ingreso cotizable tiene un tope de sesenta salarios mínimos: aportamos sobre ese tope.");
    const tasas = valores["bo.aportes-independiente"];
    let asegurado = 0;
    for (const c of CLAVES_INDEPENDIENTE) asegurado += redondear(porcentaje(base, enMapa(tasas, c)));
    asegurado = redondear(asegurado);
    const nacionalSolidario = aporteNacionalSolidario(base, tasasAns, umbralesAns, redondear);
    observaciones.push("Como independiente, el aporte es voluntario y lo paga usted directo a la Gestora.");
    return { base, asegurado, nacionalSolidario, patronal: 0, total: redondear(asegurado + nacionalSolidario), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Base de cálculo", formato: "moneda" },
    { clave: "asegurado", etiqueta: "Aporte del asegurado", formato: "moneda" },
    { clave: "nacionalSolidario", etiqueta: "Aporte Nacional Solidario", formato: "moneda", ocultarSiCero: true },
    { clave: "patronal", etiqueta: "Aporte del empleador a la Gestora", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total que llega a la Gestora", formato: "moneda", destacada: true },
  ],
});
