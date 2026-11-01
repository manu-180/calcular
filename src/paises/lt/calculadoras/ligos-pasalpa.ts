import { definirCalculadora, porcentaje } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.ligos-pasalpa",
  mercado: "lt",
  concepto: "propio",
  slug: "ligos-pasalpa",
  estado: "borrador",
  requiere: {
    "lt.ligos-procentas": "numero",
    "lt.ligos-darbdavio-dienos": "numero",
  },
  campos: [
    { id: "dienosUzmokestis", tipo: "moneda", etiqueta: "Vidutinis dienos užmokestis", min: 0, porDefecto: 90 },
    { id: "dienos", tipo: "entero", etiqueta: "Ligos dienos", min: 1, porDefecto: 7 },
  ],
  calcular(e, v, { redondear }) {
    const perDiena = porcentaje(e.dienosUzmokestis, v["lt.ligos-procentas"]);
    const darbdavio = Math.min(e.dienos, v["lt.ligos-darbdavio-dienos"]);
    return { viso: redondear(perDiena * e.dienos), darbdavys: redondear(perDiena * darbdavio), sodra: redondear(perDiena * (e.dienos - darbdavio)) };
  },
  resultado: [
    { clave: "viso", etiqueta: "Ligos pašalpa iš viso", formato: "moneda", destacada: true },
    { clave: "darbdavys", etiqueta: "Moka darbdavys", formato: "moneda" },
    { clave: "sodra", etiqueta: "Moka Sodra", formato: "moneda" },
  ],
});
