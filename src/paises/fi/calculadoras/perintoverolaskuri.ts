import { aplicarEscala, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.perintoverolaskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "perintoverolaskuri",
  estado: "publicado",
  requiere: {
    "fi.perintovero-1": "escala",
    "fi.perintovero-2": "escala",
  },
  campos: [
    { id: "osuus", tipo: "moneda", etiqueta: "Perintöosuutesi arvo", min: 0, porDefecto: 50000 },
    {
      id: "luokka",
      tipo: "opcion",
      etiqueta: "Veroluokka",
      opciones: [
        { valor: "1", etiqueta: "I: puoliso, lapsi, lapsenlapsi, vanhempi tai isovanhempi" },
        { valor: "2", etiqueta: "II: sisarus, muu sukulainen tai muu henkilö" },
      ],
      porDefecto: "1",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.osuus <= 0) throw new ErrorEntrada("Syötä perintöosuuden arvo, joka on suurempi kuin nolla.", "osuus");
    const asteikko = e.luokka === "1" ? v["fi.perintovero-1"] : v["fi.perintovero-2"];
    const vero = redondear(aplicarEscala(asteikko, e.osuus));
    const observaciones: string[] = [];
    if (vero === 0) observaciones.push(`Perintöveroa ei makseta, kun perintöosuus on alle ${String(asteikko[1].desde)} euroa.`);
    return {
      vero,
      jaljelle: redondear(e.osuus - vero),
      prosentti: (vero / e.osuus) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Perintövero", formato: "moneda", destacada: true },
    { clave: "jaljelle", etiqueta: "Perintöä jää veron jälkeen", formato: "moneda" },
    { clave: "prosentti", etiqueta: "Vero perintöosuudesta", formato: "porcentaje", decimales: 2 },
  ],
});
