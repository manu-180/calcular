import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.ijtimoiy-soliq-kalkulyatori",
  mercado: "uz",
  concepto: "costo-empleador",
  slug: "ijtimoiy-soliq-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.ijtimoiy-soliq": "mapa",
    "uz.jshds": "mapa",
  },
  campos: [
    { id: "fond", tipo: "moneda", etiqueta: "Bir oylik ish haqi (bitta xodim yoki butun fond)", min: 0, porDefecto: 6000000 },
    { id: "xodimlar", tipo: "entero", etiqueta: "Xodimlar soni (agar yuqorida bitta xodim maoshi boʻlsa)", min: 1, max: 100000, porDefecto: 1 },
    { id: "tashkilot", tipo: "opcion-dato", dato: "uz.ijtimoiy-soliq", etiqueta: "Soliq toʻlovchi", porDefecto: "umumiy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.fond <= 0) throw new ErrorEntrada("Ish haqi summasini kiriting.", "fond");
    const stavka = enMapa(v["uz.ijtimoiy-soliq"], e.tashkilot);
    const fond = e.fond * e.xodimlar;
    const ijtimoiy = redondear(porcentaje(fond, stavka));
    const jshds = redondear(porcentaje(fond, enMapa(v["uz.jshds"], "rezident-mehnat")));
    return {
      ijtimoiy,
      stavka,
      jamiOylik: fond + ijtimoiy,
      jamiYillik: (fond + ijtimoiy) * 12,
      jshds,
      qolga: fond - jshds,
    };
  },
  resultado: [
    { clave: "ijtimoiy", etiqueta: "Oylik ijtimoiy soliq", formato: "moneda", decimales: 0, destacada: true },
    { clave: "stavka", etiqueta: "Stavka", formato: "porcentaje" },
    { clave: "jamiOylik", etiqueta: "Ish haqi va ijtimoiy soliq, bir oyda", formato: "moneda", decimales: 0 },
    { clave: "jamiYillik", etiqueta: "Bir yildagi jami xarajat", formato: "moneda", decimales: 0 },
    { clave: "jshds", etiqueta: "Xodimlardan ushlanadigan daromad soligʻi", formato: "moneda", decimales: 0 },
    { clave: "qolga", etiqueta: "Xodimlarning qoʻliga tegadigan jami summa", formato: "moneda", decimales: 0 },
  ],
});
