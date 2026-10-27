import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "zm.notice-period-calculator",
  mercado: "zm",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "zm.notice-hours-monthly": "numero",
    "zm.notice-days-short": "numero",
    "zm.notice-days-long": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Length of the contract of employment",
      opciones: [
        { valor: "hasta-1", etiqueta: "One month or less" },
        { valor: "1-a-3", etiqueta: "More than one month and up to three months" },
        { valor: "3-a-6", etiqueta: "More than three months and up to six months" },
        { valor: "mas-de-6", etiqueta: "More than six months" },
      ],
      porDefecto: "mas-de-6",
    },
    { id: "fecha", tipo: "fecha", etiqueta: "Day the notice is given", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    if (e.contrato === "hasta-1") {
      const horas = v["zm.notice-hours-monthly"];
      return { dias: null, horas, fin: sumarDias(e.fecha, Math.ceil(horas / 24)), observaciones: [] };
    }
    const dias = e.contrato === "1-a-3" ? v["zm.notice-days-short"] : v["zm.notice-days-long"];
    const observaciones = e.contrato === "mas-de-6" ? ["For a contract of more than six months the notice has to be in writing."] : [];
    return { dias, horas: null, fin: sumarDias(e.fecha, dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Minimum notice", formato: "dias", destacada: true },
    { clave: "horas", etiqueta: "Minimum notice", formato: "horas", destacada: true },
    { clave: "fin", etiqueta: "Notice runs until", formato: "fecha" },
  ],
});
