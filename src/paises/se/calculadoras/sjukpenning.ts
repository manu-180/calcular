import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// 28 kap. 10 § socialförsäkringsbalken: avrundas till närmaste hela krontal, 50 öre uppåt.
const helaKronor = (x: number) => Math.floor(x + 0.5 + 1e-9);

export default definirCalculadora({
  id: "se.sjukpenning",
  mercado: "se",
  concepto: "propio",
  slug: "sjukpenning",
  estado: "publicado",
  requiere: {
    "se.sjukpenning": "mapa",
    "se.prisbasbelopp": "numero",
  },
  campos: [
    { id: "manadslon", tipo: "moneda", etiqueta: "Din månadslön före skatt", min: 0, porDefecto: 32000 },
    {
      id: "niva",
      tipo: "opcion",
      etiqueta: "Hur länge har du varit sjuk?",
      opciones: [
        { valor: "normal", etiqueta: "Upp till 364 dagar (normalnivå)" },
        { valor: "fortsattning", etiqueta: "Längre än 364 dagar (fortsättningsnivå)" },
      ],
      porDefecto: "normal",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.manadslon <= 0) throw new ErrorEntrada("Skriv en månadslön som är större än noll.", "manadslon");
    const s = v["se.sjukpenning"];
    const tak = enMapa(s, "tak") * v["se.prisbasbelopp"];
    const sgi = Math.floor(Math.min(e.manadslon * 12, tak) / 100 + 1e-9) * 100;
    const andel = enMapa(s, e.niva);
    const underlag = (sgi * enMapa(s, "faktor") * andel) / 100;
    const perDag = helaKronor(underlag / 365);
    const observaciones = [
      "De första 14 dagarna betalar arbetsgivaren sjuklön. Sjukpenning från Försäkringskassan får du från dag 15.",
      "Är du anställd räknar Försäkringskassan sjukpenningen per arbetstimme utifrån samma årsbelopp. Beloppet per kalenderdag visar ungefär vad det blir.",
    ];
    return {
      perDag,
      per30: perDag * 30,
      arsbelopp: redondear(underlag),
      sgi,
      maxDag: helaKronor((tak * enMapa(s, "faktor") * andel) / 100 / 365),
      observaciones,
    };
  },
  resultado: [
    { clave: "perDag", etiqueta: "Sjukpenning per kalenderdag", formato: "moneda", decimales: 0, destacada: true },
    { clave: "per30", etiqueta: "Sjukpenning för 30 dagar", formato: "moneda", decimales: 0 },
    { clave: "arsbelopp", etiqueta: "Sjukpenning omräknat till ett år", formato: "moneda" },
    { clave: "sgi", etiqueta: "Sjukpenninggrundande inkomst (SGI)", formato: "moneda", decimales: 0 },
    { clave: "maxDag", etiqueta: "Högsta sjukpenning per dag på den här nivån", formato: "moneda", decimales: 0 },
  ],
});
