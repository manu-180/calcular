import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoIs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Fjárhagsáætlun með 50/30/20-reglunni",
    title: tituloQueEntre(
      `Fjárhagsáætlun 50/30/20: skiptu laununum | ${ctx.nombrePais}`,
      `Fjárhagsáætlun 50/30/20 | ${ctx.nombrePais}`,
      "Fjárhagsáætlun 50/30/20",
    ),
    description: "Skiptu útborguðu laununum þínum með 50/30/20-reglunni. Sjáðu hve mikið fer í nauðsynleg útgjöld, afþreyingu og sparnað og breyttu hlutföllunum ef þarf.",
    intro: [
      "50/30/20-reglan er einföld leið til að skipuleggja mánuðinn. Helmingurinn fer í það nauðsynlega, 30% í það sem þér þykir gaman og 20% í sparnað.",
      "Sláðu inn útborguð laun og þú sérð hve mikið fer í hvern hluta. Ef staðan þín er önnur, til dæmis með háa leigu, breyttu þá prósentunum.",
    ],
    comoSeCalcula: [
      "Nauðsynleg útgjöld = tekjur × 50%.",
      "Afþreying og annað = tekjur × 30%.",
      "Sparnaður = tekjur × 20%. Prósenturnar þrjár verða að vera 100% samtals.",
    ],
    ejemplo: [
      `Með ${m(ingreso)} á mánuði fara ${m(ingreso * 0.5)} í nauðsynleg útgjöld, ${m(ingreso * 0.3)} í afþreyingu og ${m(ingreso * 0.2)} í sparnað.`,
      `Á einu ári verða þessi 20% að ${m(ingreso * 0.2 * 12)} í sparnað.`,
    ],
    faq: [
      {
        pregunta: "Hvað telst nauðsynlegt og hvað er afþreying?",
        respuesta:
          "Nauðsynleg útgjöld eru reikningar sem þú verður að borga, eins og húsnæði, matur, rafmagn, samgöngur, heilsa og lágmarksgreiðslur af lánum. Afþreying er það sem þú getur dregið úr ef þarf.",
      },
      {
        pregunta: "Hvað geri ég ef nauðsynleg útgjöld eru yfir 50%?",
        respuesta: "Það er algengt, sérstaklega með háa leigu. Prófaðu 60/20/20 eða 70/20/10, en forðastu að fara með sparnaðinn niður í núll.",
      },
      {
        pregunta: "Telst afborgun af skuldum sem sparnaður?",
        respuesta: "Lágmarksgreiðslur tilheyra nauðsynlegum útgjöldum. Allt sem þú borgar aukalega til að losna fyrr við skuldir telst sparnaður, því það bætir fjárhaginn þinn á sama hátt.",
      },
    ],
    glosario: [
      { termino: "Útborguð laun", definicion: "Það sem þú færð greitt eftir skatt og önnur gjöld." },
      { termino: "50/30/20-reglan", definicion: "Leið til að skipta tekjum á milli nauðsynlegra útgjalda, afþreyingar og sparnaðar." },
    ],
  };
};
