import { definirCalculadora } from "@/motor/calculo";
import { impotAnnuel, nombreDeParts, REQUIERE_IR, SITUATIONS } from "../lib/impot";

export default definirCalculadora({
  id: "sn.calcul-impot-sur-le-revenu",
  mercado: "sn",
  concepto: "impuesto-renta",
  slug: "calcul-impot-sur-le-revenu",
  estado: "publicado",
  requiere: REQUIERE_IR,
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 500000, ayuda: "Avec les primes et les avantages en argent ou en nature." },
    { id: "situation", tipo: "opcion", etiqueta: "Situation de famille", opciones: SITUATIONS, porDefecto: "marie" },
    { id: "enfants", tipo: "entero", etiqueta: "Enfants à charge", min: 0, max: 20, porDefecto: 2 },
    { id: "conjointSansRevenu", tipo: "si-no", etiqueta: "Votre conjoint n'a pas de revenus imposables", porDefecto: false, visibleSi: { situation: ["marie"] } },
  ],
  calcular(e, v, { redondear }) {
    const parts = nombreDeParts(e.situation, e.enfants, e.conjointSansRevenu === true);
    const brut = e.salaire * 12;
    const r = impotAnnuel(brut, parts, v);
    return {
      mensuel: redondear(r.impot / 12),
      annuel: redondear(r.impot),
      trimfMensuel: redondear(r.trimf / 12),
      trimf: r.trimf,
      parts,
      imposable: r.imposable,
      reduction: redondear(r.reduction),
      moyen: brut > 0 ? ((r.impot + r.trimf) / brut) * 100 : 0,
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "Impôt sur le revenu retenu par mois", formato: "moneda", destacada: true },
    { clave: "trimfMensuel", etiqueta: "TRIMF retenue par mois", formato: "moneda" },
    { clave: "annuel", etiqueta: "Impôt sur le revenu de l'année", formato: "moneda" },
    { clave: "trimf", etiqueta: "TRIMF de l'année", formato: "moneda" },
    { clave: "parts", etiqueta: "Nombre de parts", formato: "numero", decimales: 1 },
    { clave: "imposable", etiqueta: "Revenu net imposable de l'année", formato: "moneda" },
    { clave: "reduction", etiqueta: "Réduction pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "moyen", etiqueta: "Taux moyen (impôt et TRIMF sur le brut)", formato: "porcentaje", decimales: 2 },
  ],
});
