import { definirCalculadora } from "@/motor/calculo";
import { antiguedad, diasDeVacaciones } from "../nomina";

export default definirCalculadora({
  id: "mx.antiguedad-laboral",
  mercado: "mx",
  concepto: "propio",
  slug: "antiguedad-laboral",
  estado: "publicado",
  requiere: {
    "mx.vacaciones-primer-anio": "numero",
    "mx.dias-prima-antiguedad": "numero",
    "mx.anios-prima-antiguedad-renuncia": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha en que entraste a trabajar" },
    { id: "salida", tipo: "fecha", etiqueta: "Fecha de corte", porDefecto: "hoy", ayuda: "Hoy, o tu último día si ya saliste." },
  ],
  calcular(entrada, valores, { redondear }) {
    const a = antiguedad(entrada.ingreso, entrada.salida);
    const primer = valores["mx.vacaciones-primer-anio"];
    return {
      aniosCompletos: a.aniosCompletos,
      diasDesdeAniversario: a.diasDesdeAniversario,
      anios: redondear(a.anios),
      dias: a.dias,
      vacaciones: diasDeVacaciones(a.aniosCompletos, primer),
      vacacionesSiguiente: diasDeVacaciones(a.aniosCompletos + 1, primer),
      diasPrima: redondear(valores["mx.dias-prima-antiguedad"] * a.anios),
    };
  },
  resultado: [
    { clave: "aniosCompletos", etiqueta: "Años completos", formato: "anios", destacada: true },
    { clave: "diasDesdeAniversario", etiqueta: "Días desde tu último aniversario", formato: "dias" },
    { clave: "anios", etiqueta: "Antigüedad en años con decimales", formato: "numero", decimales: 2 },
    { clave: "dias", etiqueta: "Días totales de servicio", formato: "dias" },
    { clave: "vacaciones", etiqueta: "Días de vacaciones de tu último aniversario", formato: "dias" },
    { clave: "vacacionesSiguiente", etiqueta: "Días de vacaciones en tu próximo aniversario", formato: "dias" },
    { clave: "diasPrima", etiqueta: "Días de salario de prima de antigüedad acumulados", formato: "dias" },
  ],
});
