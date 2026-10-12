import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ec.licencia-paternidad",
  mercado: "ec",
  concepto: "propio",
  slug: "licencia-paternidad",
  estado: "publicado",
  requiere: {
    "ec.paternidad-dias": "numero",
    "ec.paternidad-cesarea-dias": "numero",
    "ec.paternidad-prematuro-dias": "numero",
    "ec.paternidad-grave-dias": "numero",
  },
  campos: [
    { id: "nacimiento", tipo: "fecha", etiqueta: "Fecha de nacimiento", porDefecto: "hoy" },
    {
      id: "parto",
      tipo: "opcion",
      etiqueta: "Tipo de parto",
      opciones: [
        { valor: "normal", etiqueta: "Parto normal" },
        { valor: "cesarea", etiqueta: "Cesárea o nacimiento múltiple" },
      ],
      porDefecto: "normal",
    },
    { id: "prematuro", tipo: "si-no", etiqueta: "Nació prematuro o necesita cuidados especiales", porDefecto: false },
    {
      id: "grave",
      tipo: "si-no",
      etiqueta: "Nació con una enfermedad degenerativa, terminal o irreversible, o con discapacidad severa",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores) {
    const base = valores["ec.paternidad-dias"] + (entrada.parto === "cesarea" ? valores["ec.paternidad-cesarea-dias"] : 0) + (entrada.prematuro ? valores["ec.paternidad-prematuro-dias"] : 0);
    const dias = entrada.grave ? Math.max(base, valores["ec.paternidad-grave-dias"]) : base;
    const fin = sumarDias(entrada.nacimiento, dias - 1);
    return {
      dias,
      fin,
      regreso: sumarDias(fin, 1),
      observaciones: ["La licencia es con remuneración completa. Justifícala con el certificado médico del IESS o de otro profesional."],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia por paternidad", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "Último día de la licencia", formato: "fecha" },
    { clave: "regreso", etiqueta: "Vuelves al trabajo", formato: "fecha" },
  ],
});
