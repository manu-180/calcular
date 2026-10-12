import { definirCalculadora } from "@/motor/calculo";
import { diasEntre, sumarDias } from "../lib/fechas";

export default definirCalculadora({
  id: "co.preaviso",
  mercado: "co",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "co.preaviso-termino-fijo": "numero",
  },
  campos: [{ id: "vencimiento", tipo: "fecha", etiqueta: "Fecha en que vence el contrato a término fijo" }],
  calcular(entrada, valores, contexto) {
    const dias = valores["co.preaviso-termino-fijo"];
    const limite = sumarDias(entrada.vencimiento, -dias);
    const quedan = diasEntre(contexto.fecha, limite);
    return {
      limite,
      quedan: quedan >= 0 ? quedan : null,
      estado:
        quedan >= 0
          ? "Todavía estás a tiempo de avisar que no se renueva"
          : "Ya pasó el plazo: si nadie avisó, el contrato se renueva por el mismo término",
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "Último día para avisar", formato: "fecha", destacada: true },
    { clave: "quedan", etiqueta: "Días que quedan para avisar", formato: "dias" },
    { clave: "estado", etiqueta: "Situación", formato: "texto" },
  ],
});
