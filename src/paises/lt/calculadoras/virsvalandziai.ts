import { definirCalculadora } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.virsvalandziai",
  mercado: "lt",
  concepto: "horas-extra",
  slug: "virsvalandziai",
  estado: "borrador",
  requiere: {
    "lt.virsvalandziu-koeficientas": "numero",
  },
  campos: [
    { id: "valandinis", tipo: "moneda", etiqueta: "Valandinis atlygis", min: 0, porDefecto: 12 },
    { id: "valandos", tipo: "numero", etiqueta: "Viršvalandžių skaičius", min: 0, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    const koef = v["lt.virsvalandziu-koeficientas"];
    return { apmokejimas: redondear(e.valandinis * koef * e.valandos), uzValanda: redondear(e.valandinis * koef), koef };
  },
  resultado: [
    { clave: "apmokejimas", etiqueta: "Apmokėjimas už viršvalandžius", formato: "moneda", destacada: true },
    { clave: "uzValanda", etiqueta: "Už vieną valandą", formato: "moneda" },
    { clave: "koef", etiqueta: "Koeficientas", formato: "numero" },
  ],
});
