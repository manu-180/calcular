import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.vaxtabaetur",
  mercado: "is",
  concepto: "propio",
  slug: "vaxtabaetur",
  estado: "publicado",
  requiere: {
    "is.vaxtabaetur-vaxtathak": "mapa",
    "is.vaxtabaetur-hamark": "mapa",
    "is.vaxtabaetur-eign-nedri": "mapa",
    "is.vaxtabaetur-eign-efri": "mapa",
    "is.vaxtabaetur-skuldir": "numero",
    "is.vaxtabaetur-tekjur": "numero",
    "is.vaxtabaetur-lagmark": "numero",
  },
  campos: [
    { id: "stada", tipo: "opcion-dato", dato: "is.vaxtabaetur-vaxtathak", etiqueta: "Fjölskyldustaða", porDefecto: "einhleypur" },
    { id: "vaxtagjold", tipo: "moneda", etiqueta: "Vaxtagjöld af íbúðarlánum á ári", min: 0, porDefecto: 900000 },
    { id: "skuldir", tipo: "moneda", etiqueta: "Eftirstöðvar íbúðarlána", min: 0, porDefecto: 20000000 },
    { id: "tekjur", tipo: "moneda", etiqueta: "Tekjur á ári", ayuda: "Hjá hjónum og sambúðarfólki: samanlagðar tekjur beggja.", min: 0, porDefecto: 6000000 },
    { id: "eign", tipo: "moneda", etiqueta: "Eignir að frádregnum skuldum", min: 0, porDefecto: 5000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.vaxtagjold <= 0) throw new ErrorEntrada("Sláðu inn vaxtagjöld hærri en núll.", "vaxtagjold");
    const vextir = Math.min(e.vaxtagjold, redondear(porcentaje(e.skuldir, v["is.vaxtabaetur-skuldir"])), enMapa(v["is.vaxtabaetur-vaxtathak"], e.stada));
    const frektekjur = redondear(porcentaje(e.tekjur, v["is.vaxtabaetur-tekjur"]));
    const mismunur = Math.max(0, vextir - frektekjur);
    const nedri = enMapa(v["is.vaxtabaetur-eign-nedri"], e.stada);
    const efri = enMapa(v["is.vaxtabaetur-eign-efri"], e.stada);
    const hlutfall = e.eign <= nedri ? 1 : e.eign >= efri ? 0 : 1 - (e.eign - nedri) / (efri - nedri);
    const eftirEign = redondear(mismunur * hlutfall);
    const baetur = Math.min(eftirEign, enMapa(v["is.vaxtabaetur-hamark"], e.stada));
    const fjoldi = e.stada === "hjon" ? 2 : 1;
    return { vextir, frektekjur, mismunur, baetur: baetur / fjoldi < v["is.vaxtabaetur-lagmark"] ? 0 : baetur };
  },
  resultado: [
    { clave: "vextir", etiqueta: "Vaxtagjöld sem miðað er við", formato: "moneda" },
    { clave: "frektekjur", etiqueta: "Frádráttur vegna tekna", formato: "moneda" },
    { clave: "mismunur", etiqueta: "Mismunur", formato: "moneda" },
    { clave: "baetur", etiqueta: "Vaxtabætur", formato: "moneda", destacada: true },
  ],
});
