import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, sumarDias } from "@/motor/vigencia";
import { diaDeSemana, fechaChilena, feriadoEnCalendario } from "../lib/fechas";

export default definirCalculadora({
  id: "cl.dias-de-vacaciones",
  mercado: "cl",
  concepto: "propio",
  slug: "dias-de-vacaciones",
  estado: "publicado",
  requiere: {
    "cl.feriado-anual": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Primer día de vacaciones", porDefecto: "hoy" },
    { id: "habiles", tipo: "entero", etiqueta: "Días hábiles que vas a tomar", min: 1, max: 60, porDefecto: 15 },
  ],
  calcular(entrada, valores) {
    if (entrada.habiles > 60) throw new ErrorEntrada("Revisa los días: puedes acumular como máximo dos períodos de vacaciones.", "habiles");
    const dow = diaDeSemana(entrada.inicio);
    if (dow === 0 || dow === 6) throw new ErrorEntrada("Las vacaciones se cuentan en días hábiles: elige un día de lunes a viernes para empezar.", "inicio");
    // Código del Trabajo, artículo 69: el sábado es siempre inhábil para el feriado.
    const calendario = feriadoEnCalendario(sumarDias(entrada.inicio, -1), entrada.habiles);
    let regreso = sumarDias(calendario.hasta, 1);
    while (diaDeSemana(regreso) === 0 || diaDeSemana(regreso) === 6) regreso = sumarDias(regreso, 1);
    const observaciones = ["Si en esos días cae un festivo de lunes a viernes, no se descuenta de tus vacaciones: suma un día más por cada uno."];
    if (entrada.habiles > valores["cl.feriado-anual"]) observaciones.push("Tomas más días que un año de feriado legal: sirve si tienes feriado progresivo o días acumulados.");
    return {
      ultimoDia: fechaChilena(calendario.hasta),
      regreso: fechaChilena(regreso),
      corridos: diasEntre(entrada.inicio, regreso),
      inhabiles: calendario.inhabiles,
      observaciones,
    };
  },
  resultado: [
    { clave: "regreso", etiqueta: "Vuelves a trabajar el", formato: "texto", destacada: true },
    { clave: "ultimoDia", etiqueta: "Último día de vacaciones hábil", formato: "texto" },
    { clave: "corridos", etiqueta: "Días corridos fuera del trabajo", formato: "dias" },
    { clave: "inhabiles", etiqueta: "Sábados y domingos en medio", formato: "dias" },
  ],
});
