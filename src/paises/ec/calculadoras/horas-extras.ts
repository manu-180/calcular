import { definirCalculadora, porcentaje } from "@/motor/calculo";

// El sueldo mensual paga treinta días, descanso semanal incluido (Código del Trabajo, art. 53): la
// hora ordinaria es el sueldo dividido para 30 y para la jornada diaria (art. 47), es decir, 240.
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.horas-extras",
  mercado: "ec",
  concepto: "horas-extra",
  slug: "horas-extras",
  estado: "publicado",
  requiere: {
    "ec.jornada-diaria": "numero",
    "ec.recargo-suplementarias": "numero",
    "ec.recargo-madrugada": "numero",
    "ec.recargo-extraordinarias": "numero",
    "ec.suplementarias-max-semana": "numero",
    "ec.suplementarias-max-dia": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    {
      id: "suplementarias",
      tipo: "numero",
      etiqueta: "Horas suplementarias hasta las 24:00",
      ayuda: "Horas después de tu jornada, de lunes a viernes, que terminan antes de la medianoche.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "madrugada",
      tipo: "numero",
      etiqueta: "Horas suplementarias entre las 24:00 y las 06:00",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "extraordinarias",
      tipo: "numero",
      etiqueta: "Horas trabajadas en sábado o domingo",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = entrada.sueldo / DIAS_DEL_MES / valores["ec.jornada-diaria"];
    const precio = (recargo: number) => hora + porcentaje(hora, recargo);
    const valorSuplementarias = redondear(entrada.suplementarias * precio(valores["ec.recargo-suplementarias"]));
    const valorMadrugada = redondear(entrada.madrugada * precio(valores["ec.recargo-madrugada"]));
    const valorExtraordinarias = redondear(entrada.extraordinarias * precio(valores["ec.recargo-extraordinarias"]));
    const observaciones: string[] = [];
    const maxSemana = valores["ec.suplementarias-max-semana"];
    if (entrada.suplementarias + entrada.madrugada > (maxSemana * 52) / 12) {
      observaciones.push(`Son más horas suplementarias de las que permite la ley (${maxSemana} por semana). Igual tienen que pagártelas.`);
    }
    return {
      hora: redondear(hora),
      horaSuplementaria: redondear(precio(valores["ec.recargo-suplementarias"])),
      horaDoble: redondear(precio(valores["ec.recargo-extraordinarias"])),
      valorSuplementarias,
      valorMadrugada,
      valorExtraordinarias,
      total: redondear(valorSuplementarias + valorMadrugada + valorExtraordinarias),
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora normal", formato: "moneda" },
    { clave: "horaSuplementaria", etiqueta: "Hora suplementaria hasta las 24:00", formato: "moneda" },
    { clave: "horaDoble", etiqueta: "Hora de sábado o domingo", formato: "moneda" },
    { clave: "valorSuplementarias", etiqueta: "Suplementarias hasta las 24:00", formato: "moneda", ocultarSiCero: true },
    { clave: "valorMadrugada", etiqueta: "Suplementarias de madrugada", formato: "moneda", ocultarSiCero: true },
    { clave: "valorExtraordinarias", etiqueta: "Horas de sábado o domingo", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar por horas extra", formato: "moneda", destacada: true },
  ],
});
