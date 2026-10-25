import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Hitelkalkulátor: törlesztőrészlet és kamat",
    title: tituloQueEntre(`Hitelkalkulátor: ${ctx.nombrePais}`, "Hitelkalkulátor: törlesztőrészlet és kamat", "Hitelkalkulátor"),
    description: "Számold ki a hitel havi törlesztőrészletét, a teljes kamatot és a törlesztési tervet. Azt is látod, mennyit spórolsz előtörlesztéssel.",
    intro: [
      "Mielőtt aláírod a hitelszerződést, két szám dönt: mennyit fizetsz havonta, és mennyibe kerül a hitel kamatban.",
      "Add meg a hitelösszeget, az éves kamatot és a futamidőt. Ha havonta többet törlesztenél, írd be azt is, és látod, mennyivel hamarabb végzel.",
    ],
    comoSeCalcula: [
      "Állandó havi részlettel számolunk (annuitásos törlesztés), ahogy a személyi kölcsönnél, az autóhitelnél és a lakáshitelnél is szokás.",
      "Havi kamatláb = éves kamat ÷ 12.",
      "Részlet = hitelösszeg × havi kamatláb ÷ (1 − (1 + havi kamatláb) a részletek számának mínusz első hatványán).",
      "A kamatot minden hónapban a még fennálló tartozás után számoljuk. A részlet többi része a tőkét csökkenti.",
    ],
    ejemplo: [
      `Egy hitel összege ${m(monto)}, a kamat évi 12%, a futamidő 36 hónap. A havi részlet ${m(cuota36)}, a kifizetett kamat összesen ${m(interesesTotales(monto, 12, 36))}.`,
      `Ha a futamidő 60 hónap, a részlet ${m(cuota60)} lesz, a kamat viszont összesen ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Hogyan számolják ki a hitel törlesztőrészletét?",
        respuesta:
          "Az annuitásos törlesztés képletével. Minden részlet ugyanannyi, de az elején a részlet nagyobb része kamat, a végén pedig tőke. Ezért csökken lassan a tartozás az első hónapokban.",
      },
      {
        pregunta: "Megéri előtörleszteni?",
        respuesta:
          "Általában igen, ha a hitelező nem kér érte magas díjat. A plusz pénz egyenesen a tőkét csökkenti, és utána már nem számolnak rá kamatot. Minél korábban törlesztesz, annál többet spórolsz.",
      },
      {
        pregunta: "Jobb a hosszabb futamidő?",
        respuesta: "A részlet kisebb lesz, de összesen sokkal több kamatot fizetsz. Döntés előtt hasonlítsd össze a két számot.",
      },
      {
        pregunta: "Miért mond más részletet a bank?",
        respuesta:
          "A bankok és más hitelezők gyakran biztosítást vagy kezelési költséget is felszámolnak, vagy más kamattal számolnak, mint amit hirdetnek. Az ajánlatokat a THM és a teljes visszafizetendő összeg alapján hasonlítsd össze, ne csak a kamat alapján.",
      },
    ],
    glosario: [
      { termino: "Tőketartozás", definicion: "A tartozásnak az a része, amelyet még nem fizettél vissza." },
      { termino: "THM", definicion: "Teljes hiteldíj mutató. A kamat mellett a díjakat is tartalmazza, így a hitel valódi költségét mutatja." },
      { termino: "Előtörlesztés", definicion: "A részleten felül befizetett összeg, amely a tőketartozást csökkenti." },
    ],
  };
};
