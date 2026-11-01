import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.personuafslattur",
  mercado: "is",
  concepto: "propio",
  slug: "personuafslattur",
  estado: "publicado",
  requiere: {
    "is.personuafslattur-timabil": "mapa",
    "is.personuafslattur-ars": "numero",
    "is.personuafslattur-man": "numero",
    "is.skattthrep-man": "escala",
    "is.lifeyrir-launamadur": "numero",
  },
  campos: [
    {
      id: "timabil",
      tipo: "opcion",
      etiqueta: "Launatímabil",
      opciones: [
        { valor: "man", etiqueta: "Einn mánuður" },
        { valor: "halfur", etiqueta: "Hálfur mánuður" },
        { valor: "fjortan", etiqueta: "Fjórtán dagar" },
        { valor: "vika", etiqueta: "Ein vika" },
        { valor: "annad", etiqueta: "Annað tímabil" },
      ],
      porDefecto: "man",
    },
    { id: "dagar", tipo: "entero", etiqueta: "Fjöldi daga í launatímabili", min: 1, max: 365, porDefecto: 10, visibleSi: { timabil: ["annad"] } },
    { id: "nyting", tipo: "porcentaje", etiqueta: "Nýting persónuafsláttar", ayuda: "Skrifaðu 200 ef þú nýtir allan ónýttan afslátt maka.", min: 0, max: 200, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.timabil === "annad" && !e.dagar) throw new ErrorEntrada("Sláðu inn fjölda daga.", "dagar");
    const fullur = e.timabil === "annad" ? redondear((v["is.personuafslattur-ars"] * (e.dagar ?? 0)) / 365) : enMapa(v["is.personuafslattur-timabil"], e.timabil);
    const afslattur = redondear(porcentaje(fullur, e.nyting));
    const manadar = redondear(porcentaje(v["is.personuafslattur-man"], e.nyting));
    const fyrstaThrep = v["is.skattthrep-man"][0]?.tasa ?? 0;
    const stofn = (manadar * 100) / fyrstaThrep;
    return {
      afslattur,
      ars: redondear(porcentaje(v["is.personuafslattur-ars"], e.nyting)),
      skattleysismork: redondear(stofn / (1 - v["is.lifeyrir-launamadur"] / 100)),
    };
  },
  resultado: [
    { clave: "afslattur", etiqueta: "Persónuafsláttur á tímabilinu", formato: "moneda", destacada: true },
    { clave: "ars", etiqueta: "Á ári", formato: "moneda" },
    { clave: "skattleysismork", etiqueta: "Skattleysismörk á mánuði (með 4% iðgjaldi)", formato: "moneda" },
  ],
});
