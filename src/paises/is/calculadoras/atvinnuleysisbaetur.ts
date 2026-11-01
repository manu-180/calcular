import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.atvinnuleysisbaetur",
  mercado: "is",
  concepto: "propio",
  slug: "atvinnuleysisbaetur",
  estado: "publicado",
  requiere: {
    "is.atvinnuleysi-grunn": "mapa",
    "is.atvinnuleysi-tekjutenging": "numero",
    "is.atvinnuleysi-hamark": "numero",
    "is.atvinnuleysi-barn": "numero",
    "is.atvinnuleysi-fritekjumark": "numero",
    "is.personuafslattur-man": "numero",
  },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Meðaltal heildarlauna síðustu mánuði", min: 0, porDefecto: 800000 },
    { id: "rettur", tipo: "opcion-dato", dato: "is.atvinnuleysi-grunn", etiqueta: "Bótaréttur", porDefecto: "r100" },
    { id: "born", tipo: "entero", etiqueta: "Börn undir 18 ára á framfæri", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const grunn = enMapa(v["is.atvinnuleysi-grunn"], e.rettur);
    const barnavidbot = e.born * v["is.atvinnuleysi-barn"];
    const fullurRettur = e.rettur === "r100";
    const tekjutengdar = fullurRettur ? Math.max(grunn, Math.min(v["is.atvinnuleysi-hamark"], redondear(porcentaje(e.laun, v["is.atvinnuleysi-tekjutenging"])))) : null;
    return {
      grunn,
      tekjutengdar,
      barnavidbot,
      manadargreidsla: (tekjutengdar ?? grunn) + barnavidbot,
      observaciones: fullurRettur ? [] : ["Tekjutengdar bætur miðað við skertan bótarétt eru ekki reiknaðar hér: fáðu þær staðfestar hjá Vinnumálastofnun."],
    };
  },
  resultado: [
    { clave: "grunn", etiqueta: "Grunnbætur á mánuði", formato: "moneda" },
    { clave: "tekjutengdar", etiqueta: "Tekjutengdar bætur á mánuði", formato: "moneda" },
    { clave: "barnavidbot", etiqueta: "Viðbót vegna barna", formato: "moneda", ocultarSiCero: true },
    { clave: "manadargreidsla", etiqueta: "Hæsta greiðsla á mánuði fyrir skatt", formato: "moneda", destacada: true },
  ],
});
