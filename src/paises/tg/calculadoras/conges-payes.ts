import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tg.conges-payes",
  mercado: "tg",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: { "tg.conges-jours-par-mois": "numero", "tg.conges-allocation-diviseur": "numero" },
  campos: [
    { id: "mois", tipo: "entero", etiqueta: "Mois de service effectif depuis le dernier congé", min: 1, max: 24, porDefecto: 12 },
    {
      id: "remuneration",
      tipo: "moneda",
      etiqueta: "Rémunération perçue pendant ces mois",
      min: 0,
      porDefecto: 3000000,
      ayuda: "Salaires et éléments de rémunération de la période, sans les primes de rendement ni les remboursements de frais.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.remuneration <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "remuneration");
    const jours = Math.round(entrada.mois * v["tg.conges-jours-par-mois"] * 100) / 100;
    const allocation = redondear(entrada.remuneration / v["tg.conges-allocation-diviseur"]);
    return {
      allocation,
      jours,
      parJour: redondear(allocation / jours),
      observaciones:
        entrada.mois < 12
          ? ["Le droit au congé s'acquiert après un an de service ; avant, il se prend au prorata seulement si les parties en conviennent, après six mois. En cas de départ, une indemnité remplace le congé."]
          : [],
    };
  },
  resultado: [
    { clave: "allocation", etiqueta: "Allocation de congé", formato: "moneda", destacada: true },
    { clave: "jours", etiqueta: "Jours ouvrables de congé acquis", formato: "dias", decimales: 1 },
    { clave: "parJour", etiqueta: "Allocation par jour de congé", formato: "moneda" },
  ],
});
