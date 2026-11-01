import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.kotitalousvahennys-laskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "kotitalousvahennys-laskuri",
  estado: "publicado",
  requiere: {
    "fi.kotitalousvahennys": "mapa",
    "fi.kotitalousvahennys-prosentit": "mapa",
  },
  campos: [
    {
      id: "tapa",
      tipo: "opcion",
      etiqueta: "Miten työ teetetään",
      opciones: [
        { valor: "yritys", etiqueta: "Ostan työn yritykseltä" },
        { valor: "palkka", etiqueta: "Palkkaan työntekijän itse" },
      ],
      porDefecto: "yritys",
    },
    { id: "tyo", tipo: "moneda", etiqueta: "Työn osuus laskusta (sis. alv)", min: 0, porDefecto: 2000, visibleSi: { tapa: ["yritys"] } },
    { id: "palkka", tipo: "moneda", etiqueta: "Maksamasi palkka", min: 0, porDefecto: 2000, visibleSi: { tapa: ["palkka"] } },
    { id: "sivukulut", tipo: "moneda", etiqueta: "Maksamasi työnantajan sivukulut", min: 0, porDefecto: 0, visibleSi: { tapa: ["palkka"] } },
    { id: "puoliso", tipo: "si-no", etiqueta: "Puoliso voi käyttää enimmäismäärän ylittävän osan", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const eur = v["fi.kotitalousvahennys"];
    const pros = v["fi.kotitalousvahennys-prosentit"];
    const peruste =
      e.tapa === "yritys" ? ((e.tyo ?? 0) * enMapa(pros, "yritys")) / 100 : ((e.palkka ?? 0) * enMapa(pros, "palkka")) / 100 + (e.sivukulut ?? 0);
    if (peruste <= 0) throw new ErrorEntrada("Syötä työn osuus tai palkka, joka on suurempi kuin nolla.", e.tapa === "yritys" ? "tyo" : "palkka");
    const omavastuu = enMapa(eur, "omavastuu");
    const enimmais = enMapa(eur, "enimmais");
    const ennenRajaa = Math.max(0, peruste - omavastuu);
    const sinulle = Math.min(enimmais, ennenRajaa);
    const yli = ennenRajaa - sinulle;
    const puolisolle = e.puoliso ? Math.min(enimmais, Math.max(0, yli - omavastuu)) : 0;
    const observaciones: string[] = [];
    if (yli > 0 && !e.puoliso) observaciones.push("Vähennys ylittää enimmäismäärän. Jos sinulla on puoliso, Verohallinto siirtää ylittävän osan hänen verotukseensa.");
    return {
      vahennys: redondear(sinulle + puolisolle),
      sinulle: redondear(sinulle),
      puolisolle: redondear(puolisolle),
      peruste: redondear(peruste),
      observaciones,
    };
  },
  resultado: [
    { clave: "vahennys", etiqueta: "Kotitalousvähennys yhteensä", formato: "moneda", destacada: true },
    { clave: "sinulle", etiqueta: "Sinun vähennyksesi", formato: "moneda" },
    { clave: "puolisolle", etiqueta: "Puolison vähennys", formato: "moneda", ocultarSiCero: true },
    { clave: "peruste", etiqueta: "Vähennyskelpoinen osuus ennen omavastuuta", formato: "moneda" },
  ],
});
