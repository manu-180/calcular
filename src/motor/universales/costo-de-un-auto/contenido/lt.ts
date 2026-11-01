import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const vienetui = imperial ? "vienai mylei" : "vienam kilometrui";
  return {
    h1: "Automobilio išlaikymo kaštų skaičiuoklė",
    title: tituloQueEntre(
      `Kiek kainuoja automobilio išlaikymas ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      `Automobilio išlaikymo kaštai ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Automobilio išlaikymo kaštai",
    ),
    description: "Apskaičiuokite, kiek automobilis iš tikrųjų kainuoja per mėnesį, per metus ir vienam kilometrui: kuras, draudimas, priežiūra ir vertės sumažėjimas.",
    intro: [
      "Dauguma vairuotojų žino, kiek išleidžia kurui. Tačiau retas prideda draudimą, priežiūrą, stovėjimą ir ypač vertę, kurios automobilis netenka kasmet.",
      "Įveskite savo išlaidas, ir parodysime, kiek automobilis iš tikrųjų kainuoja. Tai padės nuspręsti, ar jį pirkti, keisti, ar keliauti kitaip.",
    ],
    comoSeCalcula: [
      imperial
        ? "Kuras per mėnesį = mylios per mėnesį ÷ mylios galonui × galono kaina."
        : "Kuras per mėnesį = kilometrai per mėnesį × litrai 100 km ÷ 100 × litro kaina.",
      "Vertės sumažėjimas per mėnesį = automobilio vertė × metinis sumažėjimas ÷ 12.",
      "Tikrieji kaštai = kuras + draudimas + priežiūra + stovėjimas + kitos išlaidos + vertės sumažėjimas.",
      `Kaštai ${vienetui} = tikrieji kaštai per mėnesį ÷ nuvažiuotas atstumas per mėnesį.`,
    ],
    ejemplo: [
      `Automobilis, kurio vertė ${m(g.precio)} ir kuris per mėnesį nuvažiuoja ${formatearNumero(ctx, g.distancia)} ${imperial ? "mylių" : "km"}, kainuoja ${m(mensual)} per mėnesį, įskaitant vertės sumažėjimą.`,
      `Tai ${m(mensual * 12)} per metus ir ${formatearMonto(ctx, mensual / g.distancia)} už kiekvieną ${imperial ? "mylią" : "kilometrą"}.`,
    ],
    faq: [
      {
        pregunta: "Kas yra automobilio nusidėvėjimas?",
        respuesta: "Tai vertė, kurios automobilis netenka laikui bėgant. Jos nemokate kas mėnesį, bet pajuntate pardavimo metu. Naujo automobilio atveju tai paprastai didžiausia išlaida.",
      },
      {
        pregunta: "Kodėl neskaičiuojama paskolos įmoka?",
        respuesta:
          "Įmokos dalis apmoka patį automobilį, o tai jau įskaičiuota kaip vertės sumažėjimas. Sudėjus abu dydžius, automobilis būtų skaičiuojamas du kartus. Paskolos palūkanos yra papildoma išlaida.",
      },
      {
        pregunta: "Kaip sumažinti automobilio kaštus?",
        respuesta:
          "Kasmet palyginkite privalomojo ir kasko draudimo pasiūlymus, stebėkite padangų slėgį, laiku atlikite techninę priežiūrą ir nekeiskite automobilio per dažnai: daugiausia vertės jis netenka pirmaisiais metais.",
      },
    ],
    glosario: [
      { termino: "Nusidėvėjimas", definicion: "Vertė, kurios automobilis netenka laikui bėgant ir jį naudojant." },
      { termino: `Kaštai ${vienetui}`, definicion: "Vidutiniai kaštai kiekvienam nuvažiuotam atstumo vienetui, įskaitant visas išlaidas." },
    ],
  };
};
