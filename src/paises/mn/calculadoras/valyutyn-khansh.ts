import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mn.valyutyn-khansh",
  mercado: "mn",
  concepto: "tipo-de-cambio",
  slug: "valyutyn-khansh",
  estado: "publicado",
  requiere: {
    "mn.usd": "serie",
    "mn.cny": "serie",
    "mn.rub": "serie",
    "mn.eur": "serie",
  },
  campos: [
    { id: "dun", tipo: "moneda", etiqueta: "Дүн", min: 0, porDefecto: 100 },
    { id: "valyut", tipo: "opcion", etiqueta: "Валют", opciones: [{ valor: "usd", etiqueta: "Ам.доллар" }, { valor: "cny", etiqueta: "Юань" }, { valor: "rub", etiqueta: "Рубль" }, { valor: "eur", etiqueta: "Евро" }], porDefecto: "usd" },
    { id: "chiglel", tipo: "opcion", etiqueta: "Чиглэл", opciones: [{ valor: "togrog", etiqueta: "Валютаас төгрөг рүү" }, { valor: "valyut", etiqueta: "Төгрөгөөс валют руу" }], porDefecto: "togrog" },
  ],
  calcular(e, v, { redondear }) {
    if (e.dun < 0) throw new ErrorEntrada("Дүн сөрөг байж болохгүй.", "dun");
    const k = e.valyut === "cny" ? v["mn.cny"] : e.valyut === "rub" ? v["mn.rub"] : e.valyut === "eur" ? v["mn.eur"] : v["mn.usd"];
    const togrog = e.chiglel === "togrog";
    return {
      togrogoor: togrog ? redondear(e.dun * k.valor) : null,
      valyutaar: togrog ? null : redondear(e.dun / k.valor),
      khansh: k.valor,
      ognoo: k.fecha,
      observaciones: ["Монголбанкны зарласан ханш. Арилжааны банкны авах, зарах ханш өөр байна."],
    };
  },
  resultado: [
    { clave: "togrogoor", etiqueta: "Төгрөгөөр", formato: "moneda", destacada: true },
    { clave: "valyutaar", etiqueta: "Валютаар", formato: "numero", decimales: 2, destacada: true },
    { clave: "khansh", etiqueta: "Монголбанкны ханш", formato: "numero", decimales: 2 },
    { clave: "ognoo", etiqueta: "Ханшийн өдөр", formato: "fecha" },
  ],
});
