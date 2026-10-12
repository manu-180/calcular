import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_MONEDA, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.dia-feriado-trabajado",
  mercado: "ve",
  concepto: "propio",
  slug: "dia-feriado-trabajado",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.jornada-diurna-horas": "numero",
    "ve.recargo-feriado": "numero",
    "ve.descanso-compensatorio-umbral-horas": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    { id: "salario", tipo: "numero", etiqueta: "Salario normal mensual", min: 0 },
    {
      id: "dia",
      tipo: "opcion",
      etiqueta: "Qué día trabajaste",
      opciones: [
        { valor: "descanso", etiqueta: "Domingo o mi día de descanso semanal" },
        { valor: "feriado", etiqueta: "Feriado nacional (1 de enero, Carnaval, Semana Santa, 1 de mayo, fiestas nacionales, 24, 25 o 31 de diciembre)" },
      ],
      porDefecto: "descanso",
    },
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajaste ese día", min: 0, max: 24, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horas > 24) throw new ErrorEntrada("Un día tiene 24 horas como máximo.", "horas");
    const diario = entrada.salario / valores["ve.dias-mes-salario"];
    const hora = diario / valores["ve.jornada-diurna-horas"];
    // Art. 120: el día ya está pago dentro del salario mensual (art. 119); lo trabajado se paga aparte con 50 % de recargo.
    const conRecargo = hora + porcentaje(hora, valores["ve.recargo-feriado"]);
    const pago = conRecargo * entrada.horas;
    // Art. 188: el descanso compensatorio corre solo para domingo o día de descanso, no para los feriados de fecha fija.
    const umbral = valores["ve.descanso-compensatorio-umbral-horas"];
    const compensatorio = entrada.dia === "descanso" && entrada.horas > 0 ? (entrada.horas >= umbral ? 1 : 0.5) : 0;
    const m = entrada.moneda;
    const [h, hr, p] = [hora, conRecargo, pago].map((x) => enMoneda(redondear(x), m));
    const observaciones: string[] = [];
    if (entrada.dia === "feriado") {
      observaciones.push("Si el feriado cae en tu domingo o en tu día de descanso, además te toca el descanso compensatorio.");
    } else if (compensatorio > 0) {
      observaciones.push("El descanso compensatorio se toma la semana siguiente y es remunerado.");
    }
    observaciones.push("Si tu salario es mensual, el salario del día feriado ya está incluido. Lo que se suma es el pago por lo que trabajaste.");
    return {
      horaBs: h.bs,
      horaUsd: h.usd,
      horaRecargoBs: hr.bs,
      horaRecargoUsd: hr.usd,
      pagoBs: p.bs,
      pagoUsd: p.usd,
      diasCompensatorio: compensatorio,
      observaciones,
    };
  },
  resultado: [
    { clave: "horaBs", etiqueta: "Valor de la hora normal", formato: "moneda", moneda: "VES" },
    { clave: "horaUsd", etiqueta: "Valor de la hora normal", formato: "moneda", moneda: "USD" },
    { clave: "horaRecargoBs", etiqueta: "Valor de la hora con recargo", formato: "moneda", moneda: "VES" },
    { clave: "horaRecargoUsd", etiqueta: "Valor de la hora con recargo", formato: "moneda", moneda: "USD" },
    { clave: "pagoBs", etiqueta: "Pago adicional por el día trabajado", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "pagoUsd", etiqueta: "Pago adicional por el día trabajado", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "diasCompensatorio", etiqueta: "Descanso compensatorio", formato: "dias", decimales: 1, ocultarSiCero: true },
  ],
});
