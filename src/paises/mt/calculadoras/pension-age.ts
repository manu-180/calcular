import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";
import { anioDe, sumarMeses } from "../lib/fechas";

function grupo(anio: number): string {
  if (anio <= 1951) return "born-1951-or-before";
  if (anio <= 1955) return "born-1952-1955";
  if (anio <= 1958) return "born-1956-1958";
  if (anio <= 1961) return "born-1959-1961";
  return "born-1962-or-after";
}

export default definirCalculadora({
  id: "mt.pension-age",
  mercado: "mt",
  concepto: "jubilacion",
  slug: "pension-age",
  estado: "publicado",
  requiere: { "mt.pension-age": "mapa" },
  campos: [
    { id: "nacimiento", tipo: "fecha", etiqueta: "Date of birth", porDefecto: "1970-06-15" },
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "Sex (only matters if born in 1951 or before)",
      opciones: [
        { valor: "male", etiqueta: "Male" },
        { valor: "female", etiqueta: "Female" },
      ],
      porDefecto: "male",
    },
  ],
  calcular(entrada, v, { fecha }) {
    if (!esFechaISO(entrada.nacimiento)) throw new ErrorEntrada("Enter your date of birth.", "nacimiento");
    if (entrada.nacimiento > fecha) throw new ErrorEntrada("The date of birth cannot be in the future.", "nacimiento");
    const anio = anioDe(entrada.nacimiento);
    const clave = anio <= 1951 && entrada.sexo === "female" ? "women-1951-or-before" : grupo(anio);
    const edad = enMapa(v["mt.pension-age"], clave);
    const llega: FechaISO = sumarMeses(entrada.nacimiento, edad * 12);
    const observaciones: string[] = [];
    observaciones.push(llega <= fecha ? "You have already reached pension age." : "A contributory pension also depends on the number of years of contributions you have paid or been credited.");
    return { edad, llega, observaciones };
  },
  resultado: [
    { clave: "edad", etiqueta: "Your pension age", formato: "anios", destacada: true },
    { clave: "llega", etiqueta: "You reach it on", formato: "fecha" },
  ],
});
