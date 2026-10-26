import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.su-beregner",
  mercado: "dk",
  concepto: "propio",
  slug: "su-beregner",
  estado: "publicado",
  redondeo: { decimales: 0, modo: "mitad-arriba" },
  requiere: {
    "dk.su-udeboende": "numero",
    "dk.su-hjemmeboende": "mapa",
    "dk.su-foraeldreindkomst": "mapa",
  },
  campos: [
    {
      id: "bolig",
      tipo: "opcion",
      etiqueta: "Hvor bor du?",
      opciones: [
        { valor: "udeboende", etiqueta: "Udeboende (ikke hos mine forældre)" },
        { valor: "hjemmeboende", etiqueta: "Hjemmeboende (hos mine forældre)" },
      ],
      porDefecto: "udeboende",
    },
    {
      id: "foraeldre",
      tipo: "moneda",
      etiqueta: "Dine forældres samlede indkomst for to år siden",
      ayuda: "SU-styrelsen bruger forældrenes indkomstgrundlag fra to år før. For SU i 2026 er det 2024.",
      min: 0,
      porDefecto: 600000,
      visibleSi: { bolig: ["hjemmeboende"] },
    },
    { id: "soeskende", tipo: "entero", etiqueta: "Søskende under 18 år", min: 0, max: 10, porDefecto: 0, visibleSi: { bolig: ["hjemmeboende"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.bolig === "udeboende") {
      const su = v["dk.su-udeboende"];
      return { maaned: su, aar: su * 12, grundsats: null, tillaeg: null, grundlag: null };
    }
    const h = v["dk.su-hjemmeboende"];
    const f = v["dk.su-foraeldreindkomst"];
    const grundsats = enMapa(h, "grundsats");
    const hoejst = enMapa(h, "hoejst");
    const fuldt = enMapa(f, "fuldt-tillaeg");
    const intet = enMapa(f, "intet-tillaeg");
    const grundlag = Math.max(0, (e.foraeldre ?? 0) - (e.soeskende ?? 0) * enMapa(f, "soeskendefradrag"));
    // Tillægget falder lineært fra fuldt tillæg til intet tillæg (su.dk's tabel).
    let maaned: number;
    if (grundlag <= fuldt) maaned = hoejst;
    else if (grundlag >= intet) maaned = grundsats;
    else maaned = redondear(grundsats + ((hoejst - grundsats) * (intet - grundlag)) / (intet - fuldt));
    return { maaned, aar: maaned * 12, grundsats, tillaeg: maaned - grundsats, grundlag };
  },
  resultado: [
    { clave: "maaned", etiqueta: "SU pr. måned før skat", formato: "moneda", destacada: true },
    { clave: "aar", etiqueta: "SU pr. år før skat", formato: "moneda" },
    { clave: "grundsats", etiqueta: "Grundsats", formato: "moneda" },
    { clave: "tillaeg", etiqueta: "Tillæg efter forældrenes indkomst", formato: "moneda" },
    { clave: "grundlag", etiqueta: "Forældrenes indkomst efter søskendefradrag", formato: "moneda" },
  ],
});
