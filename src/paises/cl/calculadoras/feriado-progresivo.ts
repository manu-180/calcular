import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, fechaChilena, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "cl.feriado-progresivo",
  mercado: "cl",
  concepto: "propio",
  slug: "feriado-progresivo",
  estado: "publicado",
  requiere: {
    "cl.feriado-anual": "numero",
    "cl.feriado-anual-austral": "numero",
    "cl.feriado-progresivo-anios-base": "numero",
    "cl.feriado-progresivo-cada": "numero",
    "cl.feriado-progresivo-tope-anteriores": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que entraste a tu trabajo actual" },
    { id: "fecha", tipo: "fecha", etiqueta: "Fecha a la que quieres calcular", porDefecto: "hoy" },
    {
      id: "aniosAnteriores",
      tipo: "entero",
      etiqueta: "Años cotizados con empleadores anteriores",
      ayuda: "Años completos que puedas acreditar, por ejemplo con tu certificado de cotizaciones de la AFP.",
      min: 0,
      max: 60,
      porDefecto: 0,
    },
    { id: "zonaAustral", tipo: "si-no", etiqueta: "Trabajas en Magallanes, Aysén o Palena", porDefecto: false },
  ],
  calcular(entrada, valores) {
    if (entrada.fecha < entrada.inicio) throw new ErrorEntrada("La fecha del cálculo tiene que ser posterior a tu fecha de ingreso.", "fecha");
    const base = valores["cl.feriado-progresivo-anios-base"];
    const cada = valores["cl.feriado-progresivo-cada"];
    const anteriores = Math.min(entrada.aniosAnteriores, valores["cl.feriado-progresivo-tope-anteriores"]);
    const actuales = antiguedad(entrada.inicio, entrada.fecha).anios;
    const total = anteriores + actuales;
    const diasProgresivos = total >= base + cada ? Math.floor((total - base) / cada) : 0;
    const feriadoBase = entrada.zonaAustral ? valores["cl.feriado-anual-austral"] : valores["cl.feriado-anual"];
    const aniosParaElSiguiente = base + cada * (diasProgresivos + 1) - anteriores;
    const proximo = sumarMeses(entrada.inicio, 12 * aniosParaElSiguiente);

    const observaciones: string[] = [];
    if (entrada.aniosAnteriores > anteriores) observaciones.push(`De tus empleadores anteriores cuentan solo ${anteriores} años.`);
    if (diasProgresivos === 0) observaciones.push(`Todavía no tienes feriado progresivo. Lo empiezas a ganar cuando sumas ${base + cada} años de trabajo.`);
    return {
      aniosContados: total,
      diasProgresivos,
      feriadoBase,
      feriadoTotal: feriadoBase + diasProgresivos,
      proximoDia: fechaChilena(proximo),
      observaciones,
    };
  },
  resultado: [
    { clave: "diasProgresivos", etiqueta: "Días de feriado progresivo", formato: "dias", destacada: true },
    { clave: "feriadoTotal", etiqueta: "Vacaciones al año (días hábiles)", formato: "dias" },
    { clave: "feriadoBase", etiqueta: "Feriado legal básico", formato: "dias" },
    { clave: "aniosContados", etiqueta: "Años de trabajo que cuentan", formato: "anios" },
    { clave: "proximoDia", etiqueta: "Ganas un día más el", formato: "texto" },
  ],
});
