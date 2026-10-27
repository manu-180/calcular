import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bf.conges-payes",
  mercado: "bf",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: {
    "bf.conges-jours-par-mois": "numero",
    "bf.conges-anciennete": "mapa",
    "bf.conges-par-enfant": "numero",
    "bf.conges-age-mere": "numero",
  },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service effectif depuis le dernier congé", min: 1, max: 36, porDefecto: 12 },
    { id: "annees", tipo: "entero", etiqueta: "Années de services dans l'entreprise", min: 0, max: 60, porDefecto: 3 },
    { id: "jeuneMere", tipo: "si-no", etiqueta: "Salariée ou apprentie de moins de 22 ans avec enfants à charge", porDefecto: false },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 1, visibleSi: { jeuneMere: [true] } },
  ],
  calcular(entrada, v) {
    if (entrada.mois <= 0) throw new ErrorEntrada("Indiquez au moins un mois de service.", "mois");
    const principal = entrada.mois * v["bf.conges-jours-par-mois"];
    let anciennete = 0;
    for (const [seuil, jours] of Object.entries(v["bf.conges-anciennete"])) if (entrada.annees >= Number(seuil)) anciennete = Math.max(anciennete, jours);
    const enfants = entrada.jeuneMere ? (entrada.enfants ?? 0) * v["bf.conges-par-enfant"] : 0;
    return {
      total: principal + anciennete + enfants,
      principal,
      anciennete,
      enfants,
      observaciones:
        entrada.mois < 12
          ? ["Le droit de partir en congé s'acquiert après douze mois de service effectif. Avant, les jours acquis sont payés par une indemnité compensatrice si le contrat prend fin."]
          : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Jours de congé payé", formato: "dias", decimales: 1, destacada: true },
    { clave: "principal", etiqueta: "Jours acquis par les mois de service (jours calendaires)", formato: "dias", decimales: 1 },
    { clave: "anciennete", etiqueta: "Jours ouvrables en plus pour l'ancienneté", formato: "dias", ocultarSiCero: true },
    { clave: "enfants", etiqueta: "Jours ouvrables en plus pour enfants à charge", formato: "dias", ocultarSiCero: true },
  ],
});
