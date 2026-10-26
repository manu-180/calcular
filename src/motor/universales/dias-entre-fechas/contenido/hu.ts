import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const n = (x: number) => formatearNumero(ctx, x);
  return {
    h1: "Hány nap van két dátum között?",
    title: tituloQueEntre(
      `Napok száma két dátum között: kalkulátor (${ctx.nombrePais})`,
      "Napok száma két dátum között: kalkulátor",
      "Napok két dátum között",
    ),
    description:
      "Számold ki, hány nap van két dátum között: naptári napok, hetek, hónapok és a hétfőtől péntekig tartó munkanapok száma.",
    intro: [
      "Válaszd ki a kezdő és a záró dátumot. Látod a naptári napok számát, ugyanezt az időszakot hetekben és hónapokban, és a munkanapok számát is.",
      "Jól jön határidőkhöz, szabadsághoz, terhességhez vagy visszaszámláláshoz egy fontos napig.",
    ],
    comoSeCalcula: [
      "A naptári napok a két dátum közötti összes napot jelentik. Az első nap beleszámít, az utolsó nem, hacsak be nem pipálod a megfelelő lehetőséget.",
      "A munkanapok ugyanebben az időszakban a hétfők, keddek, szerdák, csütörtökök és péntekek. Az ünnepnapokat nem vonja le.",
      "A szökőévekben február 29. napja is beleszámít.",
    ],
    ejemplo: [
      `${f(desde)} és ${f(hasta)} között ${n(dias)} naptári nap telik el.`,
      `Ebből ${n(habiles)} nap munkanap, vagyis hétfőtől péntekig tartó nap.`,
    ],
    faq: [
      {
        pregunta: "Az első vagy az utolsó nap számít bele?",
        respuesta: "Alapból az első nap beleszámít, az utolsó nem, ugyanúgy, mint amikor két dátumot kivonsz egymásból. Ha mindkettő kell, pipáld be az „Az utolsó nap is számítson” lehetőséget.",
      },
      {
        pregunta: "A munkanapokból levonja az ünnepnapokat?",
        respuesta: "Nem. Hétfőtől péntekig számol. Az ünnepnapok országonként, régiónként és évenként mások, ezért ezeket külön vond le.",
      },
      {
        pregunta: "Hány napból áll egy év?",
        respuesta: "Egy év 365 napból áll, a szökőév 366 napból. Ezért ugyanaz a két dátum különböző években eltérő napszámot adhat.",
      },
    ],
    glosario: [
      { termino: "Naptári napok", definicion: "A naptár minden napja, a hétvégéket és az ünnepnapokat is beleértve." },
      { termino: "Munkanapok", definicion: "Ebben a kalkulátorban a hétfőtől péntekig tartó napok." },
    ],
  };
};
