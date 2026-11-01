import { GRAMATICA } from "../../../i18n/gramatica";
import { formaLt } from "../../../i18n/plural";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  const savaites = 52 / 12;
  return {
    h1: "Valandinio atlygio skaičiuoklė",
    title: tituloQueEntre(
      `Valandinis, mėnesinis ir metinis atlygis ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      `Valandinio atlygio skaičiuoklė ${GRAMATICA.lt.en(ctx.nombrePais)}`,
      "Valandinio atlygio skaičiuoklė",
    ),
    description: "Perskaičiuokite atlyginimą valandai, dienai, savaitei, pusei mėnesio, mėnesiui ir metams pagal savo valandas ir apmokamas savaites.",
    intro: [
      "Kiek uždirbate per valandą? Kiek per metus duoda pasiūlymas su valandiniu atlygiu? Įveskite sumą, pasirinkite laikotarpį, ir parodysime visus kitus.",
      "Tai padės palyginti darbo pasiūlymus, įvertinti viršvalandžius arba sužinoti, kiek vertas jūsų laikas.",
    ],
    comoSeCalcula: [
      "Pirmiausia viskas perskaičiuojama į metinę sumą.",
      "Per valandą = metinė suma ÷ (valandos per savaitę × apmokamos savaitės).",
      "Per dieną = metinė suma ÷ (dienos per savaitę × apmokamos savaitės). Per savaitę = metinė suma ÷ apmokamos savaitės.",
      "Per mėnesį = metinė suma ÷ 12. Per pusę mėnesio = metinė suma ÷ 24.",
    ],
    ejemplo: [
      `Atlyginimas ${m(anual)} per metus, kai dirbama 40 valandų per savaitę, atitinka ${m(anual / 2080)} per valandą ir ${m(anual / 12)} per mėnesį.`,
      `Pasiūlymas ${m(hora)} per valandą visu etatu per metus duoda ${m(hora * 2080)}.`,
    ],
    faq: [
      {
        pregunta: "Kiek darbo valandų yra per metus?",
        respuesta: `Kai dirbama 40 valandų per savaitę ir apmokamos 52 savaitės, susidaro ${formatearNumero(ctx, 2080)} valandų. Todėl greitam įverčiui valandinis atlygis dauginamas maždaug iš ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Kodėl savaitės atlyginimas, padaugintas iš 4, neduoda mėnesio atlyginimo?",
        respuesta: `Nes mėnesyje vidutiniškai yra ${formatearNumero(ctx, savaites, 2)} ${formaLt(savaites, "savaitė", "savaitės", "savaičių", "savaitės")}, o ne 4. Savaitės atlyginimą padauginkite iš 52, padalykite iš 12 ir gausite mėnesio atlyginimą.`,
      },
      {
        pregunta: "Ar įskaičiuoti priedai ir mokesčiai?",
        respuesta: "Ne. Skaičiuoklė perskaičiuoja tą pačią sumą kitiems laikotarpiams. Jei gaunate priedų, palyginimui pridėkite juos atskirai.",
      },
    ],
    glosario: [
      { termino: "Atlyginimas prieš mokesčius", definicion: "Atlyginimas prieš atskaitant pajamų mokestį ir socialinio bei sveikatos draudimo įmokas." },
      { termino: "Mokėjimas du kartus per mėnesį", definicion: "Atlyginimas, kas mėnesį mokamas dviem dalimis. Per metus susidaro 24 mokėjimai." },
    ],
  };
};
