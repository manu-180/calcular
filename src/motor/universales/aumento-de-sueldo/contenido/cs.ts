import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoCs: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)} %`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulačka zvýšení mzdy",
    title: tituloQueEntre(
      `Kalkulačka zvýšení mzdy ${GRAMATICA.cs.para(ctx.nombrePais)}`,
      `Zvýšení mzdy ${GRAMATICA.cs.en(ctx.nombrePais)}`,
      "Kalkulačka zvýšení mzdy",
    ),
    description: "Spočítejte novou mzdu po zvýšení, rozdíl za měsíc i za rok a zjistěte, jestli vaše reálné zvýšení předbíhá inflaci.",
    intro: [
      "Nabídli vám přidat, nebo se o zvýšení platu chystáte požádat. Zadejte mzdu a zvýšení v procentech nebo jako částku a uvidíte, o kolik se změní každý měsíc i za celý rok.",
      "Přidejte inflaci za dané období a ukážeme vám, jestli vaše kupní síla opravdu roste, nebo mzda jen dohání ceny.",
    ],
    comoSeCalcula: [
      "Nová mzda = současná mzda × (1 + zvýšení ÷ 100).",
      "Rozdíl za rok = rozdíl za měsíc × počet výplat za rok.",
      "Reálné zvýšení = (1 + zvýšení) ÷ (1 + inflace) − 1.",
    ],
    ejemplo: [
      `Mzda ${m(sueldo)} měsíčně se po zvýšení o 5 % změní na ${m(sueldo * 1.05)}: o ${m(sueldo * 0.05)} víc každý měsíc a o ${m(sueldo * 0.05 * 12)} víc za rok.`,
      `Pokud byla inflace za dané období 3 %, reálné zvýšení je ${p(aumentoReal(5, 3))}. Při inflaci 6 % vychází ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Co je reálné zvýšení mzdy?",
        respuesta: "Je to zvýšení po zohlednění inflace. Ukazuje, jestli si za novou mzdu koupíte víc, nebo méně než dřív.",
      },
      {
        pregunta: "Proč nestačí odečíst inflaci od zvýšení?",
        respuesta: `Protože se procenta násobí, ne odčítají. Při zvýšení o 5 % a inflaci 3 % je reálné zvýšení ${p(aumentoReal(5, 3))}, ne 2 %. Při vysoké inflaci je rozdíl mnohem větší.`,
      },
      {
        pregunta: "O kolik si říct?",
        respuesta: "Aspoň o inflaci od posledního zvýšení, abyste nepřicházeli o kupní sílu. Nad to se řiďte tím, kolik za stejnou pozici platí jiní zaměstnavatelé a o kolik vzrostla vaše odpovědnost.",
      },
    ],
    glosario: [
      { termino: "Nominální zvýšení", definicion: "Zvýšení tak, jak je uvedené na výplatní pásce, bez zohlednění inflace." },
      { termino: "Kupní síla", definicion: "Co si za svou mzdu můžete koupit." },
    ],
  };
};
