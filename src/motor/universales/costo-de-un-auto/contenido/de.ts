import { paraSuiza } from "../../comun/locales";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

const contenido: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 80),
    distancia: 1000,
    consumo: imperial ? 28 : 7,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.8),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "Meile" : "Kilometer";
  const c = {
    h1: "Was kostet mein Auto wirklich?",
    title: tituloQueEntre(
      `Autokostenrechner: Was kostet mein Auto im Monat? | ${ctx.nombrePais}`,
      `Autokostenrechner | ${ctx.nombrePais}`,
      "Autokostenrechner",
    ),
    description: `Berechnen Sie, was Ihr Auto wirklich kostet, pro Monat, pro Jahr und pro ${unidad}: Sprit, Versicherung, Wartung, Parken und Wertverlust.`,
    intro: [
      "Was der Sprit kostet, wissen die meisten. Kaum jemand rechnet Versicherung, Wartung, Parken und vor allem den Wertverlust Jahr für Jahr dazu.",
      "Tragen Sie Ihre Kosten ein, und Sie sehen, was Ihr Auto Sie wirklich kostet. Das hilft bei der Entscheidung, ob Sie kaufen, wechseln oder anders unterwegs sein möchten.",
    ],
    comoSeCalcula: [
      imperial
        ? "Sprit pro Monat = Meilen pro Monat ÷ Meilen pro Gallone × Preis pro Gallone."
        : "Sprit pro Monat = Kilometer pro Monat × Liter pro 100 km ÷ 100 × Literpreis.",
      "Wertverlust pro Monat = Wert des Autos × Wertverlust pro Jahr ÷ 12.",
      "Echte Kosten = Sprit + Versicherung + Wartung + Parken + sonstige Kosten + Wertverlust.",
      `Kosten pro ${unidad} = echte Kosten pro Monat ÷ gefahrene Strecke im Monat.`,
    ],
    ejemplo: [
      `Ein Auto im Wert von ${m(g.precio)}, das ${formatearNumero(ctx, g.distancia)} ${imperial ? "Meilen" : "km"} im Monat fährt, kostet mit Wertverlust ${m(mensual)} im Monat.`,
      `Das sind ${m(mensual * 12)} im Jahr und ${formatearMonto(ctx, mensual / g.distancia)} pro ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Was ist der Wertverlust beim Auto?",
        respuesta: "Der Wert, den ein Auto mit der Zeit verliert. Sie zahlen ihn nicht jeden Monat, aber Sie merken ihn beim Verkauf. Bei Neuwagen ist er oft der größte Kostenpunkt.",
      },
      {
        pregunta: "Warum wird meine Kreditrate nicht mitgerechnet?",
        respuesta:
          "Ein Teil der Rate bezahlt das Auto selbst, und das steckt schon im Wertverlust. Beides zu zählen hieße, das Auto doppelt zu rechnen. Die Kreditzinsen kommen als Kosten dazu.",
      },
      {
        pregunta: "Wie senke ich meine Autokosten?",
        respuesta:
          "Vergleichen Sie jedes Jahr die Kfz-Versicherung, achten Sie auf Reifendruck und Wartung, und wechseln Sie das Auto nicht zu oft: In den ersten Jahren ist der Wertverlust am höchsten.",
      },
    ],
    glosario: [
      { termino: "Wertverlust", definicion: "Der Wert, den ein Auto durch Alter und Nutzung verliert." },
      { termino: `Kosten pro ${unidad}`, definicion: `Die durchschnittlichen Kosten für jeden gefahrenen ${unidad}, alle Ausgaben eingerechnet.` },
    ],
  };
  return ctx.locale === "de-CH" ? JSON.parse(JSON.stringify(c).replace(/ß/g, "ss")) : c;
};

export const contenidoDe: ContenidoUniversal = (ctx) => paraSuiza(ctx.locale, contenido(ctx));
