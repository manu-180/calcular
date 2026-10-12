import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "../fechas";

export default definirCalculadora({
  id: "pe.preaviso-de-renuncia",
  mercado: "pe",
  concepto: "preaviso",
  slug: "preaviso-de-renuncia",
  estado: "publicado",
  requiere: {
    "pe.preaviso-renuncia": "numero",
  },
  campos: [
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Día en que entregas tu carta de renuncia", porDefecto: "hoy" },
    {
      id: "exoneracion",
      tipo: "si-no",
      etiqueta: "Vas a pedir que te exoneren del plazo",
      ayuda: "Puedes pedir irte antes en la misma carta.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores) {
    const dias = valores["pe.preaviso-renuncia"];
    const ultimoDia = sumarDias(entrada.fechaAviso, dias);
    const respuestaHasta = entrada.exoneracion ? sumarDias(entrada.fechaAviso, 3) : null;
    const observaciones: string[] = [];
    if (entrada.exoneracion) {
      observaciones.push("Si tu empleador no rechaza por escrito tu pedido de exoneración dentro del tercer día, se entiende aceptado y puedes irte antes.");
    }
    observaciones.push("Tu empleador también puede exonerarte del plazo por su cuenta. Tu liquidación te la pagan dentro de las 48 horas de tu último día.");
    return { dias, ultimoDia, respuestaHasta, observaciones };
  },
  resultado: [
    { clave: "ultimoDia", etiqueta: "Último día de trabajo si cumples el plazo", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Días de anticipación", formato: "dias" },
    { clave: "respuestaHasta", etiqueta: "Fecha límite para que rechacen tu exoneración", formato: "fecha" },
  ],
});
