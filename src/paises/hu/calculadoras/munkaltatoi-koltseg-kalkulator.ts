import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { NINCS_KEDVEZMENY, nettoBer } from "../lib/ber";

export default definirCalculadora({
  id: "hu.munkaltatoi-koltseg-kalkulator",
  mercado: "hu",
  concepto: "costo-empleador",
  slug: "munkaltatoi-koltseg-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.szja": "numero",
    "hu.tb-jarulek": "numero",
    "hu.szocho": "numero",
    "hu.fiatalok-kedvezmenye-hatar": "numero",
    "hu.csaladi-kedvezmeny": "mapa",
    "hu.csaladi-kedvezmeny-beteg": "numero",
    "hu.elso-hazasok-kedvezmenye": "numero",
    "hu.minimalber": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Havi bruttó bér", min: 0, porDefecto: 500000 },
    { id: "fo", tipo: "entero", etiqueta: "Hány munkavállalóval számolsz?", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb bruttó bért.", "brutto");
    const szocho = redondear((e.brutto * v["hu.szocho"]) / 100);
    const koltseg = redondear(e.brutto + szocho);
    const sz = nettoBer(
      e.brutto,
      NINCS_KEDVEZMENY,
      {
        szja: v["hu.szja"],
        tb: v["hu.tb-jarulek"],
        hatar25: v["hu.fiatalok-kedvezmenye-hatar"],
        csaladi: v["hu.csaladi-kedvezmeny"],
        csaladiBeteg: v["hu.csaladi-kedvezmeny-beteg"],
        elsoHazasok: v["hu.elso-hazasok-kedvezmenye"],
        minimalber: enMapa(v["hu.minimalber"], "havi"),
      },
      redondear,
    );
    return {
      koltseg,
      szocho,
      netto: sz.netto,
      allamnak: redondear(koltseg - sz.netto),
      arany: (sz.netto / koltseg) * 100,
      evesKoltseg: redondear(koltseg * 12 * e.fo),
      observaciones: ["A nettó bér kedvezmények nélkül szerepel. Családi kedvezménnyel vagy 25 év alatti munkavállalónál a nettó több, a munkáltató költsége ugyanannyi."],
    };
  },
  resultado: [
    { clave: "koltseg", etiqueta: "Munkáltatói költség havonta, főnként", formato: "moneda", destacada: true },
    { clave: "szocho", etiqueta: "Szociális hozzájárulási adó (szocho)", formato: "moneda" },
    { clave: "netto", etiqueta: "A munkavállaló nettó bére", formato: "moneda" },
    { clave: "allamnak", etiqueta: "Adók és járulékok összesen", formato: "moneda" },
    { clave: "arany", etiqueta: "A költségből a munkavállalónál marad", formato: "porcentaje", decimales: 1 },
    { clave: "evesKoltseg", etiqueta: "Éves költség az összes munkavállalóra", formato: "moneda" },
  ],
});
