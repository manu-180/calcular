import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoEt: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Tunnihinna kalkulaator vabakutselisele ja ettevõtjale",
    title: tituloQueEntre(
      `Tunnihinna kalkulaator: arvuta vabakutselise tunnihind | ${ctx.nombrePais}`,
      `Tunnihinna kalkulaator vabakutselisele | ${ctx.nombrePais}`,
      `Tunnihinna kalkulaator | ${ctx.nombrePais}`,
      "Tunnihinna kalkulaator",
    ),
    description: "Arvuta oma tunni- ja päevahind vabakutselisena selle põhjal, mida tahad teenida, ning kulude, maksude, puhkuste ja arveldatavate tundide järgi.",
    intro: [
      "Vabakutselise kõige sagedasem viga on võtta palk, mida ta tööandja juures tahaks, ja jagada see 160 tunniga. Siis ununevad maksud, kulud, puhkused ja kõik tunnid, mille eest arvet esitada ei saa.",
      "See kalkulaator lähtub sellest, mida tahad kätte saada, ja näitab, kui palju pead selleks arveid esitama.",
    ],
    comoSeCalcula: [
      "Vajalik käive = kätte jääv summa ÷ (1 − maksumäär) + ettevõtluse kulud.",
      "Tööpäevad = 52 nädalat × tööpäevad nädalas − vabad päevad.",
      "Arveldatavad tunnid aastas = tööpäevad × arveldatavad tunnid päevas.",
      "Tunnihind = vajalik käive ÷ arveldatavad tunnid aastas.",
    ],
    ejemplo: [
      `Kui tahad aastas kätte saada ${m(ingreso)}, kulud on ${m(gastos)} ja maksud 25%, pead arveid esitama summas ${m(r.facturado)}.`,
      `Kui vabu päevi on 30 ja arveldatavaid tunde 25 nädalas, on aastas ${formatearNumero(ctx, r.horas)} arveldatavat tundi. Tunnihind on siis ${m(r.hora)} ja päevahind ${m(r.dia)}.`,
    ],
    faq: [
      {
        pregunta: "Mitu tundi nädalas saan arveldada?",
        respuesta: "Vähem, kui töötad. Klientide otsimine, kirjavahetus, arveldamine ja enesetäiendus võtavad aega, mille eest keegi ei maksa. Tavaliselt on 40 töötunnist arveldatavad 20 või 30.",
      },
      {
        pregunta: "Kas esitan arve tunnihinna või kokkulepitud hinna järgi?",
        respuesta: "Mõlemad sobivad. Ka siis, kui lepid kogu töö eest kokku kindla hinna, hinda selleks kuluvad tunnid ja korruta need selle tunnihinnaga, siis ei tee sa tööd kahjumiga.",
      },
      {
        pregunta: "Millist maksumäära peaksin kasutama?",
        respuesta: "See sõltub riigist ja ettevõtlusvormist. Arvesta nii tulumaksu kui ka sotsiaalmakseid. Kui sa pole kindel, küsi raamatupidajalt.",
      },
    ],
    glosario: [
      { termino: "Arveldatavad tunnid", definicion: "Töötunnid, mille eest esitad kliendile arve." },
      { termino: "Kätte jääv summa", definicion: "See, mis jääb alles pärast makse ja ettevõtluse kulusid." },
    ],
  };
};
