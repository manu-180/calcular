import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { sumarMeses } from "../lib/comun";

export default definirCalculadora({
  id: "ls.notice-period",
  mercado: "ls",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "ls.notice-weeks": "mapa",
    "ls.notice-months": "numero",
    "ls.hours-divisor": "mapa",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Completed months of continuous employment", min: 0, max: 600, porDefecto: 18 },
    { id: "salario", tipo: "moneda", etiqueta: "Your monthly wage", min: 0, porDefecto: 6000 },
    { id: "aviso", tipo: "fecha", etiqueta: "Date the written notice is given", porDefecto: "hoy" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const semanal = (entrada.salario / v["ls.hours-divisor"]["monthly"]) * v["ls.hours-divisor"]["weekly"];
    let semanas: number | null = null;
    let meses: number | null = null;
    if (entrada.meses >= 12) meses = v["ls.notice-months"];
    else semanas = enMapa(v["ls.notice-weeks"], entrada.meses >= 6 ? "6-to-12-months" : "under-6-months");
    // El día en que se entrega el aviso no cuenta (s. 132): el plazo corre desde el día siguiente.
    const fin = meses !== null ? sumarMeses(entrada.aviso, meses) : sumarDias(entrada.aviso, (semanas ?? 0) * 7);
    const pago = redondear(meses !== null ? entrada.salario * meses : semanal * (semanas ?? 0));
    return {
      semanas,
      meses,
      fin,
      pago,
      observaciones: ["Your contract can give a longer notice period than the legal minimum. If it does, the longer one applies."],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Last day of the notice period", formato: "fecha", destacada: true },
    { clave: "semanas", etiqueta: "Minimum notice", formato: "semanas" },
    { clave: "meses", etiqueta: "Minimum notice", formato: "meses" },
    { clave: "pago", etiqueta: "Payment in lieu of notice", formato: "moneda" },
  ],
});
