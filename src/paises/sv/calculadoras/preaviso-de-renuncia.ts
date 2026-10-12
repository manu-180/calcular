import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

// Arts. 2 y 8 de la ley de renuncia voluntaria: el preaviso se da con 15 o 30 días de antelación a la
// fecha en que la renuncia se hace efectiva, y el patrono paga la prestación dentro de los 15 días
// siguientes a esa fecha.
export default definirCalculadora({
  id: "sv.preaviso-de-renuncia",
  mercado: "sv",
  concepto: "preaviso",
  slug: "preaviso-de-renuncia",
  estado: "publicado",
  requiere: {
    "sv.renuncia-preaviso": "numero",
    "sv.renuncia-preaviso-jefaturas": "numero",
    "sv.renuncia-plazo-pago": "numero",
  },
  campos: [
    { id: "efectiva", tipo: "fecha", etiqueta: "Fecha en que quiere que la renuncia se haga efectiva" },
    {
      id: "puesto",
      tipo: "opcion",
      etiqueta: "Su puesto",
      opciones: [
        { valor: "general", etiqueta: "Trabajador en general" },
        { valor: "jefatura", etiqueta: "Director, gerente, jefatura o trabajador especializado" },
      ],
      porDefecto: "general",
    },
  ],
  calcular(entrada, valores) {
    const dias = entrada.puesto === "general" ? valores["sv.renuncia-preaviso"] : valores["sv.renuncia-preaviso-jefaturas"];
    return {
      dias,
      avisarAntesDe: sumarDias(entrada.efectiva, -dias),
      pagoHasta: sumarDias(entrada.efectiva, valores["sv.renuncia-plazo-pago"]),
      observaciones: [
        "El preaviso va por escrito y no reemplaza a la renuncia: la renuncia se firma en las hojas del Ministerio de Trabajo o de un juzgado laboral, o en documento autenticado.",
        "Pida al patrono una constancia con el día y la hora en que recibió su preaviso.",
      ],
    };
  },
  resultado: [
    { clave: "avisarAntesDe", etiqueta: "Entregue el preaviso a más tardar el", formato: "fecha", destacada: true },
    { clave: "dias", etiqueta: "Días de anticipación", formato: "dias" },
    { clave: "pagoHasta", etiqueta: "Le deben pagar la prestación a más tardar el", formato: "fecha" },
  ],
});
