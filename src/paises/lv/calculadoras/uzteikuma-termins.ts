import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.uzteikuma-termins",
  mercado: "lv",
  concepto: "preaviso",
  slug: "uzteikuma-termins",
  estado: "borrador",
  requiere: { "lv.uzteikums": "mapa" },
  campos: [
    { id: "pamats", tipo: "opcion-dato", dato: "lv.uzteikums", etiqueta: "Uzteikuma pamats", porDefecto: "menesis" },
  ],
  calcular(e, v) {
    return { dienas: enMapa(v["lv.uzteikums"], e.pamats) };
  },
  resultado: [
    { clave: "dienas", etiqueta: "Uzteikuma termiņš", formato: "dias", destacada: true },
  ],
});
