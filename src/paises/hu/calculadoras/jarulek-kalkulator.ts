import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.jarulek-kalkulator",
  mercado: "hu",
  concepto: "aportes-seguridad-social",
  slug: "jarulek-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.tb-jarulek": "numero",
    "hu.szocho": "numero",
    "hu.minimalber": "mapa",
    "hu.garantalt-berminimum": "mapa",
  },
  campos: [
    {
      id: "helyzet",
      tipo: "opcion",
      etiqueta: "Kinek számolsz?",
      opciones: [
        { valor: "munkavallalo", etiqueta: "Munkavállaló (munkaviszony)" },
        { valor: "vallalkozo", etiqueta: "Főfoglalkozású egyéni vállalkozó" },
      ],
      porDefecto: "munkavallalo",
    },
    {
      id: "jovedelem",
      tipo: "moneda",
      etiqueta: "Havi bruttó bér vagy vállalkozói jövedelem",
      ayuda: "Egyéni vállalkozónál a vállalkozói kivét, átalányadózónál az adóköteles átalányjövedelem havi összege.",
      min: 0,
      porDefecto: 500000,
    },
    {
      id: "garantalt",
      tipo: "si-no",
      etiqueta: "A fő tevékenységed legalább középfokú végzettséget igényel",
      ayuda: "Ilyenkor a járulékalap alsó határa a garantált bérminimum, nem a minimálbér.",
      porDefecto: false,
      visibleSi: { helyzet: ["vallalkozo"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.jovedelem < 0) throw new ErrorEntrada("A jövedelem nem lehet negatív.", "jovedelem");
    const vallalkozo = e.helyzet === "vallalkozo";
    const minimum = vallalkozo ? enMapa(e.garantalt ? v["hu.garantalt-berminimum"] : v["hu.minimalber"], "havi") : 0;
    if (!vallalkozo && e.jovedelem <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb bruttó bért.", "jovedelem");
    const alap = Math.max(e.jovedelem, minimum);
    const tb = redondear((alap * v["hu.tb-jarulek"]) / 100);
    const szocho = redondear((alap * v["hu.szocho"]) / 100);
    const observaciones: string[] = [];
    if (vallalkozo && e.jovedelem < minimum) {
      observaciones.push("A jövedelmed kevesebb a járulékalap alsó határánál, ezért a járulékot és a szochót a minimum után számoljuk.");
    }
    return {
      osszes: redondear(tb + szocho),
      tb,
      szocho,
      alap,
      minimum: vallalkozo ? minimum : null,
      eves: redondear((tb + szocho) * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "osszes", etiqueta: "Járulék és szocho együtt havonta", formato: "moneda", destacada: true },
    { clave: "tb", etiqueta: "TB-járulék", formato: "moneda", ayuda: "Munkavállalónál a bérből vonják le." },
    { clave: "szocho", etiqueta: "Szociális hozzájárulási adó (szocho)", formato: "moneda", ayuda: "Munkaviszonyban a munkáltató fizeti a bér felett." },
    { clave: "alap", etiqueta: "Járulékalap", formato: "moneda" },
    { clave: "minimum", etiqueta: "A járulékalap alsó határa", formato: "moneda" },
    { clave: "eves", etiqueta: "Egy évre", formato: "moneda" },
  ],
});
