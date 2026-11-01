import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.nedarbo-ismoka",
  mercado: "lt",
  concepto: "propio",
  slug: "nedarbo-ismoka",
  estado: "borrador",
  requiere: {
    "lt.mma": "numero",
    "lt.nedarbo-fiksuota": "numero",
    "lt.nedarbo-kintama": "mapa",
    "lt.nedarbo-lubos": "numero",
  },
  campos: [
    { id: "vidutinis", tipo: "moneda", etiqueta: "Vidutinis mėnesio darbo užmokestis", min: 0, porDefecto: 2000 },
    { id: "laikotarpis", tipo: "opcion-dato", etiqueta: "Išmokos laikotarpis", dato: "lt.nedarbo-kintama" },
  ],
  calcular(e, v, { redondear }) {
    const pastovi = porcentaje(v["lt.mma"], v["lt.nedarbo-fiksuota"]);
    const kintama = porcentaje(e.vidutinis, enMapa(v["lt.nedarbo-kintama"], e.laikotarpis));
    return { ismoka: redondear(Math.min(pastovi + kintama, v["lt.nedarbo-lubos"])), pastovi: redondear(pastovi), kintama: redondear(kintama) };
  },
  resultado: [
    { clave: "ismoka", etiqueta: "Nedarbo išmoka per mėnesį", formato: "moneda", destacada: true },
    { clave: "pastovi", etiqueta: "Pastovioji dalis", formato: "moneda" },
    { clave: "kintama", etiqueta: "Kintamoji dalis", formato: "moneda" },
  ],
});
