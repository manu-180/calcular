import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, REQ_COTISATIONS } from "../lib/cotisations";
import { irppAnnuel, REQ_IRPP } from "../lib/irpp";

export default definirCalculadora({
  id: "tg.calcul-irpp",
  mercado: "tg",
  concepto: "impuesto-renta",
  slug: "calcul-irpp",
  estado: "publicado",
  requiere: { ...REQ_IRPP, ...REQ_COTISATIONS },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Revenu brut annuel d'emploi",
      min: 0,
      porDefecto: 2400000,
      ayuda: "Salaires, primes, indemnités imposables et avantages en nature de l'année.",
    },
    { id: "personnes", tipo: "entero", etiqueta: "Personnes à charge", min: 0, max: 20, porDefecto: 0 },
    {
      id: "affilie",
      tipo: "si-no",
      etiqueta: "Salarié affilié à la CNSS",
      porDefecto: true,
      ayuda: "Les cotisations retraite et maladie retenues sur le salaire se déduisent avant l'impôt.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un revenu supérieur à zéro.", "brut");
    const c = entrada.affilie ? cotisations(entrada.brut / 12, v, redondear) : null;
    const r = irppAnnuel(entrada.brut, (c?.pensionSalarie ?? 0) * 12, (c?.amuSalarie ?? 0) * 12, entrada.personnes, v, redondear);
    return {
      impot: r.impot,
      mensuel: redondear(r.impot / 12),
      retenues: r.retenuesDeduites,
      abattement: r.abattement,
      deductionCharges: r.deductionCharges,
      revenuImposable: r.revenuImposable,
      tauxMarginal: r.tauxMarginal,
      tauxMoyen: Math.round((r.impot / entrada.brut) * 10000) / 100,
    };
  },
  resultado: [
    { clave: "impot", etiqueta: "IRPP de l'année", formato: "moneda", destacada: true },
    { clave: "mensuel", etiqueta: "Retenue moyenne par mois", formato: "moneda" },
    { clave: "retenues", etiqueta: "Cotisations sociales déduites", formato: "moneda", ocultarSiCero: true },
    { clave: "abattement", etiqueta: "Déduction forfaitaire", formato: "moneda" },
    { clave: "deductionCharges", etiqueta: "Réduction pour charges de famille", formato: "moneda", ocultarSiCero: true },
    { clave: "revenuImposable", etiqueta: "Revenu net imposable", formato: "moneda" },
    { clave: "tauxMarginal", etiqueta: "Taux de la tranche la plus haute atteinte", formato: "porcentaje" },
    { clave: "tauxMoyen", etiqueta: "Taux moyen sur le brut", formato: "porcentaje", decimales: 2 },
  ],
});
