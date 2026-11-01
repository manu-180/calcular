import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.neapliekamais-minimums",
  mercado: "lv",
  concepto: "propio",
  slug: "neapliekamais-minimums",
  estado: "publicado",
  requiere: {
    "lv.neapliekamais-minimums": "numero",
    "lv.neapliekamais-pensionars": "numero",
    "lv.apgadajamais": "numero",
    "lv.papildu-atvieglojums": "mapa",
    "lv.iin-alga": "numero",
  },
  campos: [
    {
      id: "statuss",
      tipo: "opcion",
      etiqueta: "Ienākuma veids",
      opciones: [
        { valor: "alga", etiqueta: "Darba alga" },
        { valor: "pensija", etiqueta: "Pensija" },
      ],
      porDefecto: "alga",
    },
    { id: "apgadajamie", tipo: "entero", etiqueta: "Apgādājamo skaits", min: 0, max: 15, porDefecto: 0 },
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
    },
  ],
  calcular(e, v, { redondear }) {
    const minimums = e.statuss === "pensija" ? v["lv.neapliekamais-pensionars"] : v["lv.neapliekamais-minimums"];
    const apgadajamie = e.apgadajamie * v["lv.apgadajamais"];
    const papildu = e.atvieglojums === "nav" ? 0 : enMapa(v["lv.papildu-atvieglojums"], e.atvieglojums);
    const menesi = minimums + apgadajamie + papildu;
    return { menesi, gada: menesi * 12, minimums, apgadajamie, papildu, ietaupijums: redondear(porcentaje(menesi, v["lv.iin-alga"])) };
  },
  resultado: [
    { clave: "menesi", etiqueta: "Neapliekamā summa mēnesī", formato: "moneda", destacada: true },
    { clave: "gada", etiqueta: "Neapliekamā summa gadā", formato: "moneda" },
    { clave: "minimums", etiqueta: "Neapliekamais minimums", formato: "moneda" },
    { clave: "apgadajamie", etiqueta: "Atvieglojums par apgādājamiem", formato: "moneda", ocultarSiCero: true },
    { clave: "papildu", etiqueta: "Papildu atvieglojums", formato: "moneda", ocultarSiCero: true },
    { clave: "ietaupijums", etiqueta: "Lielākais nodokļa ietaupījums mēnesī", formato: "moneda" },
  ],
});
