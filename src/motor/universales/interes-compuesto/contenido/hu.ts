import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kamatos kamat kalkulátor",
    title: tituloQueEntre(`Kamatos kamat kalkulátor: ${ctx.nombrePais}`, "Kamatos kamat kalkulátor", "Kamatos kamat számítás"),
    description: "Nézd meg, hogyan nő a pénzed kamatos kamattal és rendszeres havi befizetéssel: végösszeg, kamatjövedelem és táblázat évről évre.",
    intro: [
      "Kamatos kamatnál a jóváírt kamat hozzáadódik a tőkéhez, és utána az is kamatozik. Ezért a megtakarítás egyre gyorsabban nő.",
      "Add meg, mennyi pénzed van most, havonta mennyit tudsz hozzátenni, mekkora a kamat és hány évig gyűjtesz. Megmutatjuk a végösszeget, és azt, hogy ebből mennyi a kamat.",
    ],
    comoSeCalcula: [
      "Végösszeg = kezdőösszeg × (1 + i) az n-ediken + havi befizetés × ((1 + i) az n-ediken − 1) ÷ i.",
      "Itt i a választott tőkésítésnek megfelelő havi kamatláb, n pedig a hónapok száma.",
      "A havi befizetések a hónap végén kerülnek a számlára.",
    ],
    ejemplo: [
      `Kezdőösszeg: ${m(capital)}, havi befizetés: ${m(aporte)}, évi 7% kamat mellett. Tíz év után ennyi lesz a számládon: ${m(a10)}.`,
      `További tíz év alatt az összeg eléri ezt: ${m(a20)}. A második évtized sokkal többet hoz, mint az első.`,
    ],
    faq: [
      {
        pregunta: "Mi a különbség az egyszerű és a kamatos kamat között?",
        respuesta: "Az egyszerű kamatot mindig csak az eredeti tőke után számolják. A kamatos kamatot a tőke és a már jóváírt kamat együttes összege után.",
      },
      {
        pregunta: "Mi az a hetvenkettes szabály?",
        respuesta: "Gyors becslés arra, hány év alatt duplázódik meg a pénzed: oszd el a hetvenkettőt az éves kamattal. Évi 6% kamat mellett nagyjából 12 év alatt duplázódik meg az összeg.",
      },
      {
        pregunta: "Milyen kamatot írjak be?",
        respuesta: "Olyat, amely reális ahhoz, amit a pénzzel csinálsz. Ha mai árakon szeretnéd látni az eredményt, a várható inflációval csökkentett kamatot add meg.",
      },
    ],
    glosario: [
      { termino: "Tőkésítés", definicion: "A megszerzett kamat hozzáadása a tőkéhez, hogy a továbbiakban az is kamatozzon." },
      { termino: "Kamatos kamat", definicion: "Olyan kamatozás, amelynél a kamatot a tőke és a már jóváírt kamat után is számolják." },
    ],
  };
};
