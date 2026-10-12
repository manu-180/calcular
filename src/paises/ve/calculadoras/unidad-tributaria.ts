import { definirCalculadora } from "@/motor/calculo";

// Borrador: el valor de la UT no se pudo leer en fuente primaria https (ver datos.json).
export default definirCalculadora({
  id: "ve.unidad-tributaria",
  mercado: "ve",
  concepto: "conversor-unidad",
  slug: "unidad-tributaria",
  estado: "borrador",
  requiere: {
    "ve.unidad-tributaria": "numero",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "ut-a-bs", etiqueta: "Unidades tributarias a bolívares" },
        { valor: "bs-a-ut", etiqueta: "Bolívares a unidades tributarias" },
      ],
      porDefecto: "ut-a-bs",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ut = valores["ve.unidad-tributaria"];
    return entrada.direccion === "ut-a-bs"
      ? { ut, bolivares: redondear(entrada.monto * ut), unidades: null }
      : { ut, bolivares: null, unidades: redondear(entrada.monto / ut) };
  },
  resultado: [
    { clave: "ut", etiqueta: "Valor de la unidad tributaria", formato: "moneda", moneda: "VES" },
    { clave: "bolivares", etiqueta: "Valor en bolívares", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "unidades", etiqueta: "Unidades tributarias", formato: "numero", decimales: 2, destacada: true },
  ],
});
