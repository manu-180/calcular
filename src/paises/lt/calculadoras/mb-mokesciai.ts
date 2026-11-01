import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.mb-mokesciai",
  mercado: "lt",
  concepto: "propio",
  slug: "mb-mokesciai",
  estado: "borrador",
  requiere: {
    "lt.pelno-mokestis": "mapa",
    "lt.gpm-dividendai": "numero",
  },
  campos: [
    { id: "pelnas", tipo: "moneda", etiqueta: "Mažosios bendrijos pelnas per metus", min: 0, porDefecto: 20000 },
    { id: "tarifas", tipo: "opcion-dato", etiqueta: "Pelno mokesčio tarifas", dato: "lt.pelno-mokestis" },
    { id: "skirstyti", tipo: "si-no", etiqueta: "Skirstote pelną nariams", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    const pelnoMokestis = redondear(porcentaje(e.pelnas, enMapa(v["lt.pelno-mokestis"], e.tarifas)));
    const grynasis = e.pelnas - pelnoMokestis;
    const gpm = e.skirstyti ? redondear(porcentaje(grynasis, v["lt.gpm-dividendai"])) : 0;
    return { lieka: redondear(grynasis - gpm), pelnoMokestis, gpm };
  },
  resultado: [
    { clave: "lieka", etiqueta: "Lieka po mokesčių", formato: "moneda", destacada: true },
    { clave: "pelnoMokestis", etiqueta: "Pelno mokestis", formato: "moneda" },
    { clave: "gpm", etiqueta: "GPM nuo paskirstyto pelno", formato: "moneda" },
  ],
});
