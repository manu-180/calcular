import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.godisnji-odmor",
  mercado: "hr",
  concepto: "vacaciones",
  slug: "godisnji-odmor",
  estado: "publicado",
  requiere: { "hr.odmor-tjedana": "numero", "hr.odmor-maloljetnik": "numero" },
  campos: [
    { id: "danaTjedno", tipo: "entero", etiqueta: "Radni dani u tjednu", min: 1, max: 6, porDefecto: 5 },
    { id: "mjeseci", tipo: "entero", etiqueta: "Mjeseci rada kod poslodavca", min: 0, max: 12, ayuda: "Najmanje pola mjeseca računa se kao cijeli mjesec.", porDefecto: 12 },
    { id: "prestanak", tipo: "si-no", etiqueta: "Radni odnos prestaje ove godine", porDefecto: false },
    { id: "maloljetnik", tipo: "si-no", etiqueta: "Maloljetni ste", porDefecto: false },
    { id: "placa", tipo: "moneda", etiqueta: "Prosječna mjesečna plaća u zadnja tri mjeseca", min: 0, porDefecto: 2000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.placa <= 0) throw new ErrorEntrada("Unesite plaću veću od nule.", "placa");
    const tjedana = e.maloljetnik ? v["hr.odmor-maloljetnik"] : v["hr.odmor-tjedana"];
    const puni = tjedana * e.danaTjedno;
    const razmjerni = e.mjeseci < 6 || e.prestanak;
    // Najmanje pola dana zaokružuje se na cijeli dan (Zakon o radu, čl. 79.).
    const dani = razmjerni ? Math.floor((puni * e.mjeseci) / 12 + 0.5) : puni;
    const dnevna = (e.placa * 12) / (52 * e.danaTjedno);
    return {
      dani,
      puni,
      naknada: redondear(dnevna * dani),
      dnevna: redondear(dnevna),
      observaciones: razmjerni ? ["Računamo razmjerni dio: jedna dvanaestina za svaki mjesec rada."] : [],
    };
  },
  resultado: [
    { clave: "dani", etiqueta: "Dani godišnjeg odmora", formato: "dias", destacada: true },
    { clave: "puni", etiqueta: "Puni godišnji odmor", formato: "dias" },
    { clave: "dnevna", etiqueta: "Procjena naknade po radnom danu", formato: "moneda" },
    { clave: "naknada", etiqueta: "Procjena naknade za sve dane", formato: "moneda" },
  ],
});
