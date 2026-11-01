import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.sof-ish-haqi-hisoblash",
  mercado: "uz",
  concepto: "propio",
  slug: "sof-ish-haqi-hisoblash",
  estado: "publicado",
  requiere: {
    "uz.jshds": "mapa",
    "uz.ijtimoiy-soliq": "mapa",
  },
  campos: [
    { id: "sof", tipo: "moneda", etiqueta: "Qoʻlga tegishi kerak boʻlgan oylik summa", min: 0, porDefecto: 5000000 },
    { id: "tashkilot", tipo: "opcion-dato", dato: "uz.ijtimoiy-soliq", etiqueta: "Ish beruvchi", porDefecto: "umumiy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.sof <= 0) throw new ErrorEntrada("Qoʻlga tegadigan summani kiriting.", "sof");
    const stavka = enMapa(v["uz.jshds"], "rezident-mehnat");
    const sof = redondear(e.sof);
    // Se busca el bruto entero más chico cuyo neto (bruto menos el impuesto redondeado) llega al pedido.
    let yalpi = Math.ceil(sof / (1 - stavka / 100));
    while (yalpi - redondear(porcentaje(yalpi, stavka)) < sof) yalpi++;
    while (yalpi > 1 && yalpi - 1 - redondear(porcentaje(yalpi - 1, stavka)) >= sof) yalpi--;
    const soliq = redondear(porcentaje(yalpi, stavka));
    const ijtimoiy = redondear(porcentaje(yalpi, enMapa(v["uz.ijtimoiy-soliq"], e.tashkilot)));
    return { yalpi, soliq, olinadi: yalpi - soliq, ijtimoiy, jamiXarajat: yalpi + ijtimoiy };
  },
  resultado: [
    { clave: "yalpi", etiqueta: "Shartnomaga yoziladigan yalpi maosh", formato: "moneda", decimales: 0, destacada: true },
    { clave: "soliq", etiqueta: "Ushlanadigan daromad soligʻi", formato: "moneda", decimales: 0 },
    { clave: "olinadi", etiqueta: "Qoʻlga tegadigan summa", formato: "moneda", decimales: 0 },
    { clave: "ijtimoiy", etiqueta: "Ish beruvchining ijtimoiy soligʻi", formato: "moneda", decimales: 0 },
    { clave: "jamiXarajat", etiqueta: "Ish beruvchining jami xarajati", formato: "moneda", decimales: 0 },
  ],
});
