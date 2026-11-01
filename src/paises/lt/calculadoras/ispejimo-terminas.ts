import { definirCalculadora, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.ispejimo-terminas",
  mercado: "lt",
  concepto: "preaviso",
  slug: "ispejimo-terminas",
  estado: "borrador",
  requiere: {
    "lt.ispejimo-dienos": "mapa",
    "lt.ispejimo-daugiklis": "numero",
  },
  campos: [
    { id: "stazas", tipo: "opcion-dato", etiqueta: "Darbo stažas toje įmonėje", dato: "lt.ispejimo-dienos" },
    { id: "saugomas", tipo: "si-no", etiqueta: "Jums taikomas ilgesnis įspėjimo terminas", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const dienos = enMapa(v["lt.ispejimo-dienos"], e.stazas);
    return { terminas: e.saugomas ? dienos * v["lt.ispejimo-daugiklis"] : dienos, iprastas: dienos };
  },
  resultado: [
    { clave: "terminas", etiqueta: "Įspėjimo terminas", formato: "dias", destacada: true },
    { clave: "iprastas", etiqueta: "Įprastas terminas", formato: "dias" },
  ],
});
