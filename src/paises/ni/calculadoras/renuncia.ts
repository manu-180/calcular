import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ni.renuncia",
  mercado: "ni",
  concepto: "preaviso",
  slug: "renuncia",
  estado: "publicado",
  requiere: {
    "ni.preaviso-renuncia": "numero",
  },
  campos: [{ id: "aviso", tipo: "fecha", etiqueta: "Día en que entregás la carta de renuncia", porDefecto: "hoy" }],
  calcular(entrada, valores) {
    const dias = valores["ni.preaviso-renuncia"];
    return {
      dias,
      ultimoDia: sumarDias(entrada.aviso, dias),
      observaciones: [
        "El aviso va por escrito y vale para contratos por tiempo indeterminado. En el campo se puede avisar de palabra, frente a dos testigos.",
        "Al renunciar te pagan el aguinaldo y las vacaciones proporcionales, y lo que ganaste por antigüedad.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Anticipación que pide la ley", formato: "dias" },
    { clave: "ultimoDia", etiqueta: "Fecha en que termina el contrato", formato: "fecha", destacada: true },
  ],
});
