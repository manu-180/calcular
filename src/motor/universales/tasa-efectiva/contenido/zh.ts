import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    return {
      h1: "名目利率與有效利率換算",
      title: tituloQueEntre(`名目利率與有效利率換算｜${ctx.nombrePais}`, `有效年利率換算｜${ctx.nombrePais}`, "有效年利率換算"),
      description: "把名目年利率換算成有效年利率，或反過來換算，可選擇每月、每季、每半年或每日複利。",
      intro: ["利率相同的兩個方案，實際花費可能不一樣，差別在於多久計息一次。", "有效年利率讓所有方案站在同一個基準上：一年下來實際付出或賺到多少。選擇您手上的利率，就會顯示另一個。"],
      comoSeCalcula: [
        "有效年利率 ＝（1 ＋ 名目年利率 ÷ m）的 m 次方 − 1。m 是一年的複利次數：每月為 12，每季為 4。",
        "名目年利率 ＝ m ×（（1 ＋ 有效年利率）的 1 ÷ m 次方 − 1）。",
        "每期利率是名目年利率除以 m。",
      ],
      ejemplo: [`名目年利率 12%、每月複利，有效年利率是 ${p(aEfectiva(12, 12))}。`, `有效年利率 10%，在每月複利下相當於名目年利率 ${p(aNominal(10, 12))}。`],
      faq: [
        { pregunta: "名目年利率和有效年利率有什麼不同？", respuesta: "名目年利率是還沒算複利的年利率；有效年利率則包含利息再生利息的效果。所以有效年利率一定等於或高於名目年利率。" },
        { pregunta: "比較方案時該看哪一個？", respuesta: "存款看有效年利率，因為它代表實際賺到的利息。貸款除了有效年利率，也要比較含手續費的總費用。" },
        { pregunta: "為什麼複利越頻繁，有效年利率越高？", respuesta: "利息越早併入本金，就越早開始生出自己的利息。一年複利一次的話，名目和有效年利率相同。" },
      ],
      glosario: [
        { termino: "名目年利率", definicion: "還沒計入複利的年利率。" },
        { termino: "有效年利率", definicion: "計入複利後的實際年利率。" },
        { termino: "複利", definicion: "利息併入本金後，連利息也會再生利息。" },
      ],
    };
  },
  (ctx) => {
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    return {
      h1: "名义利率与实际利率换算",
      title: tituloQueEntre(`名义利率与实际利率换算｜${ctx.nombrePais}`, `实际年利率换算｜${ctx.nombrePais}`, "实际年利率换算"),
      description: "把名义年利率换算成实际年利率，或者反过来换算，可选择按月、按季、按半年或按日复利。",
      intro: ["利率相同的两个方案，实际花费可能不一样，差别在于多久计息一次。", "实际年利率让所有方案站在同一个基准上：一年下来实际付出或赚到多少。选择您手上的利率，就会显示另一个。"],
      comoSeCalcula: [
        "实际年利率 ＝（1 ＋ 名义年利率 ÷ m）的 m 次方 − 1。m 是一年的复利次数：按月为 12，按季为 4。",
        "名义年利率 ＝ m ×（（1 ＋ 实际年利率）的 1 ÷ m 次方 − 1）。",
        "每期利率是名义年利率除以 m。",
      ],
      ejemplo: [`名义年利率 12%、按月复利，实际年利率是 ${p(aEfectiva(12, 12))}。`, `实际年利率 10%，在按月复利下相当于名义年利率 ${p(aNominal(10, 12))}。`],
      faq: [
        { pregunta: "名义年利率和实际年利率有什么不同？", respuesta: "名义年利率是还没算复利的年利率；实际年利率则包含利滚利的效果。所以实际年利率一定等于或高于名义年利率。" },
        { pregunta: "比较方案时该看哪一个？", respuesta: "存款看实际年利率，因为它代表实际赚到的利息。贷款除了实际年利率，还要比较含手续费的总费用。" },
        { pregunta: "为什么复利越频繁，实际年利率越高？", respuesta: "利息越早计入本金，就越早开始产生自己的利息。一年复利一次的话，名义和实际年利率相同。" },
      ],
      glosario: [
        { termino: "名义年利率", definicion: "还没计入复利的年利率。" },
        { termino: "实际年利率", definicion: "计入复利后的真实年利率。" },
        { termino: "复利", definicion: "利息计入本金后，连利息也会再产生利息。" },
      ],
    };
  },
);
