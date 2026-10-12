import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "cr.periodo-de-prueba",
  mercado: "cr",
  concepto: "propio",
  slug: "periodo-de-prueba",
  estado: "publicado",
  requiere: {
    "cr.periodo-prueba-meses": "numero",
  },
  campos: [{ id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso", porDefecto: "hoy" }],
  calcular(entrada, valores) {
    const desde = sumarMeses(entrada.fechaIngreso, valores["cr.periodo-prueba-meses"]);
    return {
      meses: valores["cr.periodo-prueba-meses"],
      fin: sumarDias(desde, -1),
      desde,
      observaciones: [
        "Durante esos meses cualquiera de las partes puede terminar el contrato sin preaviso ni cesantía. Sí se pagan las vacaciones y el aguinaldo proporcionales.",
      ],
    };
  },
  resultado: [
    { clave: "meses", etiqueta: "Duración", formato: "meses" },
    { clave: "fin", etiqueta: "Último día del período de prueba", formato: "fecha", destacada: true },
    { clave: "desde", etiqueta: "Desde este día ya hay preaviso y cesantía", formato: "fecha" },
  ],
});
