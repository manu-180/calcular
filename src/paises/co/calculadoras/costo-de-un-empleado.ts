import { definirCalculadora } from "@/motor/calculo";
import { costoEmpleador } from "../lib/costo-empleador";

export default definirCalculadora({
  id: "co.costo-de-un-empleado",
  mercado: "co",
  concepto: "costo-empleador",
  slug: "costo-de-un-empleado",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
    "co.salud-empleador": "numero",
    "co.pension-cotizacion": "numero",
    "co.pension-parte-trabajador": "numero",
    "co.tope-ibc": "numero",
    "co.arl": "mapa",
    "co.parafiscales": "mapa",
    "co.exoneracion-tope": "numero",
    "co.prima-dias": "numero",
    "co.vacaciones-dias": "numero",
    "co.intereses-cesantias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Salario ordinario, sin auxilio de transporte.", min: 0 },
    { id: "auxilio", tipo: "si-no", etiqueta: "Recibe auxilio de transporte", ayuda: "Corresponde si gana hasta dos salarios mínimos.", porDefecto: true },
    {
      id: "empleador",
      tipo: "opcion",
      etiqueta: "Quién contrata",
      opciones: [
        { valor: "sociedad", etiqueta: "Una sociedad declarante de renta" },
        { valor: "persona-natural-varios", etiqueta: "Una persona natural con dos o más trabajadores" },
        { valor: "otro", etiqueta: "Otro empleador (sin exoneración)" },
      ],
      porDefecto: "sociedad",
    },
    { id: "riesgo", tipo: "opcion-dato", etiqueta: "Clase de riesgo de la ARL", dato: "co.arl", porDefecto: "i" },
  ],
  calcular(entrada, valores, { redondear }) {
    const costo = costoEmpleador(
      {
        salario: entrada.salario,
        auxilio: entrada.auxilio,
        claseRiesgo: entrada.riesgo,
        puedeExonerarse: entrada.empleador !== "otro",
        pagaSenaIcbf: true,
      },
      {
        smmlv: valores["co.smmlv"],
        auxilioTransporte: valores["co.auxilio-transporte"],
        auxilioTope: valores["co.auxilio-tope"],
        topeIbc: valores["co.tope-ibc"],
        saludEmpleador: valores["co.salud-empleador"],
        pensionCotizacion: valores["co.pension-cotizacion"],
        pensionParteTrabajador: valores["co.pension-parte-trabajador"],
        arl: valores["co.arl"],
        parafiscales: valores["co.parafiscales"],
        exoneracionTope: valores["co.exoneracion-tope"],
        primaDias: valores["co.prima-dias"],
        vacacionesDias: valores["co.vacaciones-dias"],
        interesesCesantias: valores["co.intereses-cesantias"],
      },
      redondear,
    );
    const observaciones: string[] = [];
    if (entrada.salario < valores["co.smmlv"]) observaciones.push("Con jornada completa el salario no puede ser menor que el mínimo. Los aportes se calculan igual sobre un salario mínimo.");
    if (costo.exonerado) observaciones.push("Por ganar menos de 10 salarios mínimos, el empleador no paga salud, SENA ni ICBF por este trabajador (Estatuto Tributario, art. 114-1).");
    if (entrada.auxilio && costo.auxilio === 0) observaciones.push("Gana más de dos salarios mínimos, así que no corresponde auxilio de transporte.");
    // Umbral del salario integral: 10 SMMLV más el 30 % de factor prestacional (CST art. 132).
    if (entrada.salario >= 13 * valores["co.smmlv"]) {
      observaciones.push(
        "Con este salario se puede pactar salario integral (Código Sustantivo del Trabajo, art. 132). Si tu contrato es integral, los aportes se calculan sobre el 70 % del salario y no hay prima, cesantías ni intereses. El cálculo que ves aquí es el de salario ordinario.",
      );
    }
    return {
      ...costo,
      salario: entrada.salario,
      costoAnual: costo.costoMensual * 12,
      recargo: entrada.salario > 0 ? ((costo.costoMensual - entrada.salario) / entrada.salario) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Costo mensual total", formato: "moneda", destacada: true },
    { clave: "costoAnual", etiqueta: "Costo total al año", formato: "moneda" },
    { clave: "salario", etiqueta: "Salario", formato: "moneda" },
    { clave: "auxilio", etiqueta: "Auxilio de transporte", formato: "moneda", ocultarSiCero: true },
    { clave: "salud", etiqueta: "Salud", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Pensión", formato: "moneda" },
    { clave: "arl", etiqueta: "Riesgos laborales (ARL)", formato: "moneda" },
    { clave: "caja", etiqueta: "Caja de compensación", formato: "moneda" },
    { clave: "sena", etiqueta: "SENA", formato: "moneda", ocultarSiCero: true },
    { clave: "icbf", etiqueta: "ICBF", formato: "moneda", ocultarSiCero: true },
    { clave: "aportes", etiqueta: "Total de aportes", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima de servicios (provisión del mes)", formato: "moneda" },
    { clave: "cesantias", etiqueta: "Cesantías (provisión del mes)", formato: "moneda" },
    { clave: "intereses", etiqueta: "Intereses a las cesantías (provisión del mes)", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones (provisión del mes)", formato: "moneda" },
    { clave: "prestaciones", etiqueta: "Total de prestaciones", formato: "moneda" },
    { clave: "recargo", etiqueta: "Costo extra sobre el salario", formato: "porcentaje", decimales: 2 },
  ],
});
