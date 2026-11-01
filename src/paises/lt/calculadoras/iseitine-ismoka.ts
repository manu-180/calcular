import { definirCalculadora, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.iseitine-ismoka",
  mercado: "lt",
  concepto: "indemnizacion-despido",
  slug: "iseitine-ismoka",
  estado: "borrador",
  requiere: {
    "lt.iseitine-menesiai": "mapa",
  },
  campos: [
    { id: "vidutinis", tipo: "moneda", etiqueta: "Vidutinis mėnesio darbo užmokestis", min: 0, porDefecto: 2000 },
    { id: "stazas", tipo: "opcion-dato", etiqueta: "Darbo stažas toje įmonėje", dato: "lt.iseitine-menesiai" },
  ],
  calcular(e, v, { redondear }) {
    const kiek = enMapa(v["lt.iseitine-menesiai"], e.stazas);
    return { ismoka: redondear(e.vidutinis * kiek), uzmokesciai: kiek };
  },
  resultado: [
    { clave: "ismoka", etiqueta: "Išeitinė išmoka ant popieriaus", formato: "moneda", destacada: true },
    { clave: "uzmokesciai", etiqueta: "Vidutinių užmokesčių skaičius", formato: "numero" },
  ],
});
