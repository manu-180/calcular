import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.mtsire-biznesis-gadasakhadi",
  mercado: "ge",
  concepto: "regimen-simplificado",
  slug: "mtsire-biznesis-gadasakhadi",
  estado: "publicado",
  requiere: {
    "ge.mtsire": "numero",
    "ge.mtsire-gadacharbeba": "numero",
    "ge.mtsire-zghvari": "numero",
    "ge.mtsire-zghvari-turizmi": "numero",
    "ge.mikro-zghvari": "numero",
  },
  campos: [
    { id: "tve", tipo: "moneda", etiqueta: "ამ თვის შემოსავალი", min: 0, porDefecto: 5000 },
    { id: "tsina", tipo: "moneda", etiqueta: "შემოსავალი წლის დასაწყისიდან, ამ თვის გარეშე", min: 0, porDefecto: 0 },
    { id: "turizmi", tipo: "si-no", etiqueta: "ღვინის ტურიზმის ან აგროტურისტული საქმიანობის სუბიექტი ხართ", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.tve <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tve");
    const zghvari = e.turizmi ? v["ge.mtsire-zghvari-turizmi"] : v["ge.mtsire-zghvari"];
    const sul = e.tsina + e.tve;
    const gadacharba = sul > zghvari;
    const ganakveti = gadacharba ? v["ge.mtsire-gadacharbeba"] : v["ge.mtsire"];
    const gadasakhadi = redondear((e.tve * ganakveti) / 100);
    const observaciones: string[] = [];
    if (gadacharba) observaciones.push("ზღვარი ამ თვეში გადააჭარბეთ. მაღალი განაკვეთი მოქმედებს ამ თვის დასაწყისიდან წლის ბოლომდე. წინა თვეები არ გადაითვლება.");
    if (sul <= v["ge.mikro-zghvari"]) observaciones.push("ჯერჯერობით მიკრო ბიზნესის წლიური ზღვრის ფარგლებში ხართ. ეს სტატუსი მხოლოდ დაქირავებულების გარეშე მომუშავე პირს შეუძლია მიიღოს.");
    return { gadasakhadi, ganakveti, sul, darchenili: Math.max(0, zghvari - sul), darcheni: redondear(e.tve - gadasakhadi), observaciones };
  },
  resultado: [
    { clave: "gadasakhadi", etiqueta: "გადასახადი ამ თვისთვის", formato: "moneda", destacada: true },
    { clave: "ganakveti", etiqueta: "გამოყენებული განაკვეთი", formato: "porcentaje" },
    { clave: "sul", etiqueta: "შემოსავალი წლის დასაწყისიდან", formato: "moneda" },
    { clave: "darchenili", etiqueta: "ზღვრამდე დარჩა", formato: "moneda" },
    { clave: "darcheni", etiqueta: "გადასახადის შემდეგ რჩება", formato: "moneda" },
  ],
});
