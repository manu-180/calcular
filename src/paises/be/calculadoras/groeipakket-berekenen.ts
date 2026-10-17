import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.groeipakket-berekenen",
  mercado: "be",
  concepto: "propio",
  slug: "groeipakket-berekenen",
  estado: "publicado",
  requiere: {
    "be.groeipakket": "mapa",
  },
  campos: [
    { id: "jong", tipo: "entero", etiqueta: "Kinderen geboren sinds 2019 van 0 tot 4 jaar", min: 0, max: 10, porDefecto: 1 },
    { id: "ouder", tipo: "entero", etiqueta: "Kinderen geboren sinds 2019 van 5 jaar of ouder", min: 0, max: 10, porDefecto: 0 },
    { id: "totaal", tipo: "entero", etiqueta: "Aantal kinderen in je gezin in totaal", min: 1, max: 15, porDefecto: 1, ayuda: "Ook de kinderen die vóór 2019 geboren zijn." },
    { id: "inkomen", tipo: "moneda", etiqueta: "Jaarlijks gezinsinkomen", min: 0, porDefecto: 60000, ayuda: "Bepaalt of je recht hebt op de sociale toeslag." },
    { id: "geboorte", tipo: "entero", etiqueta: "Kinderen die binnenkort geboren worden (startbedrag)", min: 0, max: 5, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const g = v["be.groeipakket"];
    const kinderen = entrada.jong + entrada.ouder;
    if (kinderen + entrada.geboorte === 0) throw new ErrorEntrada("Vul minstens één kind in.", "jong");
    if (kinderen > entrada.totaal) throw new ErrorEntrada("Het totaal aantal kinderen kan niet kleiner zijn dan de kinderen die je hierboven invulde.", "totaal");
    const grootGezin = entrada.totaal >= 3;
    let sociaal = 0;
    if (entrada.inkomen <= g["inkomensgrens-1"]) sociaal = grootGezin ? g["sociaal-3-laag"] : g["sociaal-12-laag"];
    else if (!grootGezin && entrada.inkomen <= g["inkomensgrens-2"]) sociaal = g["sociaal-12-midden"];
    else if (grootGezin && entrada.inkomen <= g["inkomensgrens-3"]) sociaal = g["sociaal-3-midden"];
    const basis = redondear(kinderen * g.basisbedrag);
    const toeslag = redondear(kinderen * sociaal);
    const perMaand = redondear(basis + toeslag);
    const schoolbonus = redondear(entrada.jong * g["schoolbonus-0-tot-4"] + entrada.ouder * g["schoolbonus-5-tot-11"]);
    return {
      perMaand,
      basis,
      toeslag,
      schoolbonus,
      perJaar: redondear(perMaand * 12 + schoolbonus),
      startbedrag: redondear(entrada.geboorte * g.startbedrag),
      observaciones: [
        "Dit zijn de bedragen voor kinderen die sinds 1 januari 2019 geboren zijn en in Vlaanderen wonen. Er bestaan nog andere toeslagen, zoals de zorgtoeslag, de kinderopvangtoeslag en de schooltoeslag.",
        "De schoolbonus voor kinderen van 5 jaar of ouder rekenen we met het bedrag voor 5 tot 11 jaar.",
      ],
    };
  },
  resultado: [
    { clave: "perMaand", etiqueta: "Groeipakket per maand", formato: "moneda", destacada: true },
    { clave: "basis", etiqueta: "Basisbedrag", formato: "moneda" },
    { clave: "toeslag", etiqueta: "Sociale toeslag", formato: "moneda", ocultarSiCero: true },
    { clave: "schoolbonus", etiqueta: "Schoolbonus per jaar", formato: "moneda", ocultarSiCero: true },
    { clave: "perJaar", etiqueta: "Per jaar", formato: "moneda" },
    { clave: "startbedrag", etiqueta: "Startbedrag (eenmalig)", formato: "moneda", ocultarSiCero: true },
  ],
});
