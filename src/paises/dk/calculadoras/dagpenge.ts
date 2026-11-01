import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.dagpenge",
  mercado: "dk",
  concepto: "propio",
  slug: "dagpenge",
  estado: "publicado",
  requiere: {
    "dk.am-bidrag": "numero",
    "dk.dagpenge-hoejst": "mapa",
    "dk.dagpenge-procent": "numero",
  },
  campos: [
    {
      id: "loen",
      tipo: "moneda",
      etiqueta: "Din gennemsnitlige månedsløn før skat",
      ayuda: "A-kassen bruger gennemsnittet af de 12 måneder med højest indkomst i de seneste 24 måneder.",
      min: 0,
      porDefecto: 30000,
    },
    {
      id: "forsikring",
      tipo: "opcion",
      etiqueta: "Forsikring i a-kassen",
      opciones: [
        { valor: "fuldtid", etiqueta: "Fuldtidsforsikret" },
        { valor: "deltid", etiqueta: "Deltidsforsikret" },
      ],
      porDefecto: "fuldtid",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.loen <= 0) throw new ErrorEntrada("Skriv en månedsløn, der er større end 0.", "loen");
    const grundlag = redondear(e.loen - porcentaje(e.loen, v["dk.am-bidrag"]));
    const procent = redondear(porcentaje(grundlag, v["dk.dagpenge-procent"]));
    const hoejst = enMapa(v["dk.dagpenge-hoejst"], e.forsikring);
    const dagpenge = Math.min(procent, hoejst);
    return {
      dagpenge,
      aar: redondear(dagpenge * 12),
      grundlag,
      procent,
      hoejst,
      daekning: (100 * dagpenge) / e.loen,
      observaciones: dagpenge === hoejst ? ["Du får højeste sats. Dagpengene kan ikke blive højere, selv om din løn er højere."] : [],
    };
  },
  resultado: [
    { clave: "dagpenge", etiqueta: "Dagpenge pr. måned før skat", formato: "moneda", destacada: true },
    { clave: "aar", etiqueta: "Dagpenge pr. år før skat", formato: "moneda" },
    { clave: "grundlag", etiqueta: "Beregningsgrundlag (løn efter am-bidrag)", formato: "moneda" },
    { clave: "procent", etiqueta: "Sats efter beregningsgrundlaget", formato: "moneda" },
    { clave: "hoejst", etiqueta: "Højeste sats", formato: "moneda" },
    { clave: "daekning", etiqueta: "Dagpenge i procent af din løn", formato: "porcentaje", decimales: 1 },
  ],
});
