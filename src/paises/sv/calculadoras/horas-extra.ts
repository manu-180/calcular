import { definirCalculadora, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;

// Art. 142 B del Código: la hora vale el salario diario dividido por las horas de la jornada
// ordinaria. Para la hora extra nocturna el MTPS suma el 25 % sobre la hora extra ya duplicada.
export default definirCalculadora({
  id: "sv.horas-extra",
  mercado: "sv",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "sv.recargo-hora-extra": "numero",
    "sv.recargo-nocturno": "numero",
    "sv.jornada-diurna": "numero",
    "sv.jornada-nocturna": "numero",
    "sv.semana-diurna": "numero",
    "sv.semana-nocturna": "numero",
    "sv.recargo-asueto": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Su jornada ordinaria",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (entre las 6:00 y las 19:00)" },
        { valor: "nocturna", etiqueta: "Nocturna (entre las 19:00 y las 6:00)" },
      ],
      porDefecto: "diurna",
    },
    { id: "diurnas", tipo: "numero", etiqueta: "Horas extra de día", min: 0, porDefecto: 0 },
    { id: "nocturnas", tipo: "numero", etiqueta: "Horas extra de noche (de 19:00 a 6:00)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = entrada.jornada === "diurna" ? valores["sv.jornada-diurna"] : valores["sv.jornada-nocturna"];
    const hora = entrada.salario / DIAS_DEL_MES / horas;
    const extraDia = hora + porcentaje(hora, valores["sv.recargo-hora-extra"]);
    const extraNoche = extraDia + porcentaje(extraDia, valores["sv.recargo-nocturno"]);
    const pagoDiurnas = redondear(entrada.diurnas * extraDia);
    const pagoNocturnas = redondear(entrada.nocturnas * extraNoche);
    return {
      hora: redondear(hora),
      extraDia: redondear(extraDia),
      extraNoche: redondear(extraNoche),
      pagoDiurnas,
      pagoNocturnas,
      total: redondear(pagoDiurnas + pagoNocturnas),
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de su hora ordinaria", formato: "moneda" },
    { clave: "extraDia", etiqueta: "Hora extra de día", formato: "moneda" },
    { clave: "extraNoche", etiqueta: "Hora extra de noche", formato: "moneda" },
    { clave: "pagoDiurnas", etiqueta: "Pago por horas extra de día", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoNocturnas", etiqueta: "Pago por horas extra de noche", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por horas extra", formato: "moneda", destacada: true },
  ],
});
