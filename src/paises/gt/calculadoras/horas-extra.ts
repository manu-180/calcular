import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.horas-extra",
  mercado: "gt",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "gt.jornada-horas": "mapa",
    "gt.recargo-horas-extra": "numero",
    "gt.tope-horas-diarias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario ordinario mensual", min: 0, ayuda: "Sin la bonificación incentivo." },
    { id: "jornada", tipo: "opcion-dato", dato: "gt.jornada-horas", etiqueta: "Su jornada", porDefecto: "diurna" },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra trabajadas", min: 0, ayuda: "Las de la quincena o el mes que quiere calcular." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horas < 0) throw new ErrorEntrada("Las horas extra no pueden ser negativas.", "horas");
    const horasJornada = enMapa(valores["gt.jornada-horas"], entrada.jornada);
    const hora = redondear(entrada.salario / DIAS_MES / horasJornada);
    const recargo = valores["gt.recargo-horas-extra"];
    const horaExtra = redondear(hora * (1 + recargo / 100));
    const maximoDiario = valores["gt.tope-horas-diarias"] - horasJornada;
    return {
      hora,
      recargo,
      horaExtra,
      total: redondear(horaExtra * entrada.horas),
      maximoDiario,
      observaciones: [
        "La hora ordinaria sale de dividir el salario mensual entre 30 días y entre las horas de su jornada.",
        "El recargo es un mínimo: si su contrato paga más, use ese valor.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Hora ordinaria", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo", formato: "porcentaje" },
    { clave: "horaExtra", etiqueta: "Hora extra", formato: "moneda" },
    { clave: "total", etiqueta: "Pago por horas extra", formato: "moneda", destacada: true },
    { clave: "maximoDiario", etiqueta: "Máximo de horas extra por día", formato: "horas" },
  ],
});
