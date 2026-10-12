import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../lib/fechas";

const DIAS_POR_SEMANA = 7;

export default definirCalculadora({
  id: "ec.licencia-maternidad",
  mercado: "ec",
  concepto: "propio",
  slug: "licencia-maternidad",
  estado: "publicado",
  requiere: {
    "ec.maternidad-semanas": "numero",
    "ec.maternidad-multiple-dias": "numero",
    "ec.lactancia-meses": "numero",
    "ec.lactancia-jornada-horas": "numero",
  },
  campos: [
    {
      id: "inicio",
      tipo: "fecha",
      etiqueta: "Fecha del parto o de inicio de la licencia",
      ayuda: "La que figura en el certificado médico.",
      porDefecto: "hoy",
    },
    { id: "multiple", tipo: "si-no", etiqueta: "Es un nacimiento múltiple (mellizos, trillizos)", porDefecto: false },
  ],
  calcular(entrada, valores) {
    const dias = valores["ec.maternidad-semanas"] * DIAS_POR_SEMANA + (entrada.multiple ? valores["ec.maternidad-multiple-dias"] : 0);
    const fin = sumarDias(entrada.inicio, dias - 1);
    const regreso = sumarDias(fin, 1);
    const finLactancia = sumarDias(sumarMeses(regreso, valores["ec.lactancia-meses"]), -1);
    return {
      dias,
      fin,
      regreso,
      jornadaLactancia: valores["ec.lactancia-jornada-horas"],
      finLactancia,
      observaciones: [
        "Durante la licencia cobras tu remuneración completa y no te pueden despedir.",
        "Si la madre fallece en el parto o durante la licencia, el padre puede usar el tiempo que falte.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia", formato: "dias" },
    { clave: "fin", etiqueta: "Último día de la licencia", formato: "fecha", destacada: true },
    { clave: "regreso", etiqueta: "Vuelves al trabajo", formato: "fecha" },
    { clave: "jornadaLactancia", etiqueta: "Jornada diaria durante la lactancia", formato: "horas" },
    { clave: "finLactancia", etiqueta: "Último día de la jornada de lactancia", formato: "fecha" },
  ],
});
