import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const MESES = 12;

export default definirCalculadora({
  id: "ec.costo-empleador",
  mercado: "ec",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.aporte-patronal-iess": "numero",
    "ec.fondo-reserva": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "masDeUnAnio", tipo: "si-no", etiqueta: "Lleva más de un año en la empresa", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "sueldo");
    const aportePatronal = redondear(porcentaje(entrada.sueldo, valores["ec.aporte-patronal-iess"]));
    const decimoTercero = redondear(entrada.sueldo / MESES);
    const decimoCuarto = redondear(valores["ec.sbu"] / MESES);
    const fondoReserva = entrada.masDeUnAnio ? redondear(porcentaje(entrada.sueldo, valores["ec.fondo-reserva"])) : 0;
    const mensual = redondear(entrada.sueldo + aportePatronal + decimoTercero + decimoCuarto + fondoReserva);
    const observaciones = [
      "No incluye las utilidades, que dependen de la ganancia de la empresa, ni otros aportes que la empresa pague aparte de la tabla del IESS.",
    ];
    if (entrada.sueldo < valores["ec.sbu"]) observaciones.unshift("El sueldo está debajo del salario básico unificado. Si es jornada completa, no puede ser menor.");
    return {
      sueldo: entrada.sueldo,
      aportePatronal,
      decimoTercero,
      decimoCuarto,
      fondoReserva,
      mensual,
      anual: redondear(mensual * MESES),
      observaciones,
    };
  },
  resultado: [
    { clave: "sueldo", etiqueta: "Sueldo", formato: "moneda" },
    { clave: "aportePatronal", etiqueta: "Aporte patronal al IESS", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercero (parte de un mes)", formato: "moneda" },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto (parte de un mes)", formato: "moneda" },
    { clave: "fondoReserva", etiqueta: "Fondos de reserva", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Costo mensual del trabajador", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo en el año", formato: "moneda" },
  ],
});
