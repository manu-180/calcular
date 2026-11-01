import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
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
  const vienibai = imperial ? "uz vienu jūdzi" : "uz vienu kilometru";
  return {
    h1: "Auto izmaksu kalkulators",
    title: tituloQueEntre(
      `Cik maksā auto uzturēšana ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      `Auto uzturēšanas izmaksas ${GRAMATICA.lv.en(ctx.nombrePais)}`,
      "Auto izmaksu kalkulators",
    ),
    description: "Aprēķiniet, cik auto patiesībā maksā mēnesī, gadā un uz vienu kilometru: degviela, apdrošināšana, apkope un vērtības samazinājums.",
    intro: [
      "Lielākā daļa autovadītāju zina, cik iztērē degvielai. Taču reti kurš pieskaita apdrošināšanu, apkopi, stāvvietu un it īpaši vērtību, ko auto katru gadu zaudē.",
      "Ievadiet savus izdevumus, un parādīsim, cik auto patiesībā maksā. Tas palīdzēs izlemt, vai to pirkt, mainīt vai pārvietoties citādi.",
    ],
    comoSeCalcula: [
      imperial
        ? "Degviela mēnesī = jūdzes mēnesī ÷ jūdzes ar galonu × galona cena."
        : "Degviela mēnesī = kilometri mēnesī × litri uz 100 km ÷ 100 × litra cena.",
      "Vērtības samazinājums mēnesī = auto vērtība × samazinājums gadā ÷ 12.",
      "Reālās izmaksas = degviela + apdrošināšana + apkope + stāvvieta + citi izdevumi + vērtības samazinājums.",
      `Izmaksas ${vienibai} = reālās izmaksas mēnesī ÷ mēnesī nobrauktais attālums.`,
    ],
    ejemplo: [
      `Auto ar vērtību ${m(g.precio)}, ar kuru mēnesī nobrauc ${formatearNumero(ctx, g.distancia)} ${imperial ? "jūdzes" : "km"}, maksā ${m(mensual)} mēnesī, ieskaitot vērtības samazinājumu.`,
      `Tas ir ${m(mensual * 12)} gadā un ${formatearMonto(ctx, mensual / g.distancia)} par katru ${imperial ? "jūdzi" : "kilometru"}.`,
    ],
    faq: [
      {
        pregunta: "Kas ir auto vērtības samazinājums?",
        respuesta: "Tā ir vērtība, ko auto laika gaitā zaudē. To nemaksājat katru mēnesi, bet izjūtat pārdošanas brīdī. Jaunam auto tie parasti ir lielākie izdevumi.",
      },
      {
        pregunta: "Kāpēc netiek skaitīts kredīta maksājums?",
        respuesta:
          "Daļa maksājuma apmaksā pašu auto, un tas jau iekļauts kā vērtības samazinājums. Saskaitot abus, auto tiktu rēķināts divreiz. Kredīta procenti ir papildu izdevumi.",
      },
      {
        pregunta: "Kā samazināt auto izmaksas?",
        respuesta:
          "Katru gadu salīdziniet obligātās un brīvprātīgās apdrošināšanas piedāvājumus, sekojiet riepu spiedienam, laikus veiciet apkopi un nemainiet auto pārāk bieži: visvairāk vērtības tas zaudē pirmajos gados.",
      },
    ],
    glosario: [
      { termino: "Vērtības samazinājums", definicion: "Vērtība, ko auto zaudē laika gaitā un lietojot." },
      { termino: `Izmaksas ${vienibai}`, definicion: "Vidējās izmaksas par katru nobraukto attāluma vienību, ieskaitot visus izdevumus." },
    ],
  };
};
