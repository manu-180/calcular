import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.erfbelasting-berekenen",
  mercado: "be",
  concepto: "propio",
  slug: "erfbelasting-berekenen",
  estado: "publicado",
  requiere: {
    "be.erfbelasting-vl-rechte-lijn": "escala",
    "be.erfbelasting-vl-broers-zussen": "escala",
    "be.erfbelasting-vl-anderen": "escala",
  },
  campos: [
    {
      id: "relatie",
      tipo: "opcion",
      etiqueta: "Jouw band met de overledene",
      opciones: [
        { valor: "rechte-lijn", etiqueta: "Partner, kind, kleinkind, ouder of grootouder" },
        { valor: "broer-zus", etiqueta: "Broer of zus" },
        { valor: "andere", etiqueta: "Iemand anders (bijvoorbeeld neef, nicht, oom, tante of vriend)" },
      ],
      porDefecto: "rechte-lijn",
    },
    { id: "roerend", tipo: "moneda", etiqueta: "Jouw netto-erfdeel in roerende goederen (geld, beleggingen, wagen...)", min: 0, porDefecto: 50000 },
    { id: "onroerend", tipo: "moneda", etiqueta: "Jouw netto-erfdeel in onroerende goederen (woning, grond)", min: 0, porDefecto: 150000 },
  ],
  calcular(entrada, v, { redondear }) {
    const totaal = entrada.roerend + entrada.onroerend;
    if (totaal <= 0) throw new ErrorEntrada("Vul minstens één bedrag in.", "roerend");
    const observaciones = [
      "Dit zijn de tarieven van de Vlaamse erfbelasting. Vrijstellingen en verminderingen zitten niet in deze berekening.",
    ];
    let belasting: number;
    let opRoerend: number | null = null;
    let opOnroerend: number | null = null;
    if (entrada.relatie === "rechte-lijn") {
      const s = v["be.erfbelasting-vl-rechte-lijn"];
      opRoerend = redondear(aplicarEscalaMarginal(s, entrada.roerend));
      opOnroerend = redondear(aplicarEscalaMarginal(s, entrada.onroerend));
      belasting = redondear(opRoerend + opOnroerend);
    } else if (entrada.relatie === "broer-zus") {
      belasting = redondear(aplicarEscalaMarginal(v["be.erfbelasting-vl-broers-zussen"], totaal));
    } else {
      belasting = redondear(aplicarEscalaMarginal(v["be.erfbelasting-vl-anderen"], totaal));
      observaciones.push("Erven meerdere personen in deze groep, dan wordt het tarief berekend op hun erfdelen samen en betaalt elk zijn deel. Deze berekening gaat ervan uit dat je de enige erfgenaam in die groep bent.");
    }
    return {
      belasting,
      opRoerend,
      opOnroerend,
      netto: redondear(totaal - belasting),
      gemiddeld: redondear((belasting / totaal) * 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "belasting", etiqueta: "Erfbelasting", formato: "moneda", destacada: true },
    { clave: "opRoerend", etiqueta: "Waarvan op roerende goederen", formato: "moneda" },
    { clave: "opOnroerend", etiqueta: "Waarvan op onroerende goederen", formato: "moneda" },
    { clave: "netto", etiqueta: "Wat je overhoudt", formato: "moneda" },
    { clave: "gemiddeld", etiqueta: "Gemiddeld tarief", formato: "porcentaje", decimales: 1 },
  ],
});
