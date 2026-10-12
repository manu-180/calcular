import { definirCalculadora, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;

// Art. 192: el asueto trabajado se paga con salario ordinario más 100 % de recargo, y las horas extra de
// ese día se calculan sobre ese salario extraordinario, no sobre el ordinario.
export default definirCalculadora({
  id: "sv.dia-de-asueto",
  mercado: "sv",
  concepto: "propio",
  slug: "dia-de-asueto",
  estado: "publicado",
  requiere: {
    "sv.recargo-asueto": "numero",
    "sv.recargo-hora-extra": "numero",
    "sv.jornada-diurna": "numero",
    "sv.jornada-nocturna": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Su jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
      ],
      porDefecto: "diurna",
    },
    { id: "diasAsueto", tipo: "entero", etiqueta: "Días de asueto que trabajó", min: 1, max: 15, porDefecto: 1 },
    { id: "horasExtra", tipo: "numero", etiqueta: "Horas extra en esos días", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = entrada.jornada === "diurna" ? valores["sv.jornada-diurna"] : valores["sv.jornada-nocturna"];
    const diario = entrada.salario / DIAS_DEL_MES;
    const extraordinario = diario + porcentaje(diario, valores["sv.recargo-asueto"]);
    const horaExtraordinaria = extraordinario / horas;
    const horaExtra = horaExtraordinaria + porcentaje(horaExtraordinaria, valores["sv.recargo-hora-extra"]);
    const pagoDias = redondear(extraordinario * entrada.diasAsueto);
    const pagoExtra = redondear(horaExtra * entrada.horasExtra);
    return {
      diario: redondear(diario),
      extraordinario: redondear(extraordinario),
      horaExtra: redondear(horaExtra),
      pagoExtra,
      total: redondear(pagoDias + pagoExtra),
      observaciones: ["Este pago va aparte de su salario mensual, que ya incluye el asueto como día de descanso pagado."],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario ordinario de un día", formato: "moneda" },
    { clave: "extraordinario", etiqueta: "Pago por cada día de asueto trabajado", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Hora extra en día de asueto", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "Pago por las horas extra", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por trabajar el asueto", formato: "moneda", destacada: true },
  ],
});
