import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.ardzakman-npast",
  mercado: "am",
  concepto: "indemnizacion-despido",
  slug: "ardzakman-npast",
  estado: "publicado",
  requiere: { "am.ardzakman-orer": "mapa", "am.orakan-bazhanarar": "mapa" },
  campos: [
    { id: "mijin", tipo: "moneda", etiqueta: "Միջին ամսական աշխատավարձ", min: 0, porDefecto: 420000 },
    {
      id: "himq",
      tipo: "opcion",
      etiqueta: "Պայմանագիրը լուծելու հիմքը",
      opciones: [
        { valor: "krchatum", etiqueta: "Լուծարում, կրճատում կամ նախկին աշխատողի վերականգնում" },
        { valor: "anhamapatasxan", etiqueta: "Պաշտոնին չհամապատասխանելը, երկարատև անաշխատունակություն և այլ դեպքեր" },
      ],
      porDefecto: "krchatum",
    },
    { id: "stazh", tipo: "opcion-dato", etiqueta: "Անընդմեջ ստաժը տվյալ գործատուի մոտ", dato: "am.ardzakman-orer", porDefecto: "1-5", visibleSi: { himq: ["anhamapatasxan"] } },
    { id: "shabat", tipo: "opcion-dato", etiqueta: "Աշխատանքային շաբաթ", dato: "am.orakan-bazhanarar", porDefecto: "hing", visibleSi: { himq: ["anhamapatasxan"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.mijin <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ միջին աշխատավարձ։", "mijin");
    if (e.himq === "krchatum") return { npast: redondear(e.mijin), orer: null, orakan: null };
    const orakan = e.mijin / enMapa(v["am.orakan-bazhanarar"], e.shabat);
    const orer = enMapa(v["am.ardzakman-orer"], e.stazh);
    return { npast: redondear(orakan * orer), orer, orakan: redondear(orakan) };
  },
  resultado: [
    { clave: "npast", etiqueta: "Արձակման նպաստ", formato: "moneda", decimales: 0, destacada: true },
    { clave: "orer", etiqueta: "Միջին օրական աշխատավարձի բազմապատիկ", formato: "dias" },
    { clave: "orakan", etiqueta: "Միջին օրական աշխատավարձ", formato: "moneda", decimales: 0 },
  ],
});
