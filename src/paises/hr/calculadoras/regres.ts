import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.regres",
  mercado: "hr",
  concepto: "propio",
  slug: "regres",
  estado: "publicado",
  requiere: { "hr.prigodne-nagrade": "numero", "hr.dar-djetetu": "numero", "hr.nagrade-rezultati": "numero" },
  campos: [
    { id: "isplata", tipo: "moneda", etiqueta: "Regres ili božićnica koju isplaćujete", min: 0, porDefecto: 500 },
    { id: "vecIsplaceno", tipo: "moneda", etiqueta: "Prigodne nagrade već isplaćene ove godine", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.isplata <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "isplata");
    const slobodno = Math.max(0, redondear(v["hr.prigodne-nagrade"] - e.vecIsplaceno));
    const neoporezivo = Math.min(e.isplata, slobodno);
    return { neoporezivo, oporezivo: redondear(e.isplata - neoporezivo), preostalo: redondear(slobodno - neoporezivo) };
  },
  resultado: [
    { clave: "neoporezivo", etiqueta: "Neoporezivi dio", formato: "moneda", destacada: true },
    { clave: "oporezivo", etiqueta: "Dio iznad neoporezive svote", formato: "moneda" },
    { clave: "preostalo", etiqueta: "Preostalo neoporezivo za ovu godinu", formato: "moneda" },
  ],
});
