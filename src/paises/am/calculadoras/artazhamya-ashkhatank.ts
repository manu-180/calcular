import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.artazhamya-ashkhatank",
  mercado: "am",
  concepto: "horas-extra",
  slug: "artazhamya-ashkhatank",
  estado: "publicado",
  requiere: {
    "am.artazhamya-havelum": "numero",
    "am.gisher-havelum": "numero",
    "am.ton-gortakits": "numero",
    "am.artazhamya-sahman": "numero",
    "am.shabatakan-zhamer": "numero",
  },
  campos: [
    { id: "ashkhatavardz", tipo: "moneda", etiqueta: "Համախառն ամսական աշխատավարձ", min: 0, porDefecto: 336000 },
    { id: "amsaZham", tipo: "numero", etiqueta: "Աշխատանքային ժամերն ամսում", ayuda: "Ամսվա նորմալ աշխատաժամանակը, որից հաշվարկվում է ժամային դրույքը։", min: 1, porDefecto: 168 },
    { id: "artazhamya", tipo: "numero", etiqueta: "Արտաժամյա ժամեր", min: 0, porDefecto: 10 },
    { id: "gisher", tipo: "numero", etiqueta: "Գիշերային ժամեր", min: 0, porDefecto: 0 },
    { id: "ton", tipo: "numero", etiqueta: "Ժամեր տոնական կամ հանգստյան օրը", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ashkhatavardz <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ աշխատավարձ։", "ashkhatavardz");
    const zham = e.ashkhatavardz / e.amsaZham;
    const artazhamya = redondear(zham * e.artazhamya * (1 + v["am.artazhamya-havelum"] / 100));
    const gisher = redondear(porcentaje(zham, v["am.gisher-havelum"]) * e.gisher);
    const ton = redondear(zham * e.ton * v["am.ton-gortakits"]);
    const observaciones: string[] = [];
    if (e.artazhamya > v["am.artazhamya-sahman"]) observaciones.push("Արտաժամյա աշխատանքը տարեկան չպետք է գերազանցի օրենքով սահմանված սահմանը, բացառիկ դեպքերից բացի։");
    return { lrats: artazhamya + gisher + ton, zham: redondear(zham), artazhamya, gisher, ton, observaciones };
  },
  resultado: [
    { clave: "lrats", etiqueta: "Լրացուցիչ վճարն ընդամենը", formato: "moneda", decimales: 0, destacada: true },
    { clave: "zham", etiqueta: "Ժամային դրույք", formato: "moneda", decimales: 0 },
    { clave: "artazhamya", etiqueta: "Արտաժամյա աշխատանք", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "gisher", etiqueta: "Գիշերային հավելում", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "ton", etiqueta: "Տոնական կամ հանգստյան օր", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
