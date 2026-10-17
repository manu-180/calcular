import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.urlaubsanspruch-rechner",
  mercado: "at",
  concepto: "vacaciones",
  slug: "urlaubsanspruch-rechner",
  estado: "publicado",
  requiere: { "at.urlaub": "mapa" },
  campos: [
    { id: "arbeitstage", tipo: "entero", etiqueta: "Arbeitstage pro Woche", min: 1, max: 6, porDefecto: 5 },
    { id: "dienstjahre", tipo: "entero", etiqueta: "Vollendete Dienstjahre beim selben Arbeitgeber", min: 0, max: 60, porDefecto: 3 },
    { id: "monate", tipo: "entero", etiqueta: "Nur im ersten Arbeitsjahr: Monate seit Beginn", min: 0, max: 12, requerido: false, ayuda: "In den ersten sechs Monaten entsteht der Urlaub anteilig." },
  ],
  calcular(entrada, valores) {
    const u = valores["at.urlaub"];
    const lang = entrada.dienstjahre >= 25;
    let werktage = lang ? u["ab-25-dienstjahren"] : u.regel;
    const observaciones: string[] = [];
    if (entrada.dienstjahre === 0 && entrada.monate !== null && entrada.monate < 6) {
      werktage = (werktage * entrada.monate) / 12;
      observaciones.push("Im ersten Halbjahr entsteht der Urlaub anteilig. Nach sechs Monaten steht der volle Jahresurlaub zu.");
    }
    if (lang) observaciones.push("Nach 25 Dienstjahren beim selben Arbeitgeber haben Sie Anspruch auf sechs Wochen Urlaub.");
    return {
      arbeitstage: (werktage * entrada.arbeitstage) / 6,
      wochen: werktage / 6,
      werktage,
      observaciones,
    };
  },
  resultado: [
    { clave: "arbeitstage", etiqueta: "Urlaubstage im Jahr (in Ihren Arbeitstagen)", formato: "dias", decimales: 1, destacada: true },
    { clave: "wochen", etiqueta: "Urlaubswochen", formato: "numero", decimales: 1 },
    { clave: "werktage", etiqueta: "Werktage (bei einer Sechstagewoche)", formato: "dias", decimales: 1 },
  ],
});
