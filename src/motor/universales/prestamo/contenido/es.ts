import { contenidoConVariantes } from "../../comun/locales";
import { formatearMonto, montoEjemplo, segunTrato, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

const base: ContenidoUniversal = (ctx) => {
  const t = (tu: string, usted: string, vos: string) => segunTrato(ctx.trato, { tu, usted, vos });
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Calculadora de préstamos",
    title: tituloQueEntre(`Calculadora de préstamos en ${ctx.nombrePais}`, `Préstamos en ${ctx.nombrePais}`, "Calculadora de préstamos"),
    description: t(
      "Calcula la cuota mensual de un préstamo, cuánto pagas de intereses y la tabla de amortización mes a mes. Prueba qué pasa si adelantas pagos.",
      "Calcule la cuota mensual de un préstamo, cuánto paga de intereses y la tabla de amortización mes a mes. Pruebe qué pasa si adelanta pagos.",
      "Calculá la cuota mensual de un préstamo, cuánto pagás de intereses y la tabla de amortización mes a mes. Probá qué pasa si adelantás pagos.",
    ),
    intro: [
      t(
        "Antes de firmar un préstamo conviene saber dos números: cuánto vas a pagar por mes y cuánto te cuesta en intereses.",
        "Antes de firmar un préstamo conviene saber dos números: cuánto va a pagar por mes y cuánto le cuesta en intereses.",
        "Antes de firmar un préstamo conviene saber dos números: cuánto vas a pagar por mes y cuánto te cuesta en intereses.",
      ),
      t(
        "Escribe el monto, la tasa anual y el plazo. Si piensas pagar algo extra cada mes, súmalo y verás cuánto antes terminas.",
        "Escriba el monto, la tasa anual y el plazo. Si piensa pagar algo extra cada mes, súmelo y verá cuánto antes termina.",
        "Escribí el monto, la tasa anual y el plazo. Si pensás pagar algo extra cada mes, sumalo y vas a ver cuánto antes terminás.",
      ),
    ],
    comoSeCalcula: [
      "Usa el sistema francés, el de cuota fija, que es el más común en préstamos personales, de auto y de vivienda.",
      "Tasa mensual = tasa anual ÷ 12.",
      "Cuota = monto × tasa mensual ÷ (1 − (1 + tasa mensual) elevado a menos el número de cuotas).",
      "Cada mes, el interés se calcula sobre lo que queda de deuda. El resto de la cuota baja el capital.",
    ],
    ejemplo: [
      `Un préstamo de ${m(monto)} al 12 % anual a 36 meses tiene una cuota de ${m(cuota36)}. En total se pagan ${m(interesesTotales(monto, 12, 36))} de intereses.`,
      `El mismo préstamo a 60 meses baja la cuota a ${m(cuota60)}, pero los intereses suben a ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el sistema francés?",
        respuesta:
          "Es el sistema de cuota fija. Todas las cuotas son iguales, pero al principio casi todo es interés y al final casi todo es capital. Por eso la deuda baja lento los primeros meses.",
      },
      {
        pregunta: "¿Conviene adelantar cuotas?",
        respuesta: t(
          "Casi siempre sí, si no te cobran una comisión alta por hacerlo. Lo que adelantas va directo al capital y deja de generar intereses. Cuanto antes lo hagas, más ahorras.",
          "Casi siempre sí, si no le cobran una comisión alta por hacerlo. Lo que adelanta va directo al capital y deja de generar intereses. Cuanto antes lo haga, más ahorra.",
          "Casi siempre sí, si no te cobran una comisión alta por hacerlo. Lo que adelantás va directo al capital y deja de generar intereses. Cuanto antes lo hagas, más ahorrás.",
        ),
      },
      {
        pregunta: "¿Conviene un plazo más largo?",
        respuesta: t(
          "La cuota baja, pero pagas mucho más de intereses en total. Compara los dos números antes de decidir.",
          "La cuota baja, pero paga mucho más de intereses en total. Compare los dos números antes de decidir.",
          "La cuota baja, pero pagás mucho más de intereses en total. Compará los dos números antes de decidir.",
        ),
      },
      {
        pregunta: "¿Por qué el banco me da otra cuota?",
        respuesta:
          "Porque suele sumar seguros, comisiones e impuestos, o usa una tasa distinta de la que se ve en el aviso. Lo que hay que comparar entre ofertas es el costo total, no solo la tasa.",
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "La parte de la deuda que todavía no se devolvió." },
      { termino: "Tasa nominal anual", definicion: "La tasa que se divide por 12 para sacar el interés de cada mes." },
      { termino: "Amortización", definicion: "La parte de cada cuota que baja la deuda." },
    ],
  };
};

const espana = (ctx: ContextoUniversal): Partial<ReturnType<ContenidoUniversal>> => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    intro: [
      "Antes de firmar un préstamo conviene saber dos números: cuánto vas a pagar al mes y cuánto te cuesta en intereses.",
      "Escribe el importe, el tipo de interés y el plazo. Si piensas pagar algo extra cada mes, súmalo y verás cuánto antes terminas.",
    ],
    comoSeCalcula: [
      "Usa el sistema francés, el de cuota fija, que es el más habitual en préstamos personales, de coche e hipotecas.",
      "Tipo mensual = TIN ÷ 12.",
      "Cuota = importe × tipo mensual ÷ (1 − (1 + tipo mensual) elevado a menos el número de cuotas).",
      "Cada mes, el interés se calcula sobre lo que queda de deuda. El resto de la cuota amortiza capital.",
    ],
    ejemplo: [
      `Un préstamo de ${m(monto)} al 12 % de TIN a 36 meses tiene una cuota de ${m(cuota36)}. En total se pagan ${m(interesesTotales(monto, 12, 36))} de intereses.`,
      `El mismo préstamo a 60 meses baja la cuota a ${m(cuota60)}, pero los intereses suben a ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "¿Qué es el sistema francés?",
        respuesta:
          "Es el sistema de cuota fija. Todas las cuotas son iguales, pero al principio casi todo es interés y al final casi todo es capital. Por eso la deuda baja despacio los primeros meses.",
      },
      {
        pregunta: "¿Compensa amortizar anticipadamente?",
        respuesta:
          "Casi siempre sí, si la comisión por amortización anticipada es baja. Lo que adelantas va directo al capital y deja de generar intereses. Cuanto antes lo hagas, más ahorras.",
      },
      {
        pregunta: "¿Compensa un plazo más largo?",
        respuesta: "La cuota baja, pero pagas mucho más de intereses en total. Compara los dos números antes de decidir.",
      },
      {
        pregunta: "¿Por qué el banco me da otra cuota?",
        respuesta:
          "Porque suele añadir seguros, comisiones e impuestos, o usa un tipo distinto del que se ve en el anuncio. Para comparar ofertas, mira la TAE y el coste total, no solo el TIN.",
      },
    ],
    glosario: [
      { termino: "Capital", definicion: "La parte de la deuda que todavía no se ha devuelto." },
      { termino: "TIN", definicion: "El tipo de interés nominal anual: se divide entre 12 para sacar el interés de cada mes." },
      { termino: "Amortización", definicion: "La parte de cada cuota que reduce la deuda." },
    ],
  };
};

export const contenidoEs = contenidoConVariantes(base, { "es-ES": espana });
