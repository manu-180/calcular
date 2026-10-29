import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.notice-period-calculator",
  mercado: "et",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "et.notice-first-year": "numero",
    "et.notice-up-to-nine": "numero",
    "et.notice-over-nine": "numero",
    "et.notice-redundancy": "numero",
    "et.probation-days": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 3 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Reason for the notice",
      opciones: [
        { valor: "general", etiqueta: "Termination by the employer with notice" },
        { valor: "redundancy", etiqueta: "Reduction of workforce" },
      ],
      porDefecto: "general",
    },
    { id: "prueba", tipo: "si-no", etiqueta: "The worker has completed probation", porDefecto: true },
  ],
  calcular(e, v) {
    if (e.anios === 0 && e.meses === 0) throw new ErrorEntrada("Enter the length of service.", "anios");
    if (!e.prueba) {
      return {
        meses: 0,
        regla: "Article 11: during probation the employer can end the contract without notice if the worker proves unfit, and the worker can leave without notice.",
      };
    }
    const servicio = e.anios + e.meses / 12;
    let meses: number;
    let regla: string;
    if (e.motivo === "redundancy") {
      meses = v["et.notice-redundancy"];
      regla = "Article 35(1)(d): reduction of workforce";
    } else if (servicio <= 1) {
      meses = v["et.notice-first-year"];
      regla = "Article 35(1)(a): service of up to one year";
    } else if (servicio <= 9) {
      meses = v["et.notice-up-to-nine"];
      regla = "Article 35(1)(b): more than one and up to nine years";
    } else {
      meses = v["et.notice-over-nine"];
      regla = "Article 35(1)(c): more than nine years";
    }
    return { meses, regla };
  },
  resultado: [
    { clave: "meses", etiqueta: "Notice the employer must give", formato: "meses", destacada: true },
    { clave: "regla", etiqueta: "Rule applied", formato: "texto" },
  ],
});
