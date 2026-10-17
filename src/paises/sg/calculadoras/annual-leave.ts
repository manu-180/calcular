import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.annual-leave",
  mercado: "sg",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "sg.vacaciones-dias": "mapa",
    "sg.meses-minimos-licencias": "numero",
  },
  campos: [
    { id: "anio", tipo: "entero", etiqueta: "Which year of service are you in?", min: 1, max: 60, porDefecto: 1, ayuda: "Your first year runs from your start date to the day before your first work anniversary." },
    { id: "meses", tipo: "entero", etiqueta: "Completed months of service in that year", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anio < 1) throw new ErrorEntrada("Your year of service starts at 1.", "anio");
    if (entrada.meses < 0 || entrada.meses > 12) throw new ErrorEntrada("Enter between 0 and 12 months.", "meses");
    const tabla = v["sg.vacaciones-dias"];
    const ultimo = Math.max(...Object.keys(tabla).map(Number));
    const derecho = enMapa(tabla, String(Math.min(entrada.anio, ultimo)));
    const minimo = v["sg.meses-minimos-licencias"];
    const observaciones: string[] = [];
    let dias: number;
    if (entrada.anio === 1 && entrada.meses < minimo) {
      dias = 0;
      observaciones.push(`You can take paid annual leave once you have worked for your employer for ${minimo} months.`);
    } else {
      const exacto = (entrada.meses / 12) * derecho;
      dias = Math.floor(exacto + 0.5);
      if (entrada.meses < 12) observaciones.push(`Pro-rated: ${entrada.meses} ÷ 12 × ${derecho} = ${redondear(exacto)} days, rounded to ${dias}.`);
    }
    observaciones.push("This is the minimum for employees covered by the Employment Act.");
    return { dias, derecho, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Paid annual leave you have earned", formato: "dias", destacada: true },
    { clave: "derecho", etiqueta: "Full entitlement for this year of service", formato: "dias" },
  ],
});
