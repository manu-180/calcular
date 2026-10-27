import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OBS_ASSIETTE, paie, REQ_PAIE } from "../lib/irg";

export default definirCalculadora({
  id: "dz.calcul-salaire-net",
  mercado: "dz",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: { ...REQ_PAIE, "dz.snmg": "numero", "dz.irg-primes": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 60000, ayuda: "Salaire de base, primes et indemnités versés chaque mois, avant toute retenue." },
    {
      id: "special",
      tipo: "si-no",
      etiqueta: "Travailleur handicapé",
      porDefecto: false,
      ayuda: "Handicap moteur ou mental, non-voyant ou sourd-muet : un abattement supplémentaire d'IRG s'applique aux salaires modestes.",
    },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
  calcular(e, v, { redondear }) {
    if (e.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const p = paie(e.brut, e.special, v, redondear);
    return {
      net: p.net,
      cnas: p.cnas,
      irg: p.irg,
      imposable: p.imposable,
      retenues: redondear(p.cnas + p.irg),
      netAnnuel: redondear(p.net * 12),
      partNet: (p.net / e.brut) * 100,
      observaciones: [OBS_ASSIETTE],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net mensuel", formato: "moneda", destacada: true },
    { clave: "cnas", etiqueta: "Moins : cotisation de sécurité sociale", formato: "moneda" },
    { clave: "irg", etiqueta: "Moins : IRG retenu à la source", formato: "moneda" },
    { clave: "retenues", etiqueta: "Total des retenues", formato: "moneda" },
    { clave: "imposable", etiqueta: "Salaire imposable", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Salaire net sur 12 mois", formato: "moneda" },
    { clave: "partNet", etiqueta: "Part du brut que vous touchez", formato: "porcentaje", decimales: 1 },
  ],
});
