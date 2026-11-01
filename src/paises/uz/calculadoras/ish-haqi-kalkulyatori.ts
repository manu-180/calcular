import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.ish-haqi-kalkulyatori",
  mercado: "uz",
  concepto: "sueldo-neto",
  slug: "ish-haqi-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.jshds": "mapa",
    "uz.ijtimoiy-soliq": "mapa",
    "uz.mhtekm": "numero",
  },
  campos: [
    { id: "maosh", tipo: "moneda", etiqueta: "Oylik yalpi ish haqi (soliqlar ushlanmasdan oldin)", min: 0, porDefecto: 6000000 },
    {
      id: "rezident",
      tipo: "opcion",
      etiqueta: "Soliq maqomingiz",
      opciones: [
        { valor: "rezident", etiqueta: "Oʻzbekiston rezidenti" },
        { valor: "norezident", etiqueta: "Norezident" },
      ],
      porDefecto: "rezident",
      ayuda: "Rezident: ketma-ket oʻn ikki oy ichida Oʻzbekistonda 183 kundan koʻproq boʻlgan shaxs.",
    },
    { id: "tashkilot", tipo: "opcion-dato", dato: "uz.ijtimoiy-soliq", etiqueta: "Ish beruvchingiz", porDefecto: "umumiy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.maosh <= 0) throw new ErrorEntrada("Ish haqi summasini kiriting.", "maosh");
    const stavka = enMapa(v["uz.jshds"], e.rezident === "rezident" ? "rezident-mehnat" : "norezident-mehnat");
    const soliq = redondear(porcentaje(e.maosh, stavka));
    const sof = e.maosh - soliq;
    const ijtimoiyStavka = enMapa(v["uz.ijtimoiy-soliq"], e.tashkilot);
    const ijtimoiy = redondear(porcentaje(e.maosh, ijtimoiyStavka));
    const observaciones: string[] = [];
    if (e.maosh < v["uz.mhtekm"]) {
      observaciones.push("Kiritilgan summa mehnatga haq toʻlashning eng kam miqdoridan past. Toʻliq ish vaqtida ishlasangiz, maosh undan kam boʻlishi mumkin emas.");
    }
    observaciones.push("INPS (shaxsiy jamgʻarib boriladigan pensiya hisobvaragʻi) badali alohida ushlanmaydi: u daromad soligʻi summasining ichidan oʻtkaziladi.");
    return {
      sof,
      soliq,
      stavka,
      yillikSof: sof * 12,
      ijtimoiy,
      jamiXarajat: e.maosh + ijtimoiy,
      observaciones,
    };
  },
  resultado: [
    { clave: "sof", etiqueta: "Qoʻlingizga tegadigan oylik", formato: "moneda", decimales: 0, destacada: true },
    { clave: "soliq", etiqueta: "Daromad soligʻi (JShDS)", formato: "moneda", decimales: 0 },
    { clave: "stavka", etiqueta: "Soliq stavkasi", formato: "porcentaje" },
    { clave: "yillikSof", etiqueta: "Bir yilda qoʻlga tegadigan summa", formato: "moneda", decimales: 0 },
    { clave: "ijtimoiy", etiqueta: "Ish beruvchi toʻlaydigan ijtimoiy soliq", formato: "moneda", decimales: 0 },
    { clave: "jamiXarajat", etiqueta: "Ish beruvchining jami xarajati", formato: "moneda", decimales: 0 },
  ],
  mundo: { bruto: "maosh", periodoBruto: "mes", neto: "sof", periodoNeto: "mes", entrada: { rezident: "rezident", tashkilot: "umumiy" } },
});
