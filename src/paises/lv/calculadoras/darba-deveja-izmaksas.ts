import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { noBruto } from "../lib/alga";

export default definirCalculadora({
  id: "lv.darba-deveja-izmaksas",
  mercado: "lv",
  concepto: "costo-empleador",
  slug: "darba-deveja-izmaksas",
  estado: "publicado",
  requiere: {
    "lv.vsaoi-darba-nemejs": "mapa",
    "lv.vsaoi-darba-devejs": "mapa",
    "lv.iin-alga": "numero",
    "lv.iin-gada": "escala",
    "lv.neapliekamais-minimums": "numero",
    "lv.apgadajamais": "numero",
    "lv.papildu-atvieglojums": "mapa",
    "lv.vsaoi-maksimums": "numero",
    "lv.solidaritate-darba-devejs": "numero",
    "lv.minimala-alga": "numero",
  },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Darbinieka bruto alga mēnesī", min: 0, porDefecto: 1750 },
    { id: "kategorija", tipo: "opcion-dato", dato: "lv.vsaoi-darba-devejs", etiqueta: "Darbinieka VSAOI kategorija", porDefecto: "vispariga" },
    { id: "gramatina", tipo: "si-no", etiqueta: "Darbinieka algas nodokļa grāmatiņa iesniegta", porDefecto: true },
    { id: "apgadajamie", tipo: "entero", etiqueta: "Darbinieka apgādājamo skaits", min: 0, max: 15, porDefecto: 0, visibleSi: { gramatina: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet bruto algu, kas lielāka par nulli.", "alga");
    const devejaVsaoi = redondear(porcentaje(e.alga, enMapa(v["lv.vsaoi-darba-devejs"], e.kategorija)));
    const a = noBruto(
      {
        darbaNemejs: v["lv.vsaoi-darba-nemejs"],
        iinAlga: v["lv.iin-alga"],
        iinGada: v["lv.iin-gada"],
        minimums: v["lv.neapliekamais-minimums"],
        apgadajamais: v["lv.apgadajamais"],
        papildu: v["lv.papildu-atvieglojums"],
      },
      { kategorija: e.kategorija, gramatina: e.gramatina, apgadajamie: e.apgadajamie ?? 0, atvieglojums: "nav" },
      e.alga,
    );
    const izmaksas = redondear(e.alga + devejaVsaoi);
    const neto = redondear(e.alga - a.vsaoi - a.iin);
    return { izmaksas, devejaVsaoi, gada: redondear(izmaksas * 12), neto, nodokluDala: ((izmaksas - neto) / izmaksas) * 100 };
  },
  resultado: [
    { clave: "izmaksas", etiqueta: "Darba devēja izmaksas mēnesī", formato: "moneda", destacada: true },
    { clave: "devejaVsaoi", etiqueta: "VSAOI darba devēja daļa", formato: "moneda" },
    { clave: "gada", etiqueta: "Izmaksas gadā", formato: "moneda" },
    { clave: "neto", etiqueta: "Darbinieka neto alga", formato: "moneda" },
    { clave: "nodokluDala", etiqueta: "Nodokļu un iemaksu daļa no izmaksām", formato: "porcentaje", decimales: 1 },
  ],
});
