import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Nyugdíjcélú megtakarítás kalkulátor",
    title: tituloQueEntre(`Nyugdíjcélú megtakarítás kalkulátor: ${ctx.nombrePais}`, "Nyugdíjcélú megtakarítás kalkulátor", "Nyugdíjcélú megtakarítás"),
    description: "Nézd meg, mennyit gyűjthetsz havi befizetéssel a nyugdíjas évekre, és mekkora havi jövedelmet ad ez mai árakon.",
    intro: [
      "Az állami nyugdíj sokszor nem elég ahhoz, hogy megtartsd a megszokott életszínvonaladat. A saját megtakarítás, akár kicsi is, sokat segít, ha időben elkezded.",
      "Add meg az életkorodat, azt, hogy mikor mennél nyugdíjba, mennyi pénzed van már és havonta mennyit tudsz hozzátenni. Megmutatjuk, mekkora összeged lesz a nyugdíjba vonuláskor, és ebből havonta mennyit vehetsz fel.",
    ],
    comoSeCalcula: [
      "A megtakarítás minden hónapban a reálhozammal nő, vagyis a hozam és az infláció különbségével. Ezért mai árakon látod az eredményt.",
      "Nyugdíjba vonulás után a megtakarítást a megadott számú évig egyenlő havi összegekben veszed fel. A maradék közben tovább kamatozik.",
      "Az állami nyugdíjat, az adókat és a befektetési díjakat nem számoljuk.",
    ],
    ejemplo: [
      `Harmincévesen ennyi a megtakarításod: ${m(actual)}. Ha havonta ennyit teszel hozzá: ${m(aporte)}, évi 4% reálhozam mellett 65 éves korodig ennyit gyűjtesz: ${m(capital30)}. Ebből 25 éven át havonta ennyit vehetsz fel: ${m(rentaMensual(capital30, 4, 25))}.`,
      `Ha ugyanezekkel a számokkal csak negyvenévesen kezded, ennyi lesz a végösszeg: ${m(capital40)}. Tíz év különbség sokat számít.`,
    ],
    faq: [
      {
        pregunta: "Mi az a reálhozam?",
        respuesta: "Az, amit a befektetés az infláció levonása után hoz. Ha a befektetés 7% hozamot ad, az infláció pedig 3%, a reálhozam nagyjából 4%.",
      },
      {
        pregunta: "Kiváltja ez az állami nyugdíjat?",
        respuesta: "Nem. Ez a saját megtakarításod, amely az állami nyugdíj vagy a nyugdíjpénztár mellé jön. Az állami nyugdíjad becsült összegét az országod illetékes hivatala tudja megadni.",
      },
      {
        pregunta: "Mennyit tegyek félre nyugdíjra?",
        respuesta: "Egyetlen helyes szám nincs. Egy gyakori ökölszabály a jövedelem 10 és 15% közötti részét javasolja. A legfontosabb, hogy minél korábban kezdd el.",
      },
    ],
    glosario: [
      { termino: "Reálhozam", definicion: "Amennyit a befektetés az inflációnál többet hoz." },
      { termino: "Mai árak", definicion: "Egy jövőbeli összeg kifejezve abban, amit ma lehetne venni rajta." },
    ],
  };
};
