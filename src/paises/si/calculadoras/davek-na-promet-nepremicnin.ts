import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.davek-na-promet-nepremicnin",
  mercado: "si",
  concepto: "propio",
  slug: "davek-na-promet-nepremicnin",
  estado: "publicado",
  requiere: { "si.davek-promet-nepremicnin": "numero" },
  campos: [{ id: "cena", tipo: "moneda", etiqueta: "Prodajna cena nepremičnine", min: 0, porDefecto: 200000 }],
  calcular(e, v, { redondear }) {
    if (e.cena <= 0) throw new ErrorEntrada("Vnesite prodajno ceno, večjo od nič.", "cena");
    const davek = redondear(porcentaje(e.cena, v["si.davek-promet-nepremicnin"]));
    return { davek, ostane: redondear(e.cena - davek) };
  },
  resultado: [
    { clave: "davek", etiqueta: "Davek na promet nepremičnin", formato: "moneda", destacada: true },
    { clave: "ostane", etiqueta: "Prodajalcu ostane po davku", formato: "moneda" },
  ],
});
