import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { mesesDeServicio } from "../lib/laboral";

export default definirCalculadora({
  id: "ca.severance-pay",
  mercado: "ca",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: {
    "ca.severance-on": "mapa",
    "ca.severance-federal": "mapa",
  },
  campos: [
    {
      id: "jurisdiccion",
      tipo: "opcion",
      etiqueta: "Rules that cover your job",
      opciones: [
        { valor: "on", etiqueta: "Ontario" },
        { valor: "federal", etiqueta: "Federally regulated job (Canada Labour Code)" },
      ],
      porDefecto: "on",
    },
    { id: "anios", tipo: "entero", etiqueta: "Completed years with this employer", min: 0, max: 60, porDefecto: 8 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months", min: 0, max: 11, porDefecto: 0 },
    { id: "semanal", tipo: "moneda", etiqueta: "Regular wages for a normal work week", min: 0, porDefecto: 1200 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you normally work in a week", min: 1, max: 7, porDefecto: 5 },
    { id: "nominaGrande", tipo: "si-no", etiqueta: "Ontario: the employer's payroll is $2.5 million or more, or 50 or more people lost their jobs in a closure", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your regular weekly wages.", "semanal");
    const meses = mesesDeServicio(entrada.anios, entrada.meses);
    const observaciones: string[] = [];
    let semanas = 0;
    let dias = 0;
    let califica = false;
    if (entrada.jurisdiccion === "on") {
      const r = v["ca.severance-on"];
      califica = meses >= r["min-years"] * 12 && entrada.nominaGrande;
      if (califica) semanas = Math.min(r["max-weeks"], (meses / 12) * r["weeks-per-year"]);
      else observaciones.push("In Ontario severance pay needs at least 5 years of service and a large employer. Termination pay instead of notice is separate.");
    } else {
      const r = v["ca.severance-federal"];
      califica = meses >= r["min-months"];
      if (califica) {
        dias = Math.max(r["min-days"], entrada.anios * r["days-per-year"]);
        semanas = dias / entrada.diasSemana;
      } else observaciones.push("Federal severance pay starts after 12 consecutive months of employment.");
    }
    observaciones.push("This is the legal minimum and it is paid on top of notice or pay instead of notice.");
    return {
      pago: redondear(semanas * entrada.semanal),
      semanas,
      dias: dias > 0 ? dias : null,
      califica: califica ? "Yes" : "No",
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Severance pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "Days of wages (federal)", formato: "numero", decimales: 0 },
    { clave: "califica", etiqueta: "You qualify", formato: "texto" },
  ],
});
