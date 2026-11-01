import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Kalkulator kursimi për pension",
    title: tituloQueEntre(`Kalkulator kursimi për pension: ${ctx.nombrePais}`, "Kalkulator kursimi për pension", "Kursime për pension"),
    description: "Zbuloni sa mund të grumbulloni për pension me një kontribut mujor dhe çfarë të ardhurash mujore do t'ju sillnin këto kursime, në paratë e sotme.",
    intro: [
      "Pensioni shtetëror shpesh nuk mjafton për të ruajtur nivelin e jetesës. Kursimet tuaja, edhe të vogla, bëjnë diferencë të madhe nëse filloni herët.",
      "Vendosni moshën tuaj, moshën në të cilën dëshironi të dilni në pension, atë që keni tashmë dhe sa mund të lini mënjanë çdo muaj. Shikoni kursimet në daljen në pension dhe sa mund të tërhiqni prej tyre çdo muaj.",
    ],
    comoSeCalcula: [
      "Kursimet rriten çdo muaj me kthimin real, pra kthimin minus inflacionin. Kështu rezultati mbetet në paratë e sotme.",
      "Në daljen në pension, kursimet paguhen në shuma mujore të barabarta për numrin e viteve të zgjedhura. Ajo që mbetet vazhdon të sjellë kthim ndërkohë.",
      "Nuk përfshihen pensioni shtetëror, tatimet dhe komisionet e administrimit.",
    ],
    ejemplo: [
      `Me ${m(actual)} të kursyera në moshën 30 vjeç dhe ${m(aporte)} në muaj, me një kthim real prej 4%, arrini në ${m(capital30)} në moshën 65 vjeç. Kjo do të thotë ${m(rentaMensual(capital30, 4, 25))} në muaj për 25 vjet.`,
      `Nëse filloni në moshën 40 vjeç me të njëjtat shifra, arrini në ${m(capital40)}. Dhjetë vjet bëjnë një diferencë të madhe.`,
    ],
    faq: [
      {
        pregunta: "Çfarë është kthimi real?",
        respuesta: "Është ajo që fiton një investim pas inflacionit. Nëse investimi sjell 7% në vit dhe inflacioni është 3%, kthimi real është rreth 4%.",
      },
      {
        pregunta: "A e zëvendësojnë kursimet pensionin shtetëror?",
        respuesta: "Jo. Janë kursimet tuaja, përveç pensionit shtetëror ose një fondi pensionesh. Për një përllogaritje të pensionit shtetëror, pyesni institucionin e pensioneve të vendit tuaj.",
      },
      {
        pregunta: "Sa duhet të kursej për pension?",
        respuesta: "Nuk ka një shifër të vetme. Një rregull i përdorur shpesh është midis 10% dhe 15% të të ardhurave. Më e rëndësishmja është të filloni sa më herët.",
      },
    ],
    glosario: [
      { termino: "Kthim real", definicion: "Sa fiton një investim mbi inflacionin." },
      { termino: "Paratë e sotme", definicion: "Një shumë e ardhshme e shprehur me atë që mund të blinte sot." },
    ],
  };
};
