import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { doZlotych } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.umowa-o-dzielo",
  mercado: "pl",
  concepto: "retencion-honorarios",
  slug: "umowa-o-dzielo",
  estado: "publicado",
  requiere: {
    "pl.skala-pit": "escala",
    "pl.koszty-procentowe": "mapa",
    "pl.limit-malej-umowy": "numero",
    "pl.ryczalt-malej-umowy": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Kwota brutto z umowy o dzieło", min: 0, porDefecto: 3000 },
    { id: "koszty", tipo: "opcion-dato", dato: "pl.koszty-procentowe", etiqueta: "Koszty uzyskania przychodu", porDefecto: "standard" },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Wpisz kwotę brutto większą od zera.", "brutto");
    const observaciones: string[] = [];
    let koszty = 0;
    let podatek: number;
    if (e.brutto <= v["pl.limit-malej-umowy"]) {
      podatek = doZlotych((e.brutto * v["pl.ryczalt-malej-umowy"]) / 100);
      observaciones.push("Przy umowie na kwotę do 200 zł zawartej z osobą, która nie jest pracownikiem zamawiającego, pobiera się zryczałtowany podatek od całego przychodu, bez kosztów.");
    } else {
      koszty = redondear((e.brutto * enMapa(v["pl.koszty-procentowe"], e.koszty)) / 100);
      const podstawa = Math.max(0, doZlotych(e.brutto - koszty));
      podatek = doZlotych((podstawa * v["pl.skala-pit"][0].tasa) / 100);
      if (e.koszty === "autorskie") {
        observaciones.push("Koszty autorskie przysługują tylko za dzieło, które jest utworem w rozumieniu prawa autorskiego. Łączny limit tych kosztów w roku to górna granica pierwszego progu skali podatkowej.");
      }
    }
    return {
      netto: redondear(e.brutto - podatek),
      koszty,
      podstawa: e.brutto <= v["pl.limit-malej-umowy"] ? e.brutto : Math.max(0, doZlotych(e.brutto - koszty)),
      podatek,
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Na rękę", formato: "moneda", destacada: true },
    { clave: "koszty", etiqueta: "Koszty uzyskania przychodu", formato: "moneda", ocultarSiCero: true },
    { clave: "podstawa", etiqueta: "Podstawa opodatkowania", formato: "moneda" },
    { clave: "podatek", etiqueta: "Zaliczka na PIT", formato: "moneda" },
  ],
});
