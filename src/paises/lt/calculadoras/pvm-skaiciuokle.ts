import { definirCalculadora, porcentaje, enMapa } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.pvm-skaiciuokle",
  mercado: "lt",
  concepto: "iva",
  slug: "pvm-skaiciuokle",
  estado: "borrador",
  requiere: {
    "lt.pvm-tarifai": "mapa",
  },
  campos: [
    { id: "operacija", tipo: "opcion", etiqueta: "Ką norite apskaičiuoti", opciones: [{ valor: "prideti", etiqueta: "Pridėti PVM prie sumos" }, { valor: "isskirti", etiqueta: "Išskirti PVM iš sumos" }], porDefecto: "prideti" },
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 100 },
    { id: "tarifas", tipo: "opcion-dato", etiqueta: "PVM tarifas", dato: "lt.pvm-tarifai" },
  ],
  calcular(e, v, { redondear }) {
    const t = enMapa(v["lt.pvm-tarifai"], e.tarifas);
    const be = e.operacija === "prideti" ? e.suma : e.suma / (1 + t / 100);
    const pvm = redondear(porcentaje(be, t));
    return { suPvm: redondear(be + pvm), bePvm: redondear(be), pvm };
  },
  resultado: [
    { clave: "suPvm", etiqueta: "Suma su PVM", formato: "moneda", destacada: true },
    { clave: "bePvm", etiqueta: "Suma be PVM", formato: "moneda" },
    { clave: "pvm", etiqueta: "PVM", formato: "moneda" },
  ],
});
