import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "gt.pago-dia-de-asueto",
  mercado: "gt",
  concepto: "propio",
  slug: "pago-dia-de-asueto",
  estado: "publicado",
  requiere: {
    "gt.jornada-horas": "mapa",
    "gt.recargo-horas-extra": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0, ayuda: "Sin la bonificación incentivo." },
    { id: "jornada", tipo: "opcion-dato", dato: "gt.jornada-horas", etiqueta: "Su jornada", porDefecto: "diurna" },
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajó el día de asueto o de descanso", min: 0, max: 24 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horas < 0) throw new ErrorEntrada("Las horas no pueden ser negativas.", "horas");
    const hora = redondear(entrada.salario / DIAS_MES / enMapa(valores["gt.jornada-horas"], entrada.jornada));
    const horaExtra = redondear(hora * (1 + valores["gt.recargo-horas-extra"] / 100));
    return {
      hora,
      horaExtra,
      pago: redondear(horaExtra * entrada.horas),
      observaciones: [
        "Su salario mensual ya incluye el día de asueto. Si lo trabaja, esas horas se le pagan aparte como horas extra.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Hora ordinaria", formato: "moneda" },
    { clave: "horaExtra", etiqueta: "Hora trabajada en asueto", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago adicional por el asueto", formato: "moneda", destacada: true },
  ],
});
