import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "is.orlofslaun",
  mercado: "is",
  concepto: "vacaciones",
  slug: "orlofslaun",
  estado: "publicado",
  requiere: { "is.orlofsprosenta": "mapa" },
  campos: [
    { id: "laun", tipo: "moneda", etiqueta: "Heildarlaun á tímabilinu", min: 0, porDefecto: 700000 },
    { id: "orlof", tipo: "opcion-dato", dato: "is.orlofsprosenta", etiqueta: "Lengd orlofs", ayuda: "Lengra orlof en 24 dagar kemur úr kjarasamningi.", porDefecto: "d24" },
  ],
  calcular(e, v, { redondear }) {
    if (e.laun <= 0) throw new ErrorEntrada("Sláðu inn laun hærri en núll.", "laun");
    const hlutfall = enMapa(v["is.orlofsprosenta"], e.orlof);
    const orlofslaun = redondear(porcentaje(e.laun, hlutfall));
    return { hlutfall, orlofslaun, samtals: e.laun + orlofslaun };
  },
  resultado: [
    { clave: "hlutfall", etiqueta: "Orlofsprósenta", formato: "porcentaje", decimales: 2 },
    { clave: "orlofslaun", etiqueta: "Orlofslaun", formato: "moneda", destacada: true },
    { clave: "samtals", etiqueta: "Laun og orlofslaun", formato: "moneda" },
  ],
});
