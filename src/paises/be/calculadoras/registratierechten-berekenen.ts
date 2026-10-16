import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.registratierechten-berekenen",
  mercado: "be",
  concepto: "propio",
  slug: "registratierechten-berekenen",
  estado: "publicado",
  requiere: {
    "be.verkooprecht-vlaanderen": "mapa",
    "be.verkooprecht-vlaanderen-tarieven": "mapa",
  },
  campos: [
    { id: "prijs", tipo: "moneda", etiqueta: "Aankoopprijs", min: 0, porDefecto: 300000 },
    {
      id: "soort",
      tipo: "opcion",
      etiqueta: "Wat koop je?",
      opciones: [
        { valor: "enige-eigen-woning", etiqueta: "Mijn enige eigen woning, waar ik ga wonen" },
        { valor: "andere", etiqueta: "Een tweede woning, een opbrengsteigendom of een ander onroerend goed" },
      ],
      porDefecto: "enige-eigen-woning",
    },
    { id: "kern", tipo: "si-no", etiqueta: "De woning ligt in een kernstad of in de Vlaamse Rand rond Brussel", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.prijs <= 0) throw new ErrorEntrada("Vul de aankoopprijs in.", "prijs");
    const t = v["be.verkooprecht-vlaanderen"];
    const enige = entrada.soort === "enige-eigen-woning";
    const tarieven = v["be.verkooprecht-vlaanderen-tarieven"];
    const tarief = enige ? tarieven["enige-eigen-woning"] : tarieven.algemeen;
    const bruto = redondear(porcentaje(entrada.prijs, tarief));
    const grens = entrada.kern ? t["max-bescheiden-kern"] : t["max-bescheiden"];
    const vermindering = enige && entrada.prijs <= grens ? Math.min(t.vermindering, bruto) : 0;
    const observaciones = ["Dit geldt voor een aankoop in het Vlaams Gewest. Daarnaast betaal je nog notariskosten en de kosten van een eventuele hypothecaire lening."];
    if (enige) observaciones.push("Het verlaagde tarief heeft voorwaarden: je koopt als natuurlijke persoon, het wordt je enige woning en je laat je er binnen drie jaar inschrijven in het bevolkingsregister.");
    return { rechten: redondear(bruto - vermindering), tarief, bruto, vermindering, observaciones };
  },
  resultado: [
    { clave: "rechten", etiqueta: "Registratierechten (verkooprecht)", formato: "moneda", destacada: true },
    { clave: "tarief", etiqueta: "Tarief", formato: "porcentaje" },
    { clave: "bruto", etiqueta: "Verkooprecht vóór vermindering", formato: "moneda" },
    { clave: "vermindering", etiqueta: "Min: vermindering voor een bescheiden woning", formato: "moneda", ocultarSiCero: true },
  ],
});
