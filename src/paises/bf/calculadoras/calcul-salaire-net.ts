import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { iutsMensuel, OPTIONS_CATEGORIE, REQ_IUTS } from "../lib/paie";

export default definirCalculadora({
  id: "bf.calcul-salaire-net",
  mercado: "bf",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: REQ_IUTS,
  campos: [
    {
      id: "base",
      tipo: "moneda",
      etiqueta: "Salaire de base mensuel",
      min: 0,
      porDefecto: 150000,
      ayuda: "Le salaire catégoriel prévu au contrat, sans les primes ni les indemnités.",
    },
    {
      id: "primes",
      tipo: "moneda",
      etiqueta: "Primes, sursalaire et avantages en nature du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Tout ce qui est imposable en plus du salaire de base, hors indemnités de logement, de fonction et de transport.",
    },
    { id: "logement", tipo: "moneda", etiqueta: "Indemnité de logement", min: 0, porDefecto: 0 },
    { id: "fonction", tipo: "moneda", etiqueta: "Indemnité de fonction", min: 0, porDefecto: 0 },
    { id: "transport", tipo: "moneda", etiqueta: "Indemnité de transport ou de déplacement", min: 0, porDefecto: 0 },
    { id: "categorie", tipo: "opcion", etiqueta: "Catégorie professionnelle", opciones: OPTIONS_CATEGORIE, porDefecto: "autres" },
    {
      id: "charges",
      tipo: "entero",
      etiqueta: "Charges de famille",
      min: 0,
      max: 20,
      porDefecto: 0,
      ayuda: "Le conjoint sans revenus et les enfants à charge (mineurs, infirmes, ou étudiants de moins de 25 ans).",
    },
    {
      id: "autres",
      tipo: "moneda",
      etiqueta: "Autres retenues du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Mutuelle, avance sur salaire, prêt : ce qui figure en plus sur votre bulletin de paie.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const iuts = iutsMensuel(entrada, v, redondear);
    const net = redondear(iuts.brut - iuts.cnss - iuts.iuts - entrada.autres);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return {
      net,
      brut: iuts.brut,
      cnss: iuts.cnss,
      iuts: iuts.iuts,
      autres: entrada.autres,
      netImposable: iuts.netImposable,
      netAnnuel: redondear(net * 12),
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Salaire brut du mois", formato: "moneda" },
    { clave: "cnss", etiqueta: "Cotisation CNSS (assurance vieillesse)", formato: "moneda" },
    { clave: "iuts", etiqueta: "IUTS retenu", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "netImposable", etiqueta: "Base imposable à l'IUTS", formato: "moneda" },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
  mundo: {
    bruto: "base",
    periodoBruto: "mes",
    neto: "net",
    periodoNeto: "mes",
    entrada: { primes: 0, logement: 0, fonction: 0, transport: 0, categorie: "autres", charges: 0, autres: 0 },
  },
});
