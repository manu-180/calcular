import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cm.conges-payes",
  mercado: "cm",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "borrador",
  requiere: { "cm.conges-jours-par-mois": "mapa", "cm.conges-majorations": "mapa" },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service effectif sur la période", min: 0, max: 12, porDefecto: 12 },
    { id: "moins18", tipo: "si-no", etiqueta: "Salarié de moins de 18 ans", porDefecto: false },
    { id: "anciennete", tipo: "entero", etiqueta: "Années d'ancienneté dans l'entreprise", min: 0, max: 50, porDefecto: 0 },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants de moins de 6 ans à charge (mères salariées)", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.mois > 12) throw new ErrorEntrada("Indiquez au plus 12 mois.", "mois");
    const parMois = entrada.moins18 ? v["cm.conges-jours-par-mois"]["moins-18-ans"] : v["cm.conges-jours-par-mois"].general;
    const principal = entrada.mois * parMois;
    const anciennete = Math.floor(entrada.anciennete / 5) * v["cm.conges-majorations"]["anciennete-5-ans"];
    // Article 90 : un seul jour par enfant quand le congé principal ne dépasse pas six jours.
    const parEnfant = principal > 6 ? v["cm.conges-majorations"].enfant : 1;
    const maternel = entrada.enfants * parEnfant;
    return { principal, anciennete, maternel, total: principal + anciennete + maternel };
  },
  resultado: [
    { clave: "total", etiqueta: "Jours ouvrables de congé", formato: "dias", destacada: true },
    { clave: "principal", etiqueta: "Congé principal", formato: "dias" },
    { clave: "anciennete", etiqueta: "Jours pour l'ancienneté", formato: "dias", ocultarSiCero: true },
    { clave: "maternel", etiqueta: "Jours pour les enfants", formato: "dias", ocultarSiCero: true },
  ],
});
