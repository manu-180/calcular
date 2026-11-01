import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.binis-gakidvis-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "binis-gakidvis-gadasakhadi",
  estado: "publicado",
  requiere: { "ge.nameti": "numero", "ge.binis-vada": "numero", "ge.avto-vada": "numero" },
  campos: [
    {
      id: "tipi",
      tipo: "opcion",
      etiqueta: "რას ყიდით",
      opciones: [
        { valor: "bina", etiqueta: "ბინას ან სახლს" },
        { valor: "avto", etiqueta: "ავტომობილს" },
      ],
      porDefecto: "bina",
    },
    { id: "gakidva", tipo: "moneda", etiqueta: "გაყიდვის ფასი", min: 0, porDefecto: 200000 },
    { id: "shedzena", tipo: "moneda", etiqueta: "შეძენის ფასი", min: 0, porDefecto: 150000 },
    { id: "tve", tipo: "entero", etiqueta: "რამდენი თვეა თქვენს საკუთრებაშია", min: 0, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.gakidva <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "gakidva");
    const zghvari = e.tipi === "bina" ? v["ge.binis-vada"] * 12 : v["ge.avto-vada"];
    const tavisufali = e.tve > zghvari;
    const nameti = redondear(Math.max(0, e.gakidva - e.shedzena));
    const gadasakhadi = tavisufali ? 0 : redondear((nameti * v["ge.nameti"]) / 100);
    return { gadasakhadi, nameti, zghvari, statusi: tavisufali ? "ფლობის ვადის გამო გათავისუფლებულია" : "იბეგრება", darcheni: redondear(nameti - gadasakhadi) };
  },
  resultado: [
    { clave: "gadasakhadi", etiqueta: "საშემოსავლო გადასახადი", formato: "moneda", destacada: true },
    { clave: "nameti", etiqueta: "ნამეტი შემოსავალი", formato: "moneda" },
    { clave: "statusi", etiqueta: "სტატუსი", formato: "texto" },
    { clave: "zghvari", etiqueta: "გათავისუფლებისთვის ამ ვადაზე მეტი ფლობა", formato: "meses" },
    { clave: "darcheni", etiqueta: "ნამეტიდან გადასახადის შემდეგ რჩება", formato: "moneda" },
  ],
});
