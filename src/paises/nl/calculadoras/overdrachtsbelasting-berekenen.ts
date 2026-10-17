import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { euro } from "../lib/belasting";

export default definirCalculadora({
  id: "nl.overdrachtsbelasting-berekenen",
  mercado: "nl",
  concepto: "propio",
  slug: "overdrachtsbelasting-berekenen",
  estado: "publicado",
  requiere: {
    "nl.overdrachtsbelasting": "mapa",
    "nl.startersvrijstelling-grens": "numero",
    "nl.startersvrijstelling-leeftijd": "numero",
  },
  campos: [
    { id: "koopsom", tipo: "moneda", etiqueta: "Koopsom (waarde in het economisch verkeer)", min: 0, porDefecto: 450000 },
    { id: "soort", tipo: "opcion-dato", dato: "nl.overdrachtsbelasting", etiqueta: "Wat koop je?", porDefecto: "eigen-woning" },
    { id: "leeftijd", tipo: "entero", etiqueta: "Je leeftijd op de dag van de overdracht bij de notaris", min: 0, max: 120, porDefecto: 30 },
    { id: "eerderGebruikt", tipo: "si-no", etiqueta: "Je hebt de startersvrijstelling al eens gebruikt", porDefecto: false },
    { id: "aandeel", tipo: "porcentaje", etiqueta: "Jouw aandeel in de woning", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.koopsom <= 0) throw new ErrorEntrada("Vul de koopsom in.", "koopsom");
    const grens = v["nl.startersvrijstelling-grens"];
    const maxLeeftijd = v["nl.startersvrijstelling-leeftijd"];
    const observaciones: string[] = [];
    let tarief = enMapa(v["nl.overdrachtsbelasting"], entrada.soort);
    let starter = false;
    if (entrada.soort === "eigen-woning") {
      const jongGenoeg = entrada.leeftijd >= 18 && entrada.leeftijd < maxLeeftijd;
      if (jongGenoeg && !entrada.eerderGebruikt && entrada.koopsom <= grens) {
        tarief = 0;
        starter = true;
        observaciones.push("Je voldoet aan de voorwaarden voor de startersvrijstelling, dus je betaalt geen overdrachtsbelasting. Je mag ook kiezen voor het tarief van 2%, dan bewaar je de vrijstelling voor later.");
      } else if (jongGenoeg && !entrada.eerderGebruikt) {
        observaciones.push(`De woning kost meer dan ${euro(grens)}, daarom geldt de startersvrijstelling niet. De grens gaat over de hele woning, ook als je die samen koopt.`);
      }
    }
    const grondslag = porcentaje(entrada.koopsom, entrada.aandeel);
    const belasting = redondear(porcentaje(grondslag, tarief));
    return { belasting, tarief, grondslag: redondear(grondslag), starter: starter ? "Ja" : "Nee", observaciones };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Overdrachtsbelasting", formato: "moneda", destacada: true },
    { clave: "tarief", etiqueta: "Tarief", formato: "porcentaje", decimales: 1 },
    { clave: "grondslag", etiqueta: "Waarover je belasting betaalt (jouw deel)", formato: "moneda" },
    { clave: "starter", etiqueta: "Startersvrijstelling", formato: "texto" },
  ],
});
