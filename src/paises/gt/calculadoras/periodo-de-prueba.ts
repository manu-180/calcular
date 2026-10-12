import { definirCalculadora } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../prestaciones";

export default definirCalculadora({
  id: "gt.periodo-de-prueba",
  mercado: "gt",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "gt.periodo-prueba-meses": "numero",
  },
  campos: [{ id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar", porDefecto: "hoy" }],
  calcular(entrada, valores, { fecha }) {
    const fin = sumarDias(sumarMeses(entrada.fechaIngreso, valores["gt.periodo-prueba-meses"]), -1);
    const restantes = fecha > fin ? 0 : diasEntre(fecha < entrada.fechaIngreso ? entrada.fechaIngreso : fecha, fin) + 1;
    return {
      fin,
      restantes,
      observaciones: [
        restantes > 0
          ? "Mientras dure, usted o su patrono pueden terminar el contrato sin aviso y sin indemnización."
          : "El período de prueba ya terminó: desde ahora rigen el aviso previo y la indemnización.",
        "Vale para contratos por tiempo indefinido. Pueden pactar un período más corto, nunca más largo.",
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "El período de prueba termina el", formato: "fecha", destacada: true },
    { clave: "restantes", etiqueta: "Días que faltan", formato: "dias" },
  ],
});
