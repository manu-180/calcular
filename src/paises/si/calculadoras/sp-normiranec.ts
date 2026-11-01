import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { osnovaSp, prispevkiSp } from "../lib/sp";

export default definirCalculadora({
  id: "si.sp-normiranec",
  mercado: "si",
  concepto: "regimen-simplificado",
  slug: "sp-normiranec",
  estado: "publicado",
  requiere: {
    "si.normirani-odhodki-polni": "escala",
    "si.normirani-odhodki-popoldan": "escala",
    "si.dohodnina-normiranci-polni": "escala",
    "si.dohodnina-normiranci-popoldan": "escala",
    "si.normiranci-limiti": "mapa",
    "si.prispevki-sp": "mapa",
    "si.pavsalni-prispevki": "mapa",
    "si.ozp": "numero",
    "si.najnizja-osnova": "numero",
    "si.najvisja-osnova-sp": "numero",
    "si.znizanje-osnove-sp": "numero",
  },
  campos: [
    { id: "prihodki", tipo: "moneda", etiqueta: "Letni prihodki iz dejavnosti", min: 0, porDefecto: 40000 },
    {
      id: "vrsta",
      tipo: "opcion",
      etiqueta: "Vrsta zavarovanja",
      opciones: [
        { valor: "polni", etiqueta: "Polna samozaposlitev, vsaj devet mesecev v letu" },
        { valor: "popoldan", etiqueta: "Popoldanski s.p. (zavarovani ste drugje)" },
      ],
      porDefecto: "polni",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prihodki <= 0) throw new ErrorEntrada("Vnesite prihodke, večje od nič.", "prihodki");
    const polni = e.vrsta === "polni";
    const odhodki = redondear(aplicarEscalaMarginal(polni ? v["si.normirani-odhodki-polni"] : v["si.normirani-odhodki-popoldan"], e.prihodki));
    const osnova = redondear(e.prihodki - odhodki);
    const dohodnina = redondear(aplicarEscalaMarginal(polni ? v["si.dohodnina-normiranci-polni"] : v["si.dohodnina-normiranci-popoldan"], osnova));
    const m = v["si.pavsalni-prispevki"];
    const mesecni = polni
      ? prispevkiSp(osnovaSp(osnova, v["si.znizanje-osnove-sp"], v["si.najnizja-osnova"], v["si.najvisja-osnova-sp"]), v["si.prispevki-sp"], v["si.ozp"], redondear).skupaj
      : redondear(enMapa(m, "zz") + enMapa(m, "pd") + enMapa(m, "do"));
    const prispevki = redondear(mesecni * 12);
    const opombe: string[] = [];
    const limit = enMapa(v["si.normiranci-limiti"], polni ? "polni" : "popoldan");
    if (e.prihodki > limit) opombe.push("Prihodki so nad mejo za vstop v sistem. Pomembno je povprečje prihodkov dveh prejšnjih let.");
    if (!polni) opombe.push("Pri popoldanskem s.p. so upoštevani samo pavšalni prispevki za zdravstvo in dolgotrajno oskrbo iz preglednice FURS.");
    return {
      ostane: redondear(e.prihodki - dohodnina - prispevki),
      odhodki,
      osnova,
      dohodnina,
      mesecni,
      prispevki,
      observaciones: opombe,
    };
  },
  resultado: [
    { clave: "ostane", etiqueta: "Ostane po dohodnini in prispevkih", formato: "moneda", destacada: true },
    { clave: "odhodki", etiqueta: "Normirani odhodki", formato: "moneda" },
    { clave: "osnova", etiqueta: "Davčna osnova", formato: "moneda" },
    { clave: "dohodnina", etiqueta: "Dohodnina", formato: "moneda" },
    { clave: "mesecni", etiqueta: "Prispevki na mesec", formato: "moneda" },
    { clave: "prispevki", etiqueta: "Prispevki na leto", formato: "moneda" },
  ],
});
