import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.porez-na-prenos-apsolutnih-prava",
  mercado: "rs",
  concepto: "propio",
  slug: "porez-na-prenos-apsolutnih-prava",
  estado: "publicado",
  requiere: {
    "rs.prenos-apsolutnih-prava": "numero",
    "rs.prvi-stan-kupac": "numero",
    "rs.prvi-stan-clan": "numero",
  },
  campos: [
    { id: "cena", tipo: "moneda", etiqueta: "Ugovorena cena", min: 0, porDefecto: 8000000 },
    { id: "prviStan", tipo: "si-no", etiqueta: "Kupac ostvaruje pravo na oslobođenje za prvi stan", porDefecto: false },
    { id: "povrsina", tipo: "numero", etiqueta: "Površina stana u m²", min: 1, porDefecto: 60, visibleSi: { prviStan: [true] } },
    { id: "clanovi", tipo: "entero", etiqueta: "Članovi domaćinstva bez stana (bez kupca)", min: 0, max: 20, porDefecto: 0, visibleSi: { prviStan: [true] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.cena <= 0) throw new ErrorEntrada("Unesite cenu veću od nule.", "cena");
    const stopa = v["rs.prenos-apsolutnih-prava"];
    const puniPorez = redondear((e.cena * stopa) / 100);
    if (!e.prviStan) return { porez: puniPorez, puniPorez, usteda: 0, oslobodjeno: null };
    const povrsina = e.povrsina ?? 0;
    if (povrsina <= 0) throw new ErrorEntrada("Unesite površinu stana.", "povrsina");
    const oslobodjeno = Math.min(povrsina, v["rs.prvi-stan-kupac"] + (e.clanovi ?? 0) * v["rs.prvi-stan-clan"]);
    const porez = redondear((puniPorez * (povrsina - oslobodjeno)) / povrsina);
    return { porez, puniPorez, usteda: redondear(puniPorez - porez), oslobodjeno };
  },
  resultado: [
    { clave: "porez", etiqueta: "Porez za plaćanje", formato: "moneda", destacada: true },
    { clave: "puniPorez", etiqueta: "Porez bez oslobođenja", formato: "moneda" },
    { clave: "usteda", etiqueta: "Ušteda", formato: "moneda", ocultarSiCero: true },
    { clave: "oslobodjeno", etiqueta: "Oslobođeni m²", formato: "numero", decimales: 0 },
  ],
});
