import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.bolovanje",
  mercado: "me",
  concepto: "propio",
  slug: "bolovanje",
  estado: "publicado",
  requiere: { "me.bolovanje-stopa": "numero", "me.bolovanje-puna": "numero", "me.bolovanje-dani-poslodavac": "numero", "me.prosjecna-bruto-2025": "numero" },
  campos: [
    { id: "osnov", tipo: "moneda", etiqueta: "Prosjek osnovne zarade u poslednjih 12 mjeseci", min: 0, porDefecto: 900 },
    { id: "dana", tipo: "entero", etiqueta: "Dana bolovanja", min: 1, max: 365, porDefecto: 10 },
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Razlog odsustva",
      opciones: [
        { valor: "opsti", etiqueta: "Bolest ili povreda van rada" },
        { valor: "puni", etiqueta: "Povreda na radu, profesionalna bolest, održavanje trudnoće i dr." },
      ],
      porDefecto: "opsti",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.osnov <= 0) throw new ErrorEntrada("Unesite osnov veći od nule.", "osnov");
    const stopa = e.vrsta === "puni" ? v["me.bolovanje-puna"] : v["me.bolovanje-stopa"];
    const dnevno = redondear(((e.osnov / 30) * stopa) / 100);
    const granica = v["me.bolovanje-dani-poslodavac"];
    return {
      naknada: redondear(dnevno * e.dana),
      dnevno,
      stopa,
      poslodavacDana: Math.min(e.dana, granica),
      fondDana: Math.max(0, e.dana - granica),
      razlika: redondear((e.osnov / 30) * e.dana - dnevno * e.dana),
    };
  },
  resultado: [
    { clave: "naknada", etiqueta: "Naknada za bolovanje", formato: "moneda", destacada: true },
    { clave: "dnevno", etiqueta: "Naknada po danu", formato: "moneda" },
    { clave: "stopa", etiqueta: "Stopa", formato: "porcentaje", decimales: 0 },
    { clave: "poslodavacDana", etiqueta: "Dani bez refundacije", formato: "dias" },
    { clave: "fondDana", etiqueta: "Dani koje Fond refundira", formato: "dias" },
    { clave: "razlika", etiqueta: "Manje u odnosu na osnov", formato: "moneda" },
  ],
});
