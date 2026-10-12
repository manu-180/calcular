import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.feriado-trabajado",
  mercado: "pe",
  concepto: "propio",
  slug: "feriado-trabajado",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.sobretasa-descanso-trabajado": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Feriados o días de descanso que trabajaste",
      ayuda: "Solo los que no te compensaron con otro día libre.",
      min: 0,
      max: 31,
      porDefecto: 1,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 0) throw new ErrorEntrada("Los días no pueden ser negativos.", "dias");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const valorDia = redondear((entrada.sueldo + asignacion) / 30);
    const sobretasa = redondear(porcentaje(valorDia, valores["pe.sobretasa-descanso-trabajado"]));
    // DL 713: el feriado ya está pagado dentro del sueldo mensual; si se trabaja, se suma la jornada
    // trabajada más la sobretasa. Por eso en la práctica se habla de "pago triple".
    const pagoPorDia = redondear(valorDia + sobretasa);
    return {
      valorDia,
      sobretasa,
      pagoPorDia,
      total: redondear(pagoPorDia * entrada.dias),
      observaciones: [
        "Este monto se suma a tu sueldo del mes, que ya incluye el pago del feriado como día de descanso.",
        "Si tu empleador te da otro día libre a cambio, no corresponde este pago adicional.",
      ],
    };
  },
  resultado: [
    { clave: "valorDia", etiqueta: "Valor de tu día de trabajo", formato: "moneda" },
    { clave: "sobretasa", etiqueta: "Sobretasa por cada día", formato: "moneda" },
    { clave: "pagoPorDia", etiqueta: "Pago adicional por cada día trabajado", formato: "moneda" },
    { clave: "total", etiqueta: "Total adicional a cobrar", formato: "moneda", destacada: true },
  ],
});
