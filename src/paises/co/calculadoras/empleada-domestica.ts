import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { costoEmpleador } from "../lib/costo-empleador";
import { aportesTrabajador } from "../reglas";

export default definirCalculadora({
  id: "co.empleada-domestica",
  mercado: "co",
  concepto: "trabajo-domestico",
  slug: "empleada-domestica",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.auxilio-transporte": "numero",
    "co.auxilio-tope": "numero",
    "co.salud-trabajador": "numero",
    "co.salud-empleador": "numero",
    "co.pension-cotizacion": "numero",
    "co.pension-parte-trabajador": "numero",
    "co.fsp": "escala",
    "co.tope-ibc": "numero",
    "co.arl": "mapa",
    "co.parafiscales": "mapa",
    "co.exoneracion-tope": "numero",
    "co.prima-dias": "numero",
    "co.vacaciones-dias": "numero",
    "co.intereses-cesantias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Por el mes completo de trabajo, sin el auxilio de transporte.", min: 0 },
    { id: "auxilio", tipo: "si-no", etiqueta: "Le pagas auxilio de transporte", ayuda: "Corresponde si gana hasta dos salarios mínimos.", porDefecto: true },
    {
      id: "dosOMas",
      tipo: "si-no",
      etiqueta: "Tienes dos o más trabajadores a tu cargo",
      ayuda: "Si es así, como persona natural no pagas la parte de salud del empleador por quien gana menos de 10 salarios mínimos.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const smmlv = valores["co.smmlv"];
    const costo = costoEmpleador(
      { salario: entrada.salario, auxilio: entrada.auxilio, claseRiesgo: "i", puedeExonerarse: entrada.dosOMas, pagaSenaIcbf: false },
      {
        smmlv,
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
    const trabajador = aportesTrabajador(
      entrada.salario,
      {
        smmlv,
        saludTrabajador: valores["co.salud-trabajador"],
        pensionCotizacion: valores["co.pension-cotizacion"],
        pensionParteTrabajador: valores["co.pension-parte-trabajador"],
        fsp: valores["co.fsp"],
        topeIbc: valores["co.tope-ibc"],
      },
      redondear,
    );
    const descuentos = trabajador.salud + trabajador.pension + trabajador.fsp;

    const observaciones: string[] = [];
    if (entrada.salario < smmlv) {
      observaciones.push("Por un mes completo el salario no puede ser menor que el mínimo. Si trabaja por días, los aportes se liquidan por semanas cotizadas y este cálculo no aplica.");
    }
    if (entrada.auxilio && costo.auxilio === 0) observaciones.push("Gana más de dos salarios mínimos, así que no corresponde auxilio de transporte.");
    if (costo.exonerado) observaciones.push("Con dos o más trabajadores no pagas la parte de salud del empleador por quien gana menos de 10 salarios mínimos (Estatuto Tributario, art. 114-1).");

    return {
      salario: entrada.salario,
      auxilio: costo.auxilio,
      descuentos,
      neto: entrada.salario + costo.auxilio - descuentos,
      salud: costo.salud,
      pension: costo.pension,
      arl: costo.arl,
      caja: costo.caja,
      aportes: costo.aportes,
      prima: costo.prima,
      cesantias: costo.cesantias,
      intereses: costo.intereses,
      vacaciones: costo.vacaciones,
      prestaciones: costo.prestaciones,
      costoMensual: costo.costoMensual,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Lo que recibe en el mes", formato: "moneda", destacada: true },
    { clave: "costoMensual", etiqueta: "Costo mensual para ti, con prestaciones", formato: "moneda", destacada: true },
    { clave: "auxilio", etiqueta: "Auxilio de transporte", formato: "moneda", ocultarSiCero: true },
    { clave: "descuentos", etiqueta: "Descuentos de salud y pensión", formato: "moneda" },
    { clave: "salud", etiqueta: "Salud (parte del empleador)", formato: "moneda", ocultarSiCero: true },
    { clave: "pension", etiqueta: "Pensión (parte del empleador)", formato: "moneda" },
    { clave: "arl", etiqueta: "Riesgos laborales (ARL clase I)", formato: "moneda" },
    { clave: "caja", etiqueta: "Caja de compensación familiar", formato: "moneda" },
    { clave: "aportes", etiqueta: "Total de aportes del empleador", formato: "moneda" },
    { clave: "prima", etiqueta: "Prima de servicios (provisión del mes)", formato: "moneda" },
    { clave: "cesantias", etiqueta: "Cesantías (provisión del mes)", formato: "moneda" },
    { clave: "intereses", etiqueta: "Intereses a las cesantías (provisión del mes)", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones (provisión del mes)", formato: "moneda" },
  ],
});
