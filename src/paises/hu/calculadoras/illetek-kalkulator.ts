import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.illetek-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "illetek-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.illetek-kulcs": "mapa",
    "hu.illetek-hatarok": "mapa",
    "hu.illetek-fiatal-kedvezmeny": "numero",
  },
  campos: [
    { id: "ertek", tipo: "moneda", etiqueta: "A lakás forgalmi értéke (vételár)", min: 0, porDefecto: 40000000 },
    {
      id: "eladott",
      tipo: "moneda",
      etiqueta: "Az eladott lakásod értéke (nem kötelező)",
      ayuda: "Ha a vásárlás előtti öt évben vagy utána egy éven belül eladsz egy másik lakást, csak az értékkülönbözet után fizetsz illetéket.",
      min: 0,
      requerido: false,
    },
    { id: "ujLakas", tipo: "si-no", etiqueta: "Új lakást veszel attól, aki értékesítésre építette", porDefecto: false },
    { id: "fiatal", tipo: "si-no", etiqueta: "35 év alatti vagy, és ez az első lakásod", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ertek <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb forgalmi értéket.", "ertek");
    const k = v["hu.illetek-kulcs"];
    const h = v["hu.illetek-hatarok"];
    const observaciones: string[] = [];
    let alap = e.ertek;
    const eladott = e.eladott ?? 0;
    if (eladott > 0) {
      alap = Math.max(0, e.ertek - eladott);
      observaciones.push("Lakáscserénél a két lakás forgalmi értékének különbözete után jár az illeték.");
    } else if (e.ujLakas) {
      if (e.ertek <= enMapa(h, "uj-lakas-mentes")) {
        alap = 0;
        observaciones.push("Az új lakás forgalmi értéke nem haladja meg az értékhatárt, ezért illetékmentes.");
      } else if (e.ertek <= enMapa(h, "uj-lakas-kedvezmeny")) {
        alap = e.ertek - enMapa(h, "uj-lakas-mentes");
        observaciones.push("Az új lakás után az illetékmentes értékhatárnak megfelelő illetéket nem kell megfizetni.");
      }
    }
    const savhatar = enMapa(h, "savhatar");
    const szamitott = (Math.min(alap, savhatar) * enMapa(k, "alap")) / 100 + (Math.max(0, alap - savhatar) * enMapa(k, "felett")) / 100;
    let illetek = redondear(Math.min(szamitott, enMapa(h, "maximum")));
    let kedvezmeny = 0;
    if (e.fiatal) {
      if (e.ertek <= enMapa(h, "fiatal")) {
        kedvezmeny = redondear((illetek * v["hu.illetek-fiatal-kedvezmeny"]) / 100);
        illetek = redondear(illetek - kedvezmeny);
        observaciones.push("A 35 év alattiak első lakásánál az illeték legfeljebb a felével csökkenthető. Itt a legnagyobb kedvezménnyel számoltunk.");
      } else {
        observaciones.push("A 35 év alattiak kedvezménye csak akkor jár, ha a lakás forgalmi értéke nem haladja meg az értékhatárt.");
      }
    }
    return { illetek, alap, kedvezmeny, kulcs: enMapa(k, "alap"), observaciones };
  },
  resultado: [
    { clave: "illetek", etiqueta: "Fizetendő vagyonszerzési illeték", formato: "moneda", destacada: true },
    { clave: "alap", etiqueta: "Az illeték alapja", formato: "moneda" },
    { clave: "kedvezmeny", etiqueta: "Kedvezmény", formato: "moneda", ocultarSiCero: true },
    { clave: "kulcs", etiqueta: "Általános illetékkulcs", formato: "porcentaje" },
  ],
});
