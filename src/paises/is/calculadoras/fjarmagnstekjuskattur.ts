import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.fjarmagnstekjuskattur",
  mercado: "is",
  concepto: "propio",
  slug: "fjarmagnstekjuskattur",
  estado: "publicado",
  requiere: { "is.fjarmagnstekjuskattur": "numero", "is.fjarmagn-fritekjumark": "mapa" },
  campos: [
    { id: "vextir", tipo: "moneda", etiqueta: "Vaxtatekjur, arður og söluhagnaður af skráðum hlutabréfum", ayuda: "Af þessum tekjum dregst frítekjumarkið.", min: 0, porDefecto: 500000 },
    { id: "adrar", tipo: "moneda", etiqueta: "Aðrar fjármagnstekjur", min: 0, porDefecto: 0 },
    { id: "hjon", tipo: "si-no", etiqueta: "Hjón eða samskattað sambúðarfólk", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.vextir + e.adrar <= 0) throw new ErrorEntrada("Sláðu inn tekjur hærri en núll.", "vextir");
    const fritekjumark = enMapa(v["is.fjarmagn-fritekjumark"], e.hjon ? "hjon" : "einstaklingur");
    const stofn = Math.max(0, e.vextir - fritekjumark) + e.adrar;
    const skattur = redondear(porcentaje(stofn, v["is.fjarmagnstekjuskattur"]));
    return { fritekjumark, stofn, skattur, eftir: e.vextir + e.adrar - skattur };
  },
  resultado: [
    { clave: "fritekjumark", etiqueta: "Frítekjumark", formato: "moneda" },
    { clave: "stofn", etiqueta: "Skattstofn", formato: "moneda" },
    { clave: "skattur", etiqueta: "Fjármagnstekjuskattur", formato: "moneda", destacada: true },
    { clave: "eftir", etiqueta: "Eftir skatt", formato: "moneda" },
  ],
});
