import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { hamakharnZutits, REQUIERE_ASHKHATAVARDZ, zutAshkhatavardz } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.nvazaguyn-ashkhatavardz",
  mercado: "am",
  concepto: "salario-minimo",
  slug: "nvazaguyn-ashkhatavardz",
  estado: "publicado",
  requiere: { ...REQUIERE_ASHKHATAVARDZ, "am.nvazaguyn-zham": "mapa" },
  campos: [
    {
      id: "shabat",
      tipo: "opcion",
      etiqueta: "Աշխատանքային շաբաթ",
      opciones: [
        { valor: "40", etiqueta: "40 ժամ" },
        { valor: "36", etiqueta: "36 ժամ (կրճատ)" },
        { valor: "24", etiqueta: "Մինչև 24 ժամ (կրճատ)" },
      ],
      porDefecto: "40",
    },
    { id: "kutakayin", tipo: "si-no", etiqueta: "Կատարվում է կուտակային սոցիալական վճար", porDefecto: true },
    { id: "im", tipo: "moneda", etiqueta: "Ձեր զուտ աշխատավարձը (ոչ պարտադիր)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.im !== null && e.im < 0) throw new ErrorEntrada("Գումարը չի կարող բացասական լինել։", "im");
    const nvazaguyn = v["am.nvazaguyn"];
    const p = { kutakayin: e.kutakayin, aha: true };
    const hamakharn = hamakharnZutits(nvazaguyn, p, v, redondear);
    const h = zutAshkhatavardz(hamakharn, p, v, redondear);
    const tarberutyun = e.im === null ? null : e.im - nvazaguyn;
    return {
      nvazaguyn,
      zham: enMapa(v["am.nvazaguyn-zham"], e.shabat),
      hamakharn,
      pahumner: h.pahumner,
      tarekan: nvazaguyn * 12,
      tarberutyun,
      observaciones:
        tarberutyun !== null && tarberutyun < 0
          ? ["Մուտքագրված գումարը ցածր է նվազագույն ամսական աշխատավարձից։"]
          : [],
    };
  },
  resultado: [
    { clave: "nvazaguyn", etiqueta: "Նվազագույն ամսական աշխատավարձ", formato: "moneda", destacada: true },
    { clave: "zham", etiqueta: "Նվազագույն ժամային դրույք", formato: "moneda" },
    { clave: "hamakharn", etiqueta: "Հաշվարկային համախառն գումար՝ պահումներով", formato: "moneda", ayuda: "Օրենքով (հոդված 4) նվազագույնի մեջ հարկերն ու պարտադիր վճարները չեն ներառվում։" },
    { clave: "pahumner", etiqueta: "Պահումներն այդ համախառնից", formato: "moneda" },
    { clave: "tarekan", etiqueta: "Նվազագույնը տարեկան", formato: "moneda" },
    { clave: "tarberutyun", etiqueta: "Տարբերությունը Ձեր աշխատավարձի հետ", formato: "moneda" },
  ],
});
