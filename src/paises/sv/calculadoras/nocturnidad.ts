import { definirCalculadora, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;

// Art. 168: las horas nocturnas valen al menos 25 % más que la misma hora de día. La base es el salario
// por hora diurna (salario diario / jornada diurna).
export default definirCalculadora({
  id: "sv.nocturnidad",
  mercado: "sv",
  concepto: "propio",
  slug: "nocturnidad",
  estado: "publicado",
  requiere: {
    "sv.recargo-nocturno": "numero",
    "sv.jornada-diurna": "numero",
    "sv.jornada-nocturna": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual por trabajo de día", ayuda: "Lo que ganaría haciendo el mismo trabajo de día.", min: 0 },
    { id: "horasNocturnas", tipo: "numero", etiqueta: "Horas trabajadas entre las 19:00 y las 6:00", ayuda: "En el período que quiere calcular (por ejemplo, el mes).", min: 0, porDefecto: 20 },
  ],
  calcular(entrada, valores, { redondear }) {
    const horaDiurna = entrada.salario / DIAS_DEL_MES / valores["sv.jornada-diurna"];
    const recargoHora = porcentaje(horaDiurna, valores["sv.recargo-nocturno"]);
    return {
      horaDiurna: redondear(horaDiurna),
      horaNocturna: redondear(horaDiurna + recargoHora),
      recargo: redondear(recargoHora * entrada.horasNocturnas),
      totalNocturnas: redondear((horaDiurna + recargoHora) * entrada.horasNocturnas),
    };
  },
  resultado: [
    { clave: "horaDiurna", etiqueta: "Hora de día", formato: "moneda" },
    { clave: "horaNocturna", etiqueta: "Hora de noche", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo nocturno de esas horas", formato: "moneda", destacada: true },
    { clave: "totalNocturnas", etiqueta: "Pago total de esas horas", formato: "moneda" },
  ],
});
