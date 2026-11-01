import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionEt } from "../../dias-entre-fechas/textos/et";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Vanuse kalkulaator",
    title: tituloQueEntre(
      `Vanuse kalkulaator: täpne vanus aastates, kuudes ja päevades | ${ctx.nombrePais}`,
      `Vanuse kalkulaator: arvuta täpne vanus | ${ctx.nombrePais}`,
      `Vanuse kalkulaator | ${ctx.nombrePais}`,
      "Vanuse kalkulaator",
    ),
    description: "Arvuta oma täpne vanus aastates, kuudes ja päevades, mitu päeva oled elanud ja kui kaua on järgmise sünnipäevani.",
    intro: [
      "Sisesta oma sünnikuupäev ja näed täpset vanust täna, ka kuudes, nädalates ja päevades.",
      "Muuda teist kuupäeva ja näed, kui vana keegi oli mingil päeval või kui vana ta saab olema.",
    ],
    comoSeCalcula: [
      "Sünnist valitud päevani arvutatakse täiskuud. Iga 12 kuud on üks aasta.",
      "Pärast viimast täiskuud üle jäävad päevad on vanuse päevad.",
      "Liigaastad arvestatakse 366 päeva pikkustena.",
    ],
    ejemplo: [
      `Kui sünnikuupäev on ${fechaLarga(ctx.locale, nac)} ja vaadeldav kuupäev ${fechaLarga(ctx.locale, ref)}, on vanus ${duracionEt(Math.floor(meses / 12), meses % 12, dias)}.`,
      `See on kokku ${formatearNumero(ctx, total)} päeva.`,
    ],
    faq: [
      {
        pregunta: "Kuidas täpset vanust arvutatakse?",
        respuesta: "Kõigepealt arvutatakse täisaastad, siis täiskuud eelmisest sünnipäevast ja lõpuks üle jäävad päevad.",
      },
      {
        pregunta: "Mis siis, kui sünnipäev on 29. veebruaril?",
        respuesta: "Tavalistel aastatel loeb see kalkulaator sünnipäevaks 28. veebruari. Mõne riigi seadused kasutavad selle asemel 1. märtsi.",
      },
      {
        pregunta: "Mitu päeva olen elanud?",
        respuesta: "Vaata rida „Päevades“. Seal on arvestatud iga päev sünnist valitud päevani, välja arvatud viimane päev.",
      },
    ],
    glosario: [
      { termino: "Vanus", definicion: "Täisaastate arv sünnist alates." },
      { termino: "Liigaasta", definicion: "Aasta, kus on 366 päeva ja 29. veebruar. See kordub iga nelja aasta järel, kuid osa sajandivahetuse aastatest ei ole liigaastad." },
    ],
  };
};
