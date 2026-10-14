import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "za.sick-leave",
  mercado: "za",
  concepto: "propio",
  slug: "sick-leave",
  estado: "publicado",
  requiere: {
    "za.sick-leave-weeks": "numero",
    "za.sick-leave-cycle-months": "numero",
    "za.sick-leave-early-days": "numero",
  },
  campos: [
    { id: "diasSemana", tipo: "entero", etiqueta: "Days you work in a week", min: 1, max: 7, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Months with your employer", min: 0, max: 600, porDefecto: 12 },
    { id: "trabajados", tipo: "entero", etiqueta: "Days worked so far (only in your first six months)", min: 0, max: 200, requerido: false },
    { id: "tomados", tipo: "entero", etiqueta: "Paid sick days already taken in this cycle", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    const ciclo = v["za.sick-leave-weeks"] * entrada.diasSemana;
    const mesesCiclo = v["za.sick-leave-cycle-months"];
    const observaciones: string[] = [];
    let disponibles: number;
    if (entrada.meses < 6) {
      if (entrada.trabajados === null) throw new ErrorEntrada("In your first six months, enter the days you have worked.", "trabajados");
      const ganados = Math.floor(entrada.trabajados / v["za.sick-leave-early-days"]);
      disponibles = Math.max(0, ganados - entrada.tomados);
      observaciones.push(`In your first six months you earn one paid sick day for every ${v["za.sick-leave-early-days"]} days worked. Days you take now can be taken off your first full cycle.`);
    } else {
      disponibles = Math.max(0, ciclo - entrada.tomados);
    }
    const mesEnCiclo = entrada.meses % mesesCiclo;
    return {
      ciclo,
      disponibles,
      mesesRestantes: mesesCiclo - mesEnCiclo,
      observaciones,
    };
  },
  resultado: [
    { clave: "disponibles", etiqueta: "Paid sick days you have left", formato: "dias", decimales: 0, destacada: true },
    { clave: "ciclo", etiqueta: "Paid sick days in a full cycle", formato: "dias", decimales: 0 },
    { clave: "mesesRestantes", etiqueta: "Months until a new cycle starts", formato: "meses", decimales: 0 },
  ],
});
