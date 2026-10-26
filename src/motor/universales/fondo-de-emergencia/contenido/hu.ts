import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHu: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  const meses = Math.ceil((gastos * 6) / aporte);
  return {
    h1: "Vésztartalék kalkulátor",
    title: tituloQueEntre(`Vésztartalék kalkulátor: ${ctx.nombrePais}`, "Vésztartalék kalkulátor: mennyi tartalék kell?", "Vésztartalék kalkulátor"),
    description: "Számold ki, mekkora vésztartalékra van szükséged az elengedhetetlen kiadásaid alapján, és hány hónap alatt gyűjtöd össze.",
    intro: [
      "A vésztartalék egy pénzpárna arra, amit nem lehet előre tervezni: munkahely elvesztése, egészségügyi gond vagy váratlan javítás otthon.",
      "Így nem kell hitelt felvenned vagy hitelkártyából élned épp akkor, amikor a legnehezebb. Add meg az elengedhetetlen kiadásaidat és azt, hány hónapot szeretnél lefedni.",
    ],
    comoSeCalcula: [
      "Javasolt vésztartalék = elengedhetetlen havi kiadások × hónapok száma.",
      "Még összegyűjtendő = javasolt vésztartalék − eddigi megtakarítás.",
      "Hónapok a cél eléréséig = még összegyűjtendő ÷ havi félretett összeg, felfelé kerekítve.",
    ],
    ejemplo: [
      `Ha az elengedhetetlen havi kiadásaid összege ${m(gastos)}, a 6 havi tartalék ennyi: ${m(gastos * 6)}.`,
      `Ha minden hónapban ennyit teszel félre: ${m(aporte)}, a tartalék ennyi hónap alatt gyűlik össze: ${meses}.`,
    ],
    faq: [
      {
        pregunta: "Hány hónapra legyen elég a vésztartalék?",
        respuesta:
          "Általában 3 és 6 hónap közötti elengedhetetlen kiadást javasolnak. Ha a jövedelmed rendszertelen, vállalkozó vagy, vagy a háztartásban csak egy kereső van, inkább 6 és 12 hónap közötti tartalékkal számolj.",
      },
      {
        pregunta: "Hol tartsam a vésztartalékot?",
        respuesta: "Biztonságos helyen, ahonnan még aznap hozzáférsz, a mindennapi kiadásokra használt kártyától elkülönítve. Ez nem kockázatos befektetésre szánt pénz: kéznél kell lennie, amikor szükséged van rá.",
      },
      {
        pregunta: "Mi legyen előbb: tartalék vagy adósságtörlesztés?",
        respuesta: "Gyakori sorrend, hogy előbb egyhavi kiadást teszel félre, aztán kifizeted a drága tartozásokat, például a hitelkártyát, végül feltöltöd a tartalékot a teljes összegre.",
      },
    ],
    glosario: [
      { termino: "Elengedhetetlen kiadások", definicion: "Azok a kiadások, amelyeket akkor is fizetned kell, ha elmarad a jövedelem: lakhatás, étel, rezsi, egészség." },
      { termino: "Likviditás", definicion: "Milyen gyorsan használhatod fel a pénzt anélkül, hogy veszítene az értékéből." },
    ],
  };
};
