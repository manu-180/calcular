import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

// Art. 28: los primeros treinta días del contrato pueden pactarse de prueba. El día de inicio es el
// primero de esos treinta.
export default definirCalculadora({
  id: "sv.periodo-de-prueba",
  mercado: "sv",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "sv.periodo-prueba-dias": "numero",
  },
  campos: [{ id: "inicio", tipo: "fecha", etiqueta: "Primer día de trabajo", porDefecto: "hoy" }],
  calcular(entrada, valores) {
    const dias = valores["sv.periodo-prueba-dias"];
    const ultimo = sumarDias(entrada.inicio, dias - 1);
    return {
      ultimo,
      indefinido: sumarDias(ultimo, 1),
      dias,
      observaciones: [
        "Durante la prueba cualquiera de las partes puede terminar el contrato sin dar motivo.",
        "Si vuelven a contratarlo para el mismo trabajo antes de un año, el nuevo contrato no puede tener prueba.",
      ],
    };
  },
  resultado: [
    { clave: "ultimo", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
    { clave: "indefinido", etiqueta: "Desde este día su contrato es por tiempo indefinido", formato: "fecha" },
    { clave: "dias", etiqueta: "Duración de la prueba", formato: "dias" },
  ],
});
