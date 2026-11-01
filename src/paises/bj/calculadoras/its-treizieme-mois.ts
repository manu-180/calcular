import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { itsMensuel, REQ_ITS } from "../lib/its";

export default definirCalculadora({
  id: "bj.its-treizieme-mois",
  mercado: "bj",
  concepto: "propio",
  slug: "its-treizieme-mois",
  estado: "publicado",
  requiere: { ...REQ_ITS, "bj.its-abattement-exceptionnel": "numero" },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel imposable habituel", min: 0, porDefecto: 300000 },
    {
      id: "prime",
      tipo: "moneda",
      etiqueta: "Treizième mois ou prime assimilée versée",
      min: 0,
      porDefecto: 300000,
      ayuda: "Le montant brut versé en plus du salaire du mois.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    if (e.prime <= 0) throw new ErrorEntrada("Indiquez le montant du treizième mois.", "prime");
    // Article 126, paragraphe 3 : impôt sur le salaire moyen des douze derniers mois, y compris la
    // rémunération exceptionnelle, puis multiplié par le rapport entre ce qui est perçu dans le mois
    // et ce salaire moyen. Lecture retenue : onze mois habituels et le mois du versement.
    const moyen = (11 * e.salaire + e.salaire + e.prime) / 12;
    const impotMoyen = itsMensuel(moyen, "autre", v, (n) => n).impot;
    const total = e.salaire + e.prime;
    const its = redondear((impotMoyen * total) / moyen);
    const ordinaire = itsMensuel(e.salaire, "autre", v, redondear).impot;
    const sansAttenuation = itsMensuel(total, "autre", v, redondear).impot;
    return {
      its,
      supplement: redondear(its - ordinaire),
      moyen: redondear(moyen),
      impotMoyen: redondear(impotMoyen),
      sansAttenuation,
      economie: redondear(sansAttenuation - its),
      netPrime: redondear(e.prime - (its - ordinaire)),
    };
  },
  resultado: [
    { clave: "its", etiqueta: "ITS du mois du versement", formato: "moneda", destacada: true },
    { clave: "supplement", etiqueta: "ITS dû en raison du treizième mois", formato: "moneda" },
    { clave: "netPrime", etiqueta: "Treizième mois après impôt", formato: "moneda" },
    { clave: "moyen", etiqueta: "Salaire moyen des douze mois", formato: "moneda" },
    { clave: "impotMoyen", etiqueta: "ITS sur le salaire moyen", formato: "moneda" },
    { clave: "sansAttenuation", etiqueta: "ITS sans l'atténuation (barème sur le total du mois)", formato: "moneda" },
    { clave: "economie", etiqueta: "Gain dû à l'atténuation", formato: "moneda" },
  ],
});
