import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.barnabaetur",
  mercado: "is",
  concepto: "propio",
  slug: "barnabaetur",
  estado: "publicado",
  requiere: {
    "is.barnabaetur": "mapa",
    "is.barnabaetur-vidbot": "numero",
    "is.barnabaetur-skerdingarmork": "mapa",
    "is.barnabaetur-skerding": "numero",
  },
  campos: [
    { id: "stada", tipo: "opcion-dato", dato: "is.barnabaetur", etiqueta: "Fjölskyldustaða", porDefecto: "hjon" },
    { id: "tekjur", tipo: "moneda", etiqueta: "Tekjur síðasta árs", ayuda: "Hjá hjónum og sambýlisfólki: samanlagðar tekjur beggja.", min: 0, porDefecto: 12000000 },
    { id: "born", tipo: "entero", etiqueta: "Fjöldi barna", min: 1, max: 15, porDefecto: 2 },
    { id: "yngri", tipo: "entero", etiqueta: "Þar af yngri en 7 ára", min: 0, max: 15, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yngri > e.born) throw new ErrorEntrada("Börn yngri en 7 ára geta ekki verið fleiri en börnin alls.", "yngri");
    const yfir = Math.max(0, e.tekjur - enMapa(v["is.barnabaetur-skerdingarmork"], e.stada));
    const hlutfall = v["is.barnabaetur-skerding"];
    const grunnur = e.born * enMapa(v["is.barnabaetur"], e.stada);
    const vidbotFull = e.yngri * v["is.barnabaetur-vidbot"];
    const baetur = Math.max(0, grunnur - redondear(porcentaje(yfir, hlutfall)));
    const vidbot = Math.max(0, vidbotFull - redondear(porcentaje(yfir, hlutfall * e.yngri)));
    const skerding = grunnur + vidbotFull - baetur - vidbot;
    return { grunnur: grunnur + vidbotFull, skerding, samtals: baetur + vidbot };
  },
  resultado: [
    { clave: "grunnur", etiqueta: "Bætur fyrir skerðingu", formato: "moneda" },
    { clave: "skerding", etiqueta: "Skerðing vegna tekna", formato: "moneda" },
    { clave: "samtals", etiqueta: "Barnabætur á ári", formato: "moneda", destacada: true },
  ],
});
