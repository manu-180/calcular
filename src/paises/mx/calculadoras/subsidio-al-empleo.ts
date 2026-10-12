import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIAS_PERIODO, OPCIONES_PERIODO_NOMINA } from "../nomina";

export default definirCalculadora({
  id: "mx.subsidio-al-empleo",
  mercado: "mx",
  concepto: "propio",
  slug: "subsidio-al-empleo",
  estado: "publicado",
  requiere: {
    "mx.uma-mensual": "numero",
    "mx.subsidio-empleo": "numero",
    "mx.subsidio-empleo-limite": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto del periodo", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Cada cuánto te pagan", opciones: OPCIONES_PERIODO_NOMINA, porDefecto: "quincenal" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!(entrada.periodo in DIAS_PERIODO)) throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const dias = DIAS_PERIODO[entrada.periodo];
    const mensualMaximo = (valores["mx.uma-mensual"] * valores["mx.subsidio-empleo"]) / 100;
    const ingresoMensual = entrada.periodo === "mensual" ? entrada.sueldo : (entrada.sueldo / dias) * DIAS_PERIODO.mensual;
    const limite = valores["mx.subsidio-empleo-limite"];
    const aplica = ingresoMensual <= limite;
    const delPeriodo = entrada.periodo === "mensual" ? mensualMaximo : (mensualMaximo / DIAS_PERIODO.mensual) * dias;
    return {
      ingresoMensual: redondear(ingresoMensual),
      mensual: redondear(mensualMaximo),
      subsidio: aplica ? redondear(delPeriodo) : 0,
      observaciones: [
        aplica
          ? "El subsidio se resta del ISR de tu recibo. Si tu ISR es menor, solo baja hasta cero: no te lo pagan en efectivo."
          : "Tu ingreso pasa el límite del subsidio, así que no te toca.",
      ],
    };
  },
  resultado: [
    { clave: "ingresoMensual", etiqueta: "Tu ingreso llevado a un mes", formato: "moneda" },
    { clave: "mensual", etiqueta: "Subsidio mensual de este año", formato: "moneda" },
    { clave: "subsidio", etiqueta: "Subsidio que te toca en el periodo", formato: "moneda", destacada: true },
  ],
});
