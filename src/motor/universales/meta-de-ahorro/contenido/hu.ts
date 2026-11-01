import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Megtakarítás kalkulátor: mennyit tegyek félre havonta?",
    title: tituloQueEntre(`Megtakarítás kalkulátor: ${ctx.nombrePais}`, "Megtakarítás kalkulátor: havi félretétel", "Megtakarítás kalkulátor"),
    description: "Számold ki, havonta mennyit kell félretenned, hogy időre összegyűljön a szükséges összeg, az eddigi megtakarítással és a kamattal együtt.",
    intro: [
      "Nyaralás, autó, önerő a lakáshitelhez vagy tartalék a váratlan kiadásokra. Egy összeggel és határidővel megadott célt sokkal könnyebb elérni.",
      "Add meg, mennyit szeretnél összegyűjteni és hány hónap alatt. A kalkulátor megmondja, havonta és hetente mennyit tegyél félre.",
    ],
    comoSeCalcula: [
      "Először kiszámoljuk, mennyire nő az eddigi megtakarításod az időszak végéig.",
      "Ami még hiányzik, azt egyenlő havi befizetésekre osztjuk.",
      "Ha a megtakarítás kamatozik, minden befizetés is hoz valamennyit, így elég valamivel kevesebbet félretenni.",
    ],
    ejemplo: [
      `Ha kamat nélkül, 24 hónap alatt szeretnél összegyűjteni ennyit: ${m(meta)}, havonta ennyit kell félretenned: ${m(meta / 24)}.`,
      `Ha már van ennyi megtakarításod: ${m(actual)}, és a pénz évi 5% hozamot hoz, havonta ennyi is elég: ${m(aporteNecesario(meta, actual, 24, 5))}.`,
    ],
    faq: [
      {
        pregunta: "Hogyan tartsam be a célt?",
        respuesta: "A pénzt rögtön fizetés után tedd félre, még mielőtt költeni kezdesz. Ha teheted, állíts be rendszeres átutalást egy külön megtakarítási számlára.",
      },
      {
        pregunta: "Mi van, ha túl magas a havi összeg?",
        respuesta: "Adj magadnak több időt, vagy csökkentsd a célt. Azzal is kezdheted, amennyit most bírsz, és emeled a befizetést, amikor nő a jövedelmed.",
      },
      {
        pregunta: "Számoljak az inflációval?",
        respuesta: "Ha a cél több év múlva esedékes, add hozzá az összeghez a várható inflációt. Ami ma 100 egységbe kerül, néhány év múlva érezhetően többe kerülhet.",
      },
    ],
    glosario: [
      { termino: "Befizetés", definicion: "A pénz, amelyet minden hónapban félreteszel a célra." },
      { termino: "Hozam", definicion: "Amennyit a megtakarításod a számlán vagy a befektetésben hoz." },
    ],
  };
};
