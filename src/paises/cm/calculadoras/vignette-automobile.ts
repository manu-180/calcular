import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.vignette-automobile",
  mercado: "cm",
  concepto: "propio",
  slug: "vignette-automobile",
  estado: "publicado",
  requiere: { "cm.timbre-automobile": "mapa" },
  campos: [
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Type de véhicule",
      opciones: [
        { valor: "autre", etiqueta: "Voiture particulière ou autre véhicule" },
        { valor: "transport", etiqueta: "Transport public de personnes ou de marchandises (avec licence)" },
        { valor: "moto-2-roues", etiqueta: "Motocyclette à deux roues" },
        { valor: "moto-3-roues", etiqueta: "Motocyclette à trois roues" },
      ],
      porDefecto: "autre",
    },
    { id: "cv", tipo: "entero", etiqueta: "Puissance fiscale (CV)", min: 0, max: 100, porDefecto: 8, ayuda: "Elle figure sur la carte grise." },
  ],
  calcular(entrada, v) {
    const moto = entrada.type === "moto-2-roues" || entrada.type === "moto-3-roues";
    // Article 598 quinquies : une moto de 2 CV ou plus paie le tarif des véhicules.
    if (moto && entrada.cv < 2) return { droit: enMapa(v["cm.timbre-automobile"], entrada.type) };
    if (entrada.cv < 2) throw new ErrorEntrada("Le barème commence à 2 CV.", "cv");
    const groupe = entrada.type === "transport" ? "transport" : "autre";
    const tranche = entrada.cv <= 7 ? "2-7" : entrada.cv <= 13 ? "8-13" : entrada.cv <= 20 ? "14-20" : "21";
    return { droit: enMapa(v["cm.timbre-automobile"], `${groupe}-${tranche}`) };
  },
  resultado: [{ clave: "droit", etiqueta: "Droit de timbre automobile de l'année", formato: "moneda", destacada: true }],
});
