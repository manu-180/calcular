import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { costoEmpleador } from "../lib/costo-empleador";
import { aportesTrabajador } from "../reglas";

export default definirCalculadora({
  id: "co.aportes-seguridad-social",
  mercado: "co",
  concepto: "aportes-seguridad-social",
  slug: "aportes-seguridad-social",
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
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin auxilio de transporte.", min: 0 },
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
    if (entrada.salario <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "salario");
    const smmlv = valores["co.smmlv"];
    const trab = aportesTrabajador(
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
    const emp = costoEmpleador(
      { salario: entrada.salario, auxilio: false, claseRiesgo: entrada.riesgo, puedeExonerarse: entrada.empleador !== "otro", pagaSenaIcbf: true },
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
    const totalTrabajador = trab.salud + trab.pension + trab.fsp;
    const totalEmpleador = emp.aportes;
    const observaciones: string[] = [];
    if (emp.exonerado) observaciones.push("Por ganar menos de 10 salarios mínimos, la empresa no paga su parte de salud ni el SENA y el ICBF por este trabajador.");
    if (entrada.salario < smmlv) observaciones.push("Los aportes nunca se calculan sobre menos de un salario mínimo.");
    return {
      ibc: trab.ibc,
      saludTrabajador: trab.salud,
      pensionTrabajador: trab.pension,
      fsp: trab.fsp,
      totalTrabajador,
      saludEmpleador: emp.salud,
      pensionEmpleador: emp.pension,
      arl: emp.arl,
      caja: emp.caja,
      sena: emp.sena,
      icbf: emp.icbf,
      totalEmpleador,
      total: totalTrabajador + totalEmpleador,
      observaciones,
    };
  },
  resultado: [
    { clave: "ibc", etiqueta: "Base de cotización (IBC)", formato: "moneda", decimales: 0 },
    { clave: "saludTrabajador", etiqueta: "Salud que te descuentan", formato: "moneda", decimales: 0 },
    { clave: "pensionTrabajador", etiqueta: "Pensión que te descuentan", formato: "moneda", decimales: 0 },
    { clave: "fsp", etiqueta: "Fondo de Solidaridad Pensional", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "totalTrabajador", etiqueta: "Total a cargo del trabajador", formato: "moneda", decimales: 0 },
    { clave: "saludEmpleador", etiqueta: "Salud a cargo de la empresa", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "pensionEmpleador", etiqueta: "Pensión a cargo de la empresa", formato: "moneda", decimales: 0 },
    { clave: "arl", etiqueta: "ARL", formato: "moneda", decimales: 0 },
    { clave: "caja", etiqueta: "Caja de compensación", formato: "moneda", decimales: 0 },
    { clave: "sena", etiqueta: "SENA", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "icbf", etiqueta: "ICBF", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "totalEmpleador", etiqueta: "Total a cargo de la empresa", formato: "moneda", decimales: 0 },
    { clave: "total", etiqueta: "Total de aportes del mes", formato: "moneda", decimales: 0, destacada: true },
  ],
});
