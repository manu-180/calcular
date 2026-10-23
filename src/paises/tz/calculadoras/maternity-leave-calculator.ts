import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO, sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "tz.maternity-leave-calculator",
  mercado: "tz",
  concepto: "propio",
  slug: "maternity-leave-calculator",
  estado: "publicado",
  requiere: {
    "tz.maternity-days": "numero",
    "tz.maternity-days-multiple": "numero",
    "tz.paternity-days": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of leave",
      opciones: [
        { valor: "maternity", etiqueta: "Maternity leave, one baby" },
        { valor: "multiple", etiqueta: "Maternity leave, twins or more" },
        { valor: "paternity", etiqueta: "Paternity leave" },
      ],
      porDefecto: "maternity",
    },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of leave", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of leave.", "inicio");
    const dias = e.tipo === "maternity" ? v["tz.maternity-days"] : e.tipo === "multiple" ? v["tz.maternity-days-multiple"] : v["tz.paternity-days"];
    const ultimo = sumarDias(e.inicio, dias - 1);
    const observaciones =
      e.tipo === "paternity"
        ? ["Paternity leave must be taken within seven days of the birth."]
        : ["You can start maternity leave up to four weeks before the expected date of birth, or earlier on medical advice."];
    return { dias, ultimo, regreso: sumarDias(ultimo, 1), observaciones };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Last day of leave", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Days of paid leave", formato: "dias" },
    { clave: "regreso", etiqueta: "Day after your leave ends", formato: "fecha" },
  ],
});
