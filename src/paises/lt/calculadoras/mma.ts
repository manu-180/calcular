import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lt.mma",
  mercado: "lt",
  concepto: "salario-minimo",
  slug: "mma",
  estado: "publicado",
  requiere: { "lt.mma": "numero", "lt.mma-ankstesne": "numero" },
  campos: [
    { id: "etatas", tipo: "porcentaje", etiqueta: "Etato dalis", min: 1, max: 100, porDefecto: 100, ayuda: "Visas etatas yra 100 %, pusė etato yra 50 %." },
    { id: "atlyginimas", tipo: "moneda", etiqueta: "Jūsų atlyginimas ant popieriaus", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.etatas <= 0) throw new ErrorEntrada("Įveskite etato dalį, didesnę už nulį.", "etatas");
    const mma = v["lt.mma"];
    const ankstesne = v["lt.mma-ankstesne"];
    const proporcija = redondear(porcentaje(mma, e.etatas));
    return {
      proporcija,
      mma,
      ankstesne,
      augimas: mma - ankstesne,
      augimasProc: ((mma - ankstesne) / ankstesne) * 100,
      skirtumas: e.atlyginimas === null ? null : redondear(e.atlyginimas - proporcija),
    };
  },
  resultado: [
    { clave: "proporcija", etiqueta: "MMA dalis pagal jūsų etatą", formato: "moneda", destacada: true },
    { clave: "mma", etiqueta: "MMA už visą etatą", formato: "moneda" },
    { clave: "ankstesne", etiqueta: "Ankstesnių metų MMA", formato: "moneda" },
    { clave: "augimas", etiqueta: "Padidėjimas per metus", formato: "moneda" },
    { clave: "augimasProc", etiqueta: "Padidėjimas procentais", formato: "porcentaje", decimales: 1 },
    { clave: "skirtumas", etiqueta: "Jūsų atlyginimo ir šios sumos skirtumas", formato: "moneda" },
  ],
});
