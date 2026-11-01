import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoSk: ContenidoUniversal = (ctx) => {
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
  const naJednotku = imperial ? "na jednu míľu" : "na jeden kilometer";
  return {
    h1: "Kalkulačka nákladov na auto",
    title: tituloQueEntre(
      `Koľko stojí prevádzka auta: kalkulačka ${GRAMATICA.sk.para(ctx.nombrePais)}`,
      `Náklady na prevádzku auta ${GRAMATICA.sk.en(ctx.nombrePais)}`,
      "Kalkulačka nákladov na auto",
    ),
    description: "Vypočítajte, koľko vás auto naozaj stojí za mesiac, za rok aj na kilometer: palivo, poistenie, údržba a strata hodnoty.",
    intro: [
      "Väčšina vodičov vie, koľko minie na palivo. Málokto však pripočíta poistenie, údržbu, parkovanie a najmä hodnotu, ktorú auto každý rok stráca.",
      "Zadajte svoje výdavky a ukážeme vám, koľko vás auto skutočne stojí. Pomôže vám to rozhodnúť sa, či auto kúpiť, vymeniť, alebo sa dopravovať inak.",
    ],
    comoSeCalcula: [
      imperial
        ? "Palivo za mesiac = míle za mesiac ÷ míle na galón × cena za galón."
        : "Palivo za mesiac = kilometre za mesiac × litre na 100 km ÷ 100 × cena za liter.",
      "Strata hodnoty za mesiac = hodnota auta × ročná strata ÷ 12.",
      "Skutočné náklady = palivo + poistenie + údržba + parkovanie + ďalšie výdavky + strata hodnoty.",
      `Náklady ${naJednotku} = skutočné náklady za mesiac ÷ prejdená vzdialenosť za mesiac.`,
    ],
    ejemplo: [
      `Auto v hodnote ${m(g.precio)}, ktoré najazdí ${formatearNumero(ctx, g.distancia)} ${imperial ? "míľ" : "km"} mesačne, vás stojí ${m(mensual)} za mesiac vrátane straty hodnoty.`,
      `To je ${m(mensual * 12)} za rok a ${formatearMonto(ctx, mensual / g.distancia)} za každ${imperial ? "ú míľu" : "ý kilometer"}.`,
    ],
    faq: [
      {
        pregunta: "Čo je amortizácia auta?",
        respuesta: "Je to hodnota, ktorú auto časom stráca. Neplatíte ju každý mesiac, ale spoznáte ju pri predaji. Pri novom aute to býva najväčšia položka.",
      },
      {
        pregunta: "Prečo sa nepočíta so splátkou úveru?",
        respuesta:
          "Časť splátky platí samotné auto, a to je už započítané ako strata hodnoty. Keby sa spočítalo oboje, auto by sa počítalo dvakrát. Úroky z úveru sú výdavok navyše.",
      },
      {
        pregunta: "Ako znížiť náklady na auto?",
        respuesta:
          "Každý rok porovnajte ponuky povinného zmluvného a havarijného poistenia, sledujte tlak v pneumatikách, choďte načas do servisu a nemeňte auto príliš často: najviac hodnoty stráca v prvých rokoch.",
      },
    ],
    glosario: [
      { termino: "Amortizácia", definicion: "Hodnota, ktorú auto stráca časom a používaním." },
      { termino: `Náklady ${naJednotku}`, definicion: "Priemerné náklady na každú prejdenú jednotku vzdialenosti so započítaním všetkých výdavkov." },
    ],
  };
};
