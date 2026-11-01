import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.ardzakurdayin-hashvich",
  mercado: "am",
  concepto: "vacaciones",
  slug: "ardzakurdayin-hashvich",
  estado: "publicado",
  requiere: { "am.ardzakurd-orer": "mapa", "am.orakan-bazhanarar": "mapa" },
  campos: [
    { id: "mijin", tipo: "moneda", etiqueta: "Միջին ամսական աշխատավարձ", ayuda: "Նախորդ 12 ամսվա հաշվարկված աշխատավարձի միջինը։", min: 0, porDefecto: 420000 },
    { id: "shabat", tipo: "opcion-dato", etiqueta: "Աշխատանքային շաբաթ", dato: "am.ardzakurd-orer", porDefecto: "hing" },
    { id: "orer", tipo: "entero", etiqueta: "Արձակուրդի աշխատանքային օրերը (եթե այլ է)", ayuda: "Թողեք դատարկ՝ նվազագույն տևողության համար։", min: 1, max: 60, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.mijin <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ միջին աշխատավարձ։", "mijin");
    const orakan = e.mijin / enMapa(v["am.orakan-bazhanarar"], e.shabat);
    const orer = e.orer ?? enMapa(v["am.ardzakurd-orer"], e.shabat);
    return { vchar: redondear(orakan * orer), orakan: redondear(orakan), orer };
  },
  resultado: [
    { clave: "vchar", etiqueta: "Արձակուրդի վճար", formato: "moneda", destacada: true },
    { clave: "orakan", etiqueta: "Միջին օրական աշխատավարձ", formato: "moneda" },
    { clave: "orer", etiqueta: "Արձակուրդի օրեր", formato: "dias" },
  ],
});
