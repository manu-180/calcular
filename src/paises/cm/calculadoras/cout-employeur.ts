import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cotisationsCnps, REQ_CNPS } from "../lib/cnps";

export default definirCalculadora({
  id: "cm.cout-employeur",
  mercado: "cm",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: { ...REQ_CNPS, "cm.cfc-taux": "mapa", "cm.fne-taux": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 300000 },
    { id: "regime", tipo: "opcion-dato", etiqueta: "Régime de prestations familiales", dato: "cm.cnps-prestations-familiales", porDefecto: "general" },
    { id: "groupe", tipo: "opcion-dato", etiqueta: "Groupe de risque de l'entreprise", dato: "cm.cnps-accidents-travail", porDefecto: "a" },
    {
      id: "exonere",
      tipo: "si-no",
      etiqueta: "Employeur exonéré du Crédit foncier et du FNE",
      porDefecto: false,
      ayuda: "État, communes, associations sans but lucratif, exploitants agricoles individuels, enseignement privé, hôpitaux confessionnels.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisationsCnps(entrada.brut, entrada.regime, entrada.groupe, v, redondear);
    // Base du Crédit foncier et du FNE arrondie au millier inférieur (loi n° 77/10 modifiée, article 6).
    const base = Math.floor(entrada.brut / 1000) * 1000;
    const cfc = entrada.exonere ? 0 : redondear(porcentaje(base, v["cm.cfc-taux"].employeur));
    const fne = entrada.exonere ? 0 : redondear(porcentaje(base, v["cm.fne-taux"]));
    const charges = c.totalEmployeur + cfc + fne;
    return {
      cout: entrada.brut + charges,
      cnps: c.totalEmployeur,
      cfc,
      fne,
      charges,
      coutAnnuel: (entrada.brut + charges) * 12,
      tauxCharges: Math.round((charges / entrada.brut) * 10000) / 100,
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût total du salarié par mois", formato: "moneda", destacada: true },
    { clave: "cnps", etiqueta: "Cotisations patronales CNPS", formato: "moneda" },
    { clave: "cfc", etiqueta: "Crédit foncier, part patronale", formato: "moneda" },
    { clave: "fne", etiqueta: "Fonds national de l'emploi", formato: "moneda" },
    { clave: "charges", etiqueta: "Total des charges patronales", formato: "moneda" },
    { clave: "tauxCharges", etiqueta: "Charges en pourcentage du brut", formato: "porcentaje", decimales: 2 },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
