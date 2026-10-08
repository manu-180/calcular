import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const DIAS_POR_SEMANA = 5;

export default definirCalculadora({
  id: "ec.trabajo-domestico",
  mercado: "ec",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.jornada-diaria": "numero",
    "ec.aporte-personal-iess": "numero",
    "ec.aporte-patronal-iess": "numero",
    "ec.fondo-reserva": "numero",
  },
  campos: [
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas de trabajo por semana",
      ayuda: "40 es jornada completa. Si trabaja menos, el mínimo y el décimo cuarto se calculan en proporción.",
      min: 1,
      max: 40,
      porDefecto: 40,
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo mensual",
      ayuda: "Si lo dejas vacío, calculamos con el mínimo para esas horas.",
      min: 0,
      requerido: false,
    },
    { id: "masDeUnAnio", tipo: "si-no", etiqueta: "Trabaja contigo hace más de un año", porDefecto: false },
    { id: "decimosMensuales", tipo: "si-no", etiqueta: "Le pagas los décimos cada mes", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const jornadaSemanal = valores["ec.jornada-diaria"] * DIAS_POR_SEMANA;
    if (entrada.horas > jornadaSemanal) throw new ErrorEntrada("La jornada máxima es de 40 horas por semana.", "horas");
    const proporcion = entrada.horas / jornadaSemanal;
    const minimo = redondear(valores["ec.sbu"] * proporcion);
    const sueldo = entrada.sueldo ?? minimo;
    const aportePersonal = redondear(porcentaje(sueldo, valores["ec.aporte-personal-iess"]));
    const aportePatronal = redondear(porcentaje(sueldo, valores["ec.aporte-patronal-iess"]));
    const decimoTercero = redondear(sueldo / 12);
    const decimoCuarto = redondear((valores["ec.sbu"] * proporcion) / 12);
    const fondoReserva = entrada.masDeUnAnio ? redondear(porcentaje(sueldo, valores["ec.fondo-reserva"])) : 0;
    const decimosEnRol = entrada.decimosMensuales ? redondear(decimoTercero + decimoCuarto) : 0;
    const observaciones: string[] = [];
    if (sueldo < minimo) observaciones.push("El sueldo que pusiste está por debajo del salario básico para esas horas.");
    if (!entrada.decimosMensuales) observaciones.push("Los décimos no se pagan cada mes: el décimo tercero se paga hasta el 24 de diciembre y el décimo cuarto en marzo (Costa y Galápagos) o en agosto (Sierra y Amazonía). Igual conviene apartarlos cada mes.");
    return {
      minimo,
      sueldo,
      aportePersonal,
      decimosEnRol,
      fondoReserva,
      aRecibir: redondear(sueldo - aportePersonal + decimosEnRol + fondoReserva),
      aportePatronal,
      pagoIess: redondear(aportePersonal + aportePatronal),
      decimoTercero,
      decimoCuarto,
      costoMensual: redondear(sueldo + aportePatronal + decimoTercero + decimoCuarto + fondoReserva),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario básico para esas horas", formato: "moneda" },
    { clave: "sueldo", etiqueta: "Sueldo", formato: "moneda" },
    { clave: "aportePersonal", etiqueta: "Aporte personal al IESS (se descuenta)", formato: "moneda" },
    { clave: "decimosEnRol", etiqueta: "Décimos pagados en el mes", formato: "moneda", ocultarSiCero: true },
    { clave: "fondoReserva", etiqueta: "Fondos de reserva", formato: "moneda", ocultarSiCero: true },
    { clave: "aRecibir", etiqueta: "Lo que recibe la trabajadora en el mes", formato: "moneda", destacada: true },
    { clave: "aportePatronal", etiqueta: "Aporte patronal al IESS", formato: "moneda" },
    { clave: "pagoIess", etiqueta: "Planilla del IESS (aportes de los dos)", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercero (parte de un mes)", formato: "moneda" },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto (parte de un mes)", formato: "moneda" },
    { clave: "costoMensual", etiqueta: "Costo mensual para el empleador", formato: "moneda", destacada: true },
  ],
});
