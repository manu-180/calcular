import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const g = GRAMATICA.hu;
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "a vásárlás" : "a bérlés");
  return {
    h1: "Bérlés vagy vásárlás kalkulátor",
    title: tituloQueEntre(`Bérlés vagy vásárlás kalkulátor (${ctx.nombrePais})`, `Albérlet vagy saját lakás (${ctx.nombrePais})`, "Bérlés vagy vásárlás kalkulátor"),
    description: "Albérlet vagy saját lakás? Hasonlítsd össze a bérlést és a lakásvásárlást a választott évekre, és nézd meg, melyik hoz több vagyont, és mennyivel.",
    intro: [
      "Nem elég a törlesztőrészletet a bérleti díjjal összevetni. Aki vesz, kamatot, karbantartást és ingatlanadót fizet, de a végén övé a lakás. Aki bérel, az önerőt befektetve tarthatja.",
      `Ez a kalkulátor évről évre összeadja mindezt, és megmutatja, melyik lehetőséggel marad több vagyonod ${g.en(ctx.nombrePais)}.`,
    ],
    comoSeCalcula: [
      "Vásárlás: havonta fizeted a törlesztőrészletet és a tulajdonosi költségeket. A vagyonod a lakás értéke mínusz a még fennálló tartozás.",
      "Bérlés: az önerő és a vásárlási költségek a másik befektetés hozamával befektetve maradnak, a bérleti díj pedig évente emelkedik.",
      "Minden hónapban az, aki kevesebbet költ, befekteti a különbséget, így mindkét lehetőség ugyanabból a keretből indul.",
      "Az a jobb lehetőség, amelyikkel a végén nagyobb a vagyonod.",
    ],
    ejemplo: [
      `Egy lakás vételára: ${m(precio)}, 20% önerővel és 25 évre szóló, évi 7% kamatú hitellel. A havi bérleti díj: ${m(alquiler)}.`,
      `10 év alatt ${quien(a10)} jön ki jobban, ennyivel: ${m(Math.abs(a10.comprar - a10.alquilar))}. 3 év alatt ${quien(a3)} jön ki jobban, ennyivel: ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Kidobott pénz az albérlet?",
        respuesta:
          "Nem egészen. Aki vásárol, az is fizet olyan költségeket, amelyeket soha nem kap vissza: kamatot, ingatlanadót és karbantartást. Az számít, mennyi vagyonod van a végén az egyes esetekben.",
      },
      {
        pregunta: "Miért függ az eredmény az évek számától?",
        respuesta:
          "A vásárlásnak az elején nagy költségei vannak (vásárlási költségek és az első évek kamata), és ezek csak idővel térülnek meg. Ha hamarosan költöznél, általában a bérlés jön ki jobban.",
      },
      {
        pregunta: "Melyik adat számít a legtöbbet?",
        respuesta:
          "A vételár és a bérleti díj aránya, a hitel kamata és az, hogy milyen gyorsan nő a lakások értéke. Változtasd meg az értéknövekedést és a befektetési hozamot, és nézd meg, mennyit mozdul az eredmény.",
      },
    ],
    glosario: [
      { termino: "Vagyon", definicion: "Amid van, mínusz amivel tartozol." },
      { termino: "Értéknövekedés", definicion: "Amennyivel a lakás értéke évente nő." },
      { termino: "Alternatív költség", definicion: "Amennyit az önerő hozott volna, ha befekteted." },
    ],
  };
};
