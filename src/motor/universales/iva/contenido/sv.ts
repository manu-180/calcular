import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoSv: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `Momskalkylator för ${ctx.nombrePais}`,
    title: tituloQueEntre(
      `Momskalkylator (${tasa}): räkna ut moms | ${ctx.nombrePais}`,
      `Momskalkylator (${tasa}) | ${ctx.nombrePais}`,
      `Momskalkylator (${tasa})`,
    ),
    description: `Lägg på eller räkna bort ${tasa} moms på valfritt pris i ett steg. Du ser priset exklusive moms, momsen och priset inklusive moms.`,
    intro: [
      `Normalsatsen för moms som används här för ${ctx.nombrePais} är ${tasa}.`,
      "Välj om du vill lägga på moms på ett pris exklusive moms eller räkna bort momsen från ett pris där den redan ingår. Fyll sedan i beloppet.",
    ],
    comoSeCalcula: [
      "Lägga på moms: moms = pris exklusive moms × momssats ÷ 100. Pris inklusive moms = pris exklusive moms + moms.",
      "Räkna bort moms: pris exklusive moms = pris inklusive moms ÷ (1 + momssats ÷ 100). Momsen är skillnaden.",
      "Har varan en reducerad momssats kan du fylla i den under ”Annan momssats”.",
    ],
    ejemplo: [
      `För att lägga på moms på ${precio} multiplicerar du beloppet med ${tasa} och lägger resultatet till priset.`,
      `För att se hur mycket moms som ingår i ${precio} delar du beloppet med 1 plus momssatsen och drar av resultatet från ${precio}.`,
    ],
    faq: [
      {
        pregunta: "Hur räknar jag bort moms från ett pris?",
        respuesta: "Dela priset med 1 plus momssatsen i decimalform. Det som blir kvar är priset exklusive moms, och skillnaden är momsen.",
      },
      {
        pregunta: "Varför kan jag inte bara dra av procentsatsen från totalen?",
        respuesta: "Därför att momsen räknades på det lägre priset exklusive moms. Drar du av procentsatsen från totalen tar du bort för mycket.",
      },
      {
        pregunta: `Gäller ${tasa} moms på allt?`,
        respuesta: "Inte alltid. Livsmedel, böcker, persontransporter och vissa tjänster kan ha reducerad moms eller vara momsfria. Använd då ”Annan momssats”.",
      },
    ],
    glosario: [
      { termino: "Moms", definicion: "Mervärdesskatt, en skatt som läggs på priset för varor och tjänster." },
      { termino: "Pris exklusive moms", definicion: "Priset innan momsen har lagts på." },
    ],
  };
};
