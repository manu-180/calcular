import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.lahjaverolaskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "lahjaverolaskuri",
  estado: "publicado",
  requiere: {
    "fi.lahjavero-1": "escala",
    "fi.lahjavero-2": "escala",
  },
  campos: [
    { id: "lahja", tipo: "moneda", etiqueta: "Lahjan arvo", min: 0, porDefecto: 30000 },
    {
      id: "luokka",
      tipo: "opcion",
      etiqueta: "Veroluokka",
      opciones: [
        { valor: "1", etiqueta: "I: puoliso, lapsi, lapsenlapsi, vanhempi tai isovanhempi" },
        { valor: "2", etiqueta: "II: sisarus, muu sukulainen tai ystävä" },
      ],
      porDefecto: "1",
    },
    {
      id: "aiemmat",
      tipo: "moneda",
      etiqueta: "Samalta lahjoittajalta kolmen edellisen vuoden aikana saadut lahjat",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.lahja <= 0) throw new ErrorEntrada("Syötä lahjan arvo, joka on suurempi kuin nolla.", "lahja");
    const asteikko = e.luokka === "1" ? v["fi.lahjavero-1"] : v["fi.lahjavero-2"];
    const yhteensa = redondear(aplicarEscala(asteikko, e.lahja + e.aiemmat));
    const aiempi = redondear(aplicarEscala(asteikko, e.aiemmat));
    const vero = redondear(yhteensa - aiempi);
    const observaciones: string[] = [];
    if (e.aiemmat > 0) observaciones.push("Aiemmat lahjat lasketaan yhteen uuden kanssa, ja niistä maksettu vero vähennetään. Laskuri laskee molemmat nykyisellä taulukolla.");
    if (yhteensa === 0) observaciones.push(`Lahjaveroa ei makseta, kun lahjojen arvo on alle ${String(asteikko[1].desde)} euroa.`);
    return {
      vero,
      yhteensa,
      aiempi,
      prosentti: (vero / e.lahja) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Lahjavero tästä lahjasta", formato: "moneda", destacada: true },
    { clave: "yhteensa", etiqueta: "Vero kaikista lahjoista yhteensä", formato: "moneda" },
    { clave: "aiempi", etiqueta: "Aiemmista lahjoista vähennettävä vero", formato: "moneda", ocultarSiCero: true },
    { clave: "prosentti", etiqueta: "Vero lahjan arvosta", formato: "porcentaje", decimales: 2 },
  ],
});
