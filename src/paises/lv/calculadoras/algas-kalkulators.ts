import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { noBruto } from "../lib/alga";

export default definirCalculadora({
  id: "lv.algas-kalkulators",
  mercado: "lv",
  concepto: "sueldo-neto",
  slug: "algas-kalkulators",
  estado: "publicado",
  requiere: {
    "lv.vsaoi-darba-nemejs": "mapa",
    "lv.iin-alga": "numero",
    "lv.iin-gada": "escala",
    "lv.neapliekamais-minimums": "numero",
    "lv.apgadajamais": "numero",
    "lv.papildu-atvieglojums": "mapa",
    "lv.neapliekamais-pensionars": "numero",
    "lv.vsaoi-maksimums": "numero",
    "lv.solidaritate-darba-nemejs": "numero",
  },
  campos: [
    { id: "alga", tipo: "moneda", etiqueta: "Bruto alga mēnesī", min: 0, porDefecto: 1750 },
    { id: "gramatina", tipo: "si-no", etiqueta: "Algas nodokļa grāmatiņa iesniegta šajā darbavietā", porDefecto: true },
    { id: "apgadajamie", tipo: "entero", etiqueta: "Apgādājamo skaits", min: 0, max: 15, porDefecto: 0, visibleSi: { gramatina: [true] } },
    {
      id: "atvieglojums",
      tipo: "opcion",
      etiqueta: "Papildu atvieglojums",
      opciones: [
        { valor: "nav", etiqueta: "Nav" },
        { valor: "invaliditate-1-2", etiqueta: "I vai II grupas invaliditāte" },
        { valor: "invaliditate-3", etiqueta: "III grupas invaliditāte" },
        { valor: "represeta", etiqueta: "Politiski represētā persona" },
      ],
      porDefecto: "nav",
      visibleSi: { gramatina: [true] },
    },
    { id: "kategorija", tipo: "opcion-dato", dato: "lv.vsaoi-darba-nemejs", etiqueta: "VSAOI kategorija", porDefecto: "vispariga" },
  ],
  calcular(e, v, { redondear }) {
    if (e.alga <= 0) throw new ErrorEntrada("Ievadiet bruto algu, kas lielāka par nulli.", "alga");
    const a = noBruto(
      {
        darbaNemejs: v["lv.vsaoi-darba-nemejs"],
        iinAlga: v["lv.iin-alga"],
        iinGada: v["lv.iin-gada"],
        minimums: v["lv.neapliekamais-minimums"],
        apgadajamais: v["lv.apgadajamais"],
        papildu: v["lv.papildu-atvieglojums"],
      },
      { kategorija: e.kategorija, gramatina: e.gramatina, apgadajamie: e.apgadajamie ?? 0, atvieglojums: e.atvieglojums ?? "nav" },
      e.alga,
    );
    const vsaoi = redondear(a.vsaoi);
    const iin = redondear(a.iin);
    const iinGadaPiemaksa = redondear(a.iinGadaPiemaksa);
    return {
      neto: redondear(e.alga - vsaoi - iin - iinGadaPiemaksa),
      vsaoi,
      iin,
      iinGadaPiemaksa,
      minimums: a.minimums,
      atvieglojumi: a.atvieglojumi,
      observaciones: iinGadaPiemaksa > 0 ? ["Darba devējs ietur vienu likmi. Nodokli par gada ienākuma daļu virs sliekšņa nomaksā ar gada ienākumu deklarāciju, un šeit tas parādīts mēneša vidējā apmērā."] : [],
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto alga (uz rokas)", formato: "moneda", destacada: true },
    { clave: "vsaoi", etiqueta: "VSAOI darba ņēmēja daļa", formato: "moneda" },
    { clave: "iin", etiqueta: "Iedzīvotāju ienākuma nodoklis", formato: "moneda" },
    { clave: "iinGadaPiemaksa", etiqueta: "IIN piemaksa gada deklarācijā (mēneša vidējais)", formato: "moneda", ocultarSiCero: true },
    { clave: "minimums", etiqueta: "Piemērotais neapliekamais minimums", formato: "moneda", ocultarSiCero: true },
    { clave: "atvieglojumi", etiqueta: "Piemērotie atvieglojumi", formato: "moneda", ocultarSiCero: true },
  ],
  mundo: { bruto: "alga", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
});
