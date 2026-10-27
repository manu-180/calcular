import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "gm.retirement-age",
  mercado: "gm",
  concepto: "propio",
  slug: "retirement-age",
  estado: "publicado",
  requiere: {
    "gm.retirement-age": "numero",
  },
  campos: [{ id: "nacimiento", tipo: "fecha", etiqueta: "Date of birth", min: "1940-01-01", porDefecto: "1980-01-01" }],
  calcular(entrada, v, { fecha }) {
    if (entrada.nacimiento > fecha) throw new ErrorEntrada("The date of birth cannot be in the future.", "nacimiento");
    const edad = v["gm.retirement-age"];
    const retiro = sumarMeses(entrada.nacimiento, edad * 12);
    const faltan = diasEntre(fecha, retiro);
    let anios = 0;
    while (sumarMeses(fecha, (anios + 1) * 12) <= retiro) anios++;
    let meses = 0;
    while (sumarMeses(fecha, anios * 12 + meses + 1) <= retiro) meses++;
    return {
      retiro,
      edad,
      anios: faltan > 0 ? anios : 0,
      meses: faltan > 0 ? meses : 0,
      observaciones: faltan <= 0 ? ["You have already reached the retirement age. A contract can still set a later retirement age."] : [],
    };
  },
  resultado: [
    { clave: "retiro", etiqueta: "You reach retirement age on", formato: "fecha", destacada: true },
    { clave: "edad", etiqueta: "Retirement age", formato: "anios" },
    { clave: "anios", etiqueta: "Years to go", formato: "anios" },
    { clave: "meses", etiqueta: "And months", formato: "meses" },
  ],
});
