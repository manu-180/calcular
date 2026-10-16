import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "ma.conges-payes",
  mercado: "ma",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "ma.conges-payes": "mapa",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service sur la période de référence", min: 0, max: 12, porDefecto: 12 },
    { id: "anciennete", tipo: "entero", etiqueta: "Années de service dans l'entreprise", min: 0, max: 60, porDefecto: 3 },
    { id: "mineur", tipo: "si-no", etiqueta: "Vous avez moins de 18 ans", porDefecto: false },
  ],
  calcular(entrada, v) {
    const c = v["ma.conges-payes"];
    const observaciones: string[] = [];
    if (entrada.anciennete === 0 && entrada.mois < 6) {
      observaciones.push("Le droit au congé annuel payé s'ouvre après six mois de service continu dans la même entreprise.");
      return { jours: 0, base: 0, majoration: 0, observaciones };
    }
    const base = entrada.mois * (entrada.mineur ? c["par-mois-moins-de-18-ans"] : c["par-mois"]);
    const majoration = Math.floor(entrada.anciennete / 5) * c["par-tranche-de-5-ans"];
    const jours = Math.min(base + majoration, Math.max(base, c.maximum));
    if (base + majoration > jours) observaciones.push("La majoration pour ancienneté ne peut pas porter le congé au-delà du maximum légal.");
    return { jours, base, majoration: jours - base, observaciones };
  },
  resultado: [
    { clave: "jours", etiqueta: "Jours de congé payé", formato: "dias", destacada: true, decimales: 1 },
    { clave: "base", etiqueta: "Jours acquis par les mois de service", formato: "dias", decimales: 1 },
    { clave: "majoration", etiqueta: "Jours supplémentaires pour ancienneté", formato: "dias", decimales: 1, ocultarSiCero: true },
  ],
});
