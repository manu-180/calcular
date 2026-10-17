import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.vakantiegeld-berekenen",
  mercado: "be",
  concepto: "vacaciones",
  slug: "vakantiegeld-berekenen",
  estado: "publicado",
  requiere: {
    "be.vakantiegeld": "mapa",
    "be.rsz-werknemer": "numero",
  },
  campos: [
    {
      id: "situatie",
      tipo: "opcion",
      etiqueta: "Jouw situatie",
      opciones: [
        { valor: "bediende", etiqueta: "Bediende: dubbel vakantiegeld" },
        { valor: "arbeider", etiqueta: "Arbeider: vakantiegeld van de RJV of het vakantiefonds" },
        { valor: "vertrek", etiqueta: "Bediende die uit dienst gaat: vertrekvakantiegeld" },
      ],
      porDefecto: "bediende",
    },
    { id: "maandloon", tipo: "moneda", etiqueta: "Brutomaandloon (bediende)", min: 0, porDefecto: 3000 },
    { id: "maanden", tipo: "entero", etiqueta: "Maanden gewerkt vorig jaar (bediende)", min: 0, max: 12, porDefecto: 12 },
    {
      id: "jaarloon",
      tipo: "moneda",
      etiqueta: "Brutoloon over de periode (arbeider of vertrek)",
      min: 0,
      requerido: false,
      ayuda: "Arbeider: je brutoloon van vorig jaar aan 100 %. Vertrek: het brutoloon dat je dit jaar bij deze werkgever verdiende.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const vg = v["be.vakantiegeld"];
    if (entrada.situatie === "bediende") {
      if (entrada.maandloon <= 0) throw new ErrorEntrada("Vul je brutomaandloon in.", "maandloon");
      const dubbel = redondear((porcentaje(entrada.maandloon, vg["dubbel-bediende"]) * entrada.maanden) / 12);
      // De RSZ int 13,07 % op het dubbel vakantiegeld, maar niet op het deel dat overeenstemt met
      // het loon vanaf de derde dag van de vierde vakantieweek: zo komt de RSZ-instructie aan 85/92.
      const rsz = redondear(porcentaje((dubbel * 85) / 92, v["be.rsz-werknemer"]));
      return { vakantiegeld: dubbel, rsz, naRsz: redondear(dubbel - rsz), observaciones: ["Tijdens je vakantiedagen loopt je gewone loon door: dat is je enkel vakantiegeld. Het dubbel vakantiegeld komt er één keer per jaar bij."] };
    }
    if (entrada.jaarloon === null || entrada.jaarloon <= 0) throw new ErrorEntrada("Vul het brutoloon over de periode in.", "jaarloon");
    if (entrada.situatie === "arbeider") {
      const bruto = redondear(porcentaje(entrada.jaarloon * 1.08, vg.arbeider));
      return { vakantiegeld: bruto, rsz: null, naRsz: null, observaciones: ["Het vakantiefonds berekent je vakantiegeld op je loon aan 108 %. Daarop gaat nog een solidariteitsbijdrage van 1 % af."] };
    }
    const vertrek = redondear(porcentaje(entrada.jaarloon, vg.vertrek));
    return { vakantiegeld: vertrek, rsz: null, naRsz: null, observaciones: ["Je nieuwe werkgever trekt dit vertrekvakantiegeld af van het vakantiegeld dat hij je volgend jaar betaalt voor dezelfde dagen."] };
  },
  resultado: [
    { clave: "vakantiegeld", etiqueta: "Bruto vakantiegeld", formato: "moneda", destacada: true },
    { clave: "rsz", etiqueta: "Min: RSZ op het dubbel vakantiegeld", formato: "moneda" },
    { clave: "naRsz", etiqueta: "Na RSZ (voor bedrijfsvoorheffing)", formato: "moneda" },
  ],
});
