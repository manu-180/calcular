import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.pausalni-obrt",
  mercado: "hr",
  concepto: "regimen-simplificado",
  slug: "pausalni-obrt",
  estado: "publicado",
  requiere: {
    "hr.pausal-ljestvica": "escala",
    "hr.pausal-limit": "numero",
    "hr.pausal-stopa": "numero",
    "hr.pausal-doprinosi": "mapa",
    "hr.pausal-doprinosi-uz-rad": "mapa",
    "hr.osnovice-samostalni": "mapa",
  },
  campos: [
    { id: "primici", tipo: "moneda", etiqueta: "Godišnji primici obrta", min: 0, porDefecto: 30000 },
    { id: "drugaOsnova", tipo: "si-no", etiqueta: "Osigurani ste po drugoj osnovi", ayuda: "Na primjer, uz obrt ste u radnom odnosu. Tada se doprinosi plaćaju jednom godišnje, po nižim stopama.", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.primici <= 0) throw new ErrorEntrada("Unesite primitke veće od nule.", "primici");
    if (e.primici > v["hr.pausal-limit"]) throw new ErrorEntrada("Iznad 60.000 eura godišnje obrt se više ne može oporezivati paušalno.", "primici");
    const red = v["hr.pausal-ljestvica"].find((r) => r.hasta === null || e.primici <= r.hasta);
    if (!red) throw new ErrorEntrada({ codigo: "calculo-fallido" });
    const dohodak = red.cuotaFija ?? 0;
    const porez = redondear((dohodak * v["hr.pausal-stopa"]) / 100);
    const pm = v["hr.pausal-doprinosi"];
    const uz = v["hr.pausal-doprinosi-uz-rad"];
    const doprinosi = e.drugaOsnova
      ? redondear(redondear((dohodak * (uz["mio-i"] ?? 0)) / 100) + redondear((dohodak * (uz["mio-ii"] ?? 0)) / 100) + redondear((dohodak * (uz["zdravstveno"] ?? 0)) / 100))
      : redondear(((pm["mio-i"] ?? 0) + (pm["mio-ii"] ?? 0) + (pm["zdravstveno"] ?? 0)) * 12);
    return {
      ostaje: redondear(e.primici - porez - doprinosi),
      dohodak,
      porez,
      tromjesecno: redondear(porez / 4),
      doprinosi,
    };
  },
  resultado: [
    { clave: "ostaje", etiqueta: "Ostaje prije troškova poslovanja", formato: "moneda", destacada: true },
    { clave: "dohodak", etiqueta: "Godišnji paušalni dohodak", formato: "moneda" },
    { clave: "porez", etiqueta: "Godišnji paušalni porez", formato: "moneda" },
    { clave: "tromjesecno", etiqueta: "Porez po tromjesečju", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Doprinosi za godinu", formato: "moneda" },
  ],
});
