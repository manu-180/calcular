import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoSq: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulator interes i përbërë",
    title: tituloQueEntre(`Kalkulator interes i përbërë: ${ctx.nombrePais}`, "Kalkulator interes i përbërë"),
    description: "Shikoni si rriten paratë me interes të përbërë dhe depozitime mujore. Zbuloni tepricën përfundimtare, interesin e fituar dhe një tabelë vit pas viti.",
    intro: [
      "Te interesi i përbërë, interesi i shtohet tepricës dhe fillon të sjellë vetë interes. Prandaj kursimet rriten gjithnjë e më shpejt.",
      "Vendosni atë që keni sot, sa mund të shtoni çdo muaj, interesin dhe numrin e viteve. Ju tregojmë tepricën përfundimtare dhe sa prej saj është interes.",
    ],
    comoSeCalcula: [
      "Teprica përfundimtare = shuma × (1 + i) në fuqi n + depozitimi × ((1 + i) në fuqi n − 1) ÷ i.",
      "Këtu i është interesi mujor i barasvlershëm me kapitalizimin e zgjedhur, ndërsa n është numri i muajve.",
      "Depozitimet shtohen në fund të çdo muaji.",
    ],
    ejemplo: [
      `Duke nisur nga ${m(capital)} dhe duke shtuar ${m(aporte)} në muaj, me një interes prej 7% në vit, arrini në ${m(a10)} për 10 vjet.`,
      `Nëse vazhdoni edhe 10 vjet të tjerë, teprica arrin në ${m(a20)}. Dekada e dytë sjell shumë më tepër se e para.`,
    ],
    faq: [
      {
        pregunta: "Cili është ndryshimi midis interesit të thjeshtë dhe interesit të përbërë?",
        respuesta: "Interesi i thjeshtë llogaritet gjithmonë mbi shumën fillestare. Interesi i përbërë llogaritet mbi shumën fillestare plus interesin e fituar tashmë.",
      },
      {
        pregunta: "Çfarë është rregulli i 72-shit?",
        respuesta: "Një mënyrë e shpejtë për të parë për sa kohë dyfishohen paratë: pjesëtoni 72 me interesin vjetor. Me 6%, dyfishohen për rreth 12 vjet.",
      },
      {
        pregunta: "Çfarë interesi të përdor?",
        respuesta: "Një interes realist për atë që do të bëni me paratë. Për ta parë rezultatin në paratë e sotme, përdorni interesin minus inflacionin e pritur.",
      },
    ],
    glosario: [
      { termino: "Kapitalizim", definicion: "Momenti kur interesi i shtohet tepricës." },
      { termino: "Interes i përbërë", definicion: "Interesi i llogaritur mbi tepricën plus interesin e fituar tashmë." },
    ],
  };
};
