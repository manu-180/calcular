import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.sociale-bijdragen-zelfstandige",
  mercado: "be",
  concepto: "propio",
  slug: "sociale-bijdragen-zelfstandige",
  estado: "publicado",
  requiere: {
    "be.rsvz": "mapa",
    "be.rsvz-tarieven": "mapa",
  },
  campos: [
    {
      id: "inkomen",
      tipo: "moneda",
      etiqueta: "Netto belastbaar beroepsinkomen per jaar",
      min: 0,
      porDefecto: 40000,
      ayuda: "Je winst of baten na aftrek van beroepskosten, vóór belastingen. De sociale bijdragen zelf tellen niet mee.",
    },
    {
      id: "statuut",
      tipo: "opcion",
      etiqueta: "Statuut",
      opciones: [
        { valor: "hoofdberoep", etiqueta: "Zelfstandige in hoofdberoep" },
        { valor: "bijberoep", etiqueta: "Zelfstandige in bijberoep" },
      ],
      porDefecto: "hoofdberoep",
    },
    { id: "primostarter", tipo: "si-no", etiqueta: "Je bent primostarter (je eerste kwartalen als zelfstandige in hoofdberoep)", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    const t = v["be.rsvz"];
    const observaciones = ["Bedragen zonder de beheerskosten van je sociaal verzekeringsfonds, die er nog bovenop komen."];
    let basis = entrada.inkomen;
    if (entrada.statuut === "hoofdberoep") {
      basis = Math.max(basis, entrada.primostarter ? t["minimum-inkomen-primostarter"] : t["minimum-inkomen"]);
      if (basis > entrada.inkomen) observaciones.push("Je inkomen ligt onder het minimum. Je betaalt de minimumbijdrage.");
    } else if (entrada.inkomen < t["drempel-bijberoep"]) {
      basis = 0;
      observaciones.push("Je inkomen ligt onder de drempel voor een bijberoep. Je betaalt geen sociale bijdragen.");
    }
    const schijf1 = Math.min(basis, t["grens-1"]);
    const schijf2 = Math.max(0, Math.min(basis, t["grens-2"]) - t["grens-1"]);
    const jaar = porcentaje(schijf1, v["be.rsvz-tarieven"]["tarief-1"]) + porcentaje(schijf2, v["be.rsvz-tarieven"]["tarief-2"]);
    if (basis > t["grens-2"]) observaciones.push("Boven het tweede grensbedrag betaal je geen extra bijdragen meer.");
    return { perKwartaal: redondear(jaar / 4), perJaar: redondear(jaar), basis: redondear(basis), observaciones };
  },
  resultado: [
    { clave: "perKwartaal", etiqueta: "Sociale bijdrage per kwartaal", formato: "moneda", destacada: true },
    { clave: "perJaar", etiqueta: "Per jaar", formato: "moneda" },
    { clave: "basis", etiqueta: "Inkomen waarop de bijdrage berekend wordt", formato: "moneda" },
  ],
});
