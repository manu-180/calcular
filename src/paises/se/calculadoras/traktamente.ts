import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.traktamente",
  mercado: "se",
  concepto: "propio",
  slug: "traktamente",
  estado: "publicado",
  requiere: {
    "se.traktamente": "mapa",
    "se.traktamente-minskning": "mapa",
  },
  campos: [
    {
      id: "fas",
      tipo: "opcion",
      etiqueta: "Hur länge har tjänsteresan pågått på samma ort?",
      opciones: [
        { valor: "heldag", etiqueta: "De första tre månaderna" },
        { valor: "efter3", etiqueta: "Efter tre månader" },
        { valor: "efter2", etiqueta: "Efter två år" },
      ],
      porDefecto: "heldag",
    },
    { id: "heldagar", tipo: "entero", etiqueta: "Hela dagar", min: 0, max: 400, porDefecto: 3, ayuda: "Avresa före klockan 12, hemkomst efter klockan 19 och alla dagar däremellan." },
    { id: "halvdagar", tipo: "entero", etiqueta: "Halva dagar", min: 0, max: 2, porDefecto: 0, visibleSi: { fas: ["heldag"] }, ayuda: "Avresa klockan 12 eller senare, eller hemkomst klockan 19 eller tidigare." },
    { id: "natter", tipo: "entero", etiqueta: "Nätter utan logi som arbetsgivaren betalat", min: 0, max: 400, porDefecto: 0 },
    { id: "frukost", tipo: "entero", etiqueta: "Hela dagar med fri frukost", min: 0, max: 400, porDefecto: 0 },
    { id: "enMaltid", tipo: "entero", etiqueta: "Hela dagar med fri lunch eller middag", min: 0, max: 400, porDefecto: 0 },
    { id: "tvaMaltider", tipo: "entero", etiqueta: "Hela dagar med fri lunch och middag", min: 0, max: 400, porDefecto: 0 },
    { id: "allMat", tipo: "entero", etiqueta: "Hela dagar med all mat betald", min: 0, max: 400, porDefecto: 0 },
  ],
  calcular(e, v) {
    const t = v["se.traktamente"];
    const m = v["se.traktamente-minskning"];
    const halv = e.fas === "heldag" ? (e.halvdagar ?? 0) : 0;
    if (e.heldagar + halv + e.natter <= 0) throw new ErrorEntrada("Skriv hur många dagar resan varade.", "heldagar");
    if (e.frukost + e.enMaltid + e.tvaMaltider + e.allMat > e.heldagar) {
      throw new ErrorEntrada("Dagarna med fria måltider kan inte vara fler än de hela dagarna.", "frukost");
    }
    const perDag = enMapa(t, e.fas);
    const dagar = e.heldagar * perDag + halv * enMapa(t, "halvdag");
    const natt = e.natter * enMapa(t, "natt");
    const minskning =
      e.frukost * enMapa(m, `${e.fas}-frukost`) +
      e.enMaltid * enMapa(m, `${e.fas}-lunch`) +
      e.tvaMaltider * enMapa(m, `${e.fas}-lunchmiddag`) +
      e.allMat * enMapa(m, `${e.fas}-allt`);
    return {
      totalt: dagar + natt - minskning,
      dagar,
      natt,
      minskning,
      perDag,
      observaciones: ["Traktamentet är skattefritt upp till de här beloppen om du övernattar och reser mer än 50 kilometer från både arbetsplatsen och bostaden."],
    };
  },
  resultado: [
    { clave: "totalt", etiqueta: "Skattefritt traktamente", formato: "moneda", decimales: 0, destacada: true },
    { clave: "dagar", etiqueta: "Traktamente för dagarna", formato: "moneda", decimales: 0 },
    { clave: "natt", etiqueta: "Nattraktamente", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "minskning", etiqueta: "Minskning för fria måltider", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "perDag", etiqueta: "Belopp per hel dag", formato: "moneda", decimales: 0 },
  ],
});
