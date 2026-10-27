import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diaDeSemana } from "../lib/fechas";
import { feriados } from "../lib/malta";

const DIAS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default definirCalculadora({
  id: "mt.public-holidays",
  mercado: "mt",
  concepto: "propio",
  slug: "public-holidays",
  estado: "publicado",
  requiere: { "mt.annual-leave-hours": "numero" },
  campos: [{ id: "anio", tipo: "entero", etiqueta: "Year", min: 2000, max: 2100, porDefecto: 2026 }],
  calcular(entrada, v) {
    if (entrada.anio < 2000 || entrada.anio > 2100) throw new ErrorEntrada("Pick a year between 2000 and 2100.", "anio");
    const lista = feriados(entrada.anio);
    const observaciones = lista.map((f) => {
      const [, m, d] = f.fecha.split("-").map(Number);
      return `${DIAS[diaDeSemana(f.fecha)]} ${d} ${MESES[m - 1]}: ${f.nombre}`;
    });
    const finde = lista.filter((f) => [0, 6].includes(diaDeSemana(f.fecha))).length;
    return {
      total: lista.length,
      finde,
      semana: lista.length - finde,
      licencia: v["mt.annual-leave-hours"] + finde * 8,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "National and public holidays", formato: "numero", decimales: 0, destacada: true },
    { clave: "semana", etiqueta: "On a weekday", formato: "numero", decimales: 0 },
    { clave: "finde", etiqueta: "On a Saturday or Sunday", formato: "numero", decimales: 0 },
    { clave: "licencia", etiqueta: "Annual leave that year on a 40-hour week", formato: "horas", decimales: 0 },
  ],
});
