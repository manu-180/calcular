import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.ellilifeyrir",
  mercado: "is",
  concepto: "jubilacion",
  slug: "ellilifeyrir",
  estado: "publicado",
  requiere: {
    "is.ellilifeyrir": "numero",
    "is.heimilisuppbot": "numero",
    "is.elli-fritekjumark": "numero",
    "is.elli-fritekjumark-atvinna": "numero",
    "is.elli-skerding": "numero",
  },
  campos: [
    { id: "atvinna", tipo: "moneda", etiqueta: "Atvinnutekjur á mánuði", min: 0, porDefecto: 0 },
    { id: "adrar", tipo: "moneda", etiqueta: "Aðrar tekjur á mánuði", ayuda: "Til dæmis greiðslur úr lífeyrissjóði.", min: 0, porDefecto: 300000 },
    { id: "einn", tipo: "si-no", etiqueta: "Þú býrð ein(n)", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const atvinna = Math.max(0, e.atvinna - v["is.elli-fritekjumark-atvinna"]);
    const stofn = Math.max(0, atvinna + e.adrar - v["is.elli-fritekjumark"]);
    const skerding = redondear(porcentaje(stofn, v["is.elli-skerding"]));
    const lifeyrir = Math.max(0, v["is.ellilifeyrir"] - skerding);
    const uppbot = e.einn && stofn === 0 ? v["is.heimilisuppbot"] : null;
    return {
      stofn,
      skerding: Math.min(skerding, v["is.ellilifeyrir"]),
      lifeyrir,
      uppbot,
      samtals: lifeyrir + (uppbot ?? 0),
      observaciones: e.einn && stofn > 0 ? ["Heimilisuppbót skerðist líka af tekjum. Hún er ekki reiknuð hér: reiknivél Tryggingastofnunar gefur hana."] : [],
    };
  },
  resultado: [
    { clave: "stofn", etiqueta: "Tekjur umfram frítekjumörk", formato: "moneda" },
    { clave: "skerding", etiqueta: "Skerðing vegna tekna", formato: "moneda" },
    { clave: "lifeyrir", etiqueta: "Ellilífeyrir á mánuði", formato: "moneda" },
    { clave: "uppbot", etiqueta: "Heimilisuppbót", formato: "moneda" },
    { clave: "samtals", etiqueta: "Samtals frá TR fyrir skatt", formato: "moneda", destacada: true },
  ],
});
