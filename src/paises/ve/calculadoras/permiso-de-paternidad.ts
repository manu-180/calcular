import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../reglas";

export default definirCalculadora({
  id: "ve.permiso-de-paternidad",
  mercado: "ve",
  concepto: "propio",
  slug: "permiso-de-paternidad",
  estado: "publicado",
  requiere: {
    "ve.paternidad-dias": "numero",
    "ve.inamovilidad-anios": "numero",
  },
  campos: [{ id: "nacimiento", tipo: "fecha", etiqueta: "Fecha de nacimiento (o de la colocación familiar)", porDefecto: "hoy" }],
  calcular(entrada, valores) {
    const dias = valores["ve.paternidad-dias"];
    return {
      dias,
      ultimoDia: sumarDias(entrada.nacimiento, dias - 1),
      regreso: sumarDias(entrada.nacimiento, dias),
      finInamovilidad: sumarMeses(entrada.nacimiento, valores["ve.inamovilidad-anios"] * 12),
      observaciones: [
        "Los días son continuos: cuentan sábados, domingos y feriados.",
        "Si pides tus vacaciones justo después de la licencia, la empresa te las tiene que dar.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia remunerada", formato: "dias" },
    { clave: "ultimoDia", etiqueta: "Último día de licencia", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Vuelves a trabajar", formato: "fecha" },
    { clave: "finInamovilidad", etiqueta: "Inamovilidad laboral hasta", formato: "fecha" },
  ],
});
