import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.iprem",
  mercado: "es",
  concepto: "conversor-unidad",
  slug: "iprem",
  estado: "publicado",
  requiere: {
    "es.iprem-mensual": "numero",
  },
  campos: [
    {
      id: "veces",
      tipo: "numero",
      etiqueta: "Veces el IPREM",
      min: 0,
      porDefecto: 1,
      ayuda: "Por ejemplo, 1,5 si una ayuda pide ingresos de hasta 1,5 veces el IPREM, o 0,8 para el 80 %.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = valores["es.iprem-mensual"] * entrada.veces;
    return {
      mensual: redondear(mensual),
      anual12: redondear(mensual * 12),
      anual14: redondear(mensual * 14),
      diario: redondear(mensual / 30),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Al mes", formato: "moneda", destacada: true },
    { clave: "anual12", etiqueta: "Al año en 12 pagas", formato: "moneda" },
    { clave: "anual14", etiqueta: "Al año en 14 pagas", formato: "moneda" },
    { clave: "diario", etiqueta: "Al día", formato: "moneda" },
  ],
});
