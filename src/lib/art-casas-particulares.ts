// Motor de la ART del personal de casas particulares. Funciones puras, sin fetch.
//
// ⚠️ ENCUADRE — esto no liquida una indemnización: la liquida la ART sobre el porcentaje que
// determina la comisión médica. Lo que se calcula es lo que sale de aplicar el reglamento a los
// datos declarados, y su valor está en mostrar DE DÓNDE sale cada número.
//
// LA DECISIÓN DE DISEÑO QUE IMPORTA: el ingreso base NO se pide como dato. En cualquier otro
// trabajador el art. 12 de la Ley 24.557 manda promediar los salarios del año actualizados por
// RIPTE, y por eso `/indemnizacion-art` lo pide. Acá el inciso d) del art. 74 del Decreto 467/2014
// lo FIJA: es «la remuneración mensual mínima» de la escala de la CNTCP para la categoría. Pedirlo
// sería invitar al error de cargar el sueldo real, que es justo lo que el reglamento no manda usar.
//
// No se duplica ni una constante: la escala sale de `data/casas-particulares.ts`, la cuota de
// `data/aportes-casas-particulares.ts` (la tabla mensual de ARCA) y los pisos y la fórmula de
// `lib/riesgos-trabajo.ts`. Si mañana cambia cualquiera de las tres, esta página cambia sola.

import { ESCALA_VIGENTE, type CategoriaCasasParticulares } from "@/data/casas-particulares";
import {
  type CondicionTrabajador,
  type RangoHoras,
} from "@/data/aportes-casas-particulares";
import { filaDe, rangoPorHoras } from "@/lib/aportes-casas-particulares";
import { calcularART, type ResultadoART } from "@/lib/riesgos-trabajo";

export type Modalidad = "con-retiro" | "sin-retiro";

export type AvisoArtCasas = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoArtCasas = {
  categoria: CategoriaCasasParticulares;
  modalidad: Modalidad;
  /** El mínimo mensual de la categoría y modalidad: la base que manda el inc. d). */
  baseLegal: number;
  /** Lo que el usuario declara que cobra por mes. Sólo para mostrar la brecha. */
  sueldoDeclarado: number | null;
  /** Cuánto más alto es el sueldo real que la base legal, en pesos. Cero o negativo si no hay brecha. */
  brecha: number;
  /** Rango de horas semanales que define la cuota en la tabla de ARCA. */
  rango: RangoHoras;
  /** Cuota mensual de ART que ingresa el empleador, de la tabla oficial. */
  cuotaMensual: number;
  /** El cálculo del régimen general, ya corrido con la base legal. */
  art: ResultadoART | null;
  avisos: AvisoArtCasas[];
};

export type EntradaArtCasas = {
  categoriaId: string;
  modalidad: Modalidad;
  horasSemanales: number;
  condicion: CondicionTrabajador;
  /** Edad a la primera manifestación invalidante. */
  edad: number;
  /** Porcentaje de incapacidad permanente. Irrelevante si `muerte`. */
  incapacidad: number;
  /** El daño ocurrió en el lugar de trabajo o a disposición del empleador (art. 3 Ley 26.773). */
  enElTrabajo: boolean;
  muerte?: boolean;
  /** Lo que efectivamente cobra por mes, sólo para mostrar la brecha con la base legal. */
  sueldoDeclarado?: number;
};

export function calcularArtCasas(e: EntradaArtCasas): ResultadoArtCasas | null {
  const categoria = ESCALA_VIGENTE.find((c) => c.id === e.categoriaId);
  if (!categoria) return null;

  // La categoría de caseros sólo existe sin retiro: por definición vive en la vivienda. Pedirle
  // una base «con retiro» devolvería null en la escala y un NaN aguas abajo.
  const baseLegal =
    e.modalidad === "sin-retiro" ? categoria.mesSinRetiro : categoria.mesConRetiro;
  if (baseLegal === null || !Number.isFinite(baseLegal) || baseLegal <= 0) return null;

  if (!Number.isFinite(e.horasSemanales) || e.horasSemanales < 0) return null;
  const rango = rangoPorHoras(e.horasSemanales);
  const cuotaMensual = filaDe(e.condicion, rango).art;

  const art = calcularART(
    {
      ingresoBase: baseLegal,
      edad: e.edad,
      incapacidad: e.incapacidad,
      enElTrabajo: e.enElTrabajo,
    },
    Boolean(e.muerte),
  );

  const sueldoDeclarado =
    Number.isFinite(e.sueldoDeclarado) && (e.sueldoDeclarado ?? 0) > 0
      ? (e.sueldoDeclarado as number)
      : null;
  const brecha = sueldoDeclarado === null ? 0 : Math.max(0, sueldoDeclarado - baseLegal);

  const avisos: AvisoArtCasas[] = [];

  avisos.push({
    tono: "atencion",
    texto:
      "La base de cálculo no es el sueldo que cobra: el inciso d) del art. 74 del Decreto 467/2014 manda tomar la remuneración mensual mínima de la escala de la CNTCP para la categoría. Es la diferencia más grande de este régimen con cualquier otro trabajador.",
  });

  if (brecha > 0) {
    avisos.push({
      tono: "atencion",
      texto: `Declaraste un sueldo por encima del mínimo de la categoría. Esa diferencia no entra en la prestación de la ART: el reglamento la liquida sobre la base mínima igual. La brecha mensual que queda afuera es de ${brecha.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}.`,
    });
  }

  if (art?.mandaElPiso) {
    avisos.push({
      tono: "ok",
      texto:
        "Manda el piso de la SRT, no la fórmula. Es lo habitual en este régimen justamente porque la base está fijada en el mínimo de la categoría: el piso no depende del sueldo ni de la categoría, así que protege más a quien menos base tiene. Una cuenta que aplique sólo la fórmula informa mucho menos de lo que corresponde.",
    });
  } else if (art) {
    avisos.push({
      tono: "atencion",
      texto:
        "Acá la fórmula supera al piso, que es lo excepcional en este régimen: sólo pasa por debajo de los 19 años y en las categorías de base más alta, donde el coeficiente 65/edad es máximo. Desde los 19 años vuelve a mandar el piso en todas las categorías y modalidades.",
    });
  }

  if (!e.enElTrabajo) {
    avisos.push({
      tono: "atencion",
      texto:
        "Marcaste que el daño no ocurrió en el lugar de trabajo ni estando a disposición del empleador: el accidente in itinere está cubierto, pero queda afuera del 20% adicional del art. 3 de la Ley 26.773.",
    });
  }

  return {
    categoria,
    modalidad: e.modalidad,
    baseLegal,
    sueldoDeclarado,
    brecha,
    rango,
    cuotaMensual,
    art,
    avisos,
  };
}
