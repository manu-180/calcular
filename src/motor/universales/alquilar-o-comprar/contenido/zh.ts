import { contenidoPorEscritura, esHongKong } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { comparar } from "../definicion";

function escenarios(ctx: ContextoUniversal) {
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  return { precio, alquiler, a10: comparar({ ...base, horizonte: 10 }).anios[9], a3: comparar({ ...base, horizonte: 3 }).anios[2] };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { precio, alquiler, a10, a3 } = escenarios(ctx);
    const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "買房" : "租房");
    const hk = esHongKong(ctx.locale);
    const e = hk ? "首期" : "頭期款";
    const p = hk ? "按揭" : "房貸";
    return {
      h1: "租屋還是買房試算",
      title: tituloQueEntre(`租屋還是買房試算｜${ctx.nombrePais}`, `租屋還是買房｜${ctx.nombrePais}`, "租屋還是買房試算"),
      description: "在您選擇的年數內比較租屋和買房，看哪一種留下的資產更多、從第幾年開始划算，以及差多少。",
      intro: [`只比${p}月付和房租是不夠的。買房要付利息、維修費和稅費，但最後房子是自己的；租屋則能把${e}持續拿去投資。`, "這個計算機逐年把這些加總起來，告訴您哪一種選擇留下的淨資產更多。"],
      comoSeCalcula: [
        `買房：每月付${p}和持有成本。淨資產是房屋價值減去尚未還清的貸款。`,
        `租房：${e}和購屋雜費以其他投資的報酬率持續投資，房租每年上漲。`,
        "每個月，支出較少的一方把差額拿去投資，讓兩種選擇用同樣的預算比較。",
        "最後淨資產較多的就是比較划算的選擇。",
      ],
      ejemplo: [
        `${m(precio)} 的房子付 20% ${e}、${p}利率 7%、25 年，對比每月房租 ${m(alquiler)}。`,
        `10 年來看，${quien(a10)}多出 ${m(Math.abs(a10.comprar - a10.alquilar))}；3 年來看，${quien(a3)}多出 ${m(Math.abs(a3.comprar - a3.alquilar))}。`,
      ],
      faq: [
        { pregunta: "租屋等於把錢丟掉嗎？", respuesta: "不完全是。買房的人也要付拿不回來的成本：利息、稅費和維修費。重要的是兩種情況最後各自留下多少資產。" },
        { pregunta: "為什麼比較的年數不同，答案也不同？", respuesta: "買房一開始有大筆成本（購屋雜費和前期利息），需要時間才能回本。如果近期打算搬家，通常租屋比較划算。" },
        { pregunta: "哪個數字影響最大？", respuesta: `房價和房租的比例、${p}利率，以及房價上漲的速度。試著調整房價漲幅和投資報酬率，看看答案會變多少。` },
      ],
      glosario: [
        { termino: "淨資產", definicion: "擁有的資產減去負債。" },
        { termino: "房價漲幅", definicion: "房屋價值每年上漲多少。" },
        { termino: "機會成本", definicion: `如果把${e}拿去投資，原本可以賺到的報酬。` },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { precio, alquiler, a10, a3 } = escenarios(ctx);
    const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "买房" : "租房");
    return {
      h1: "租房还是买房计算器",
      title: tituloQueEntre(`租房还是买房计算器｜${ctx.nombrePais}`, `租房还是买房｜${ctx.nombrePais}`, "租房还是买房计算器"),
      description: "在您选择的年数内比较租房和买房，看哪一种留下的资产更多、从第几年开始划算，以及差多少。",
      intro: ["只比房贷月供和房租是不够的。买房要付利息、维修费和税费，但最后房子是自己的；租房则能把首付持续拿去投资。", "这个计算器逐年把这些汇总起来，告诉您哪一种选择留下的净资产更多。"],
      comoSeCalcula: [
        "买房：每月付房贷和持有成本。净资产是房屋价值减去尚未还清的贷款。",
        "租房：首付和购房杂费按其他投资的收益率持续投资，房租每年上涨。",
        "每个月，支出较少的一方把差额拿去投资，让两种选择用同样的预算比较。",
        "最后净资产较多的就是更划算的选择。",
      ],
      ejemplo: [
        `${m(precio)} 的房子付 20% 首付、房贷利率 7%、25 年，对比每月房租 ${m(alquiler)}。`,
        `10 年来看，${quien(a10)}多出 ${m(Math.abs(a10.comprar - a10.alquilar))}；3 年来看，${quien(a3)}多出 ${m(Math.abs(a3.comprar - a3.alquilar))}。`,
      ],
      faq: [
        { pregunta: "租房等于把钱扔掉吗？", respuesta: "不完全是。买房的人也要付拿不回来的成本：利息、税费和维修费。重要的是两种情况最后各自留下多少资产。" },
        { pregunta: "为什么比较的年数不同，答案也不同？", respuesta: "买房一开始有大笔成本（购房杂费和前期利息），需要时间才能回本。如果近期打算搬家，通常租房更划算。" },
        { pregunta: "哪个数字影响最大？", respuesta: "房价和房租的比例、房贷利率，以及房价上涨的速度。试着调整房价涨幅和投资收益率，看看答案会变多少。" },
      ],
      glosario: [
        { termino: "净资产", definicion: "拥有的资产减去负债。" },
        { termino: "房价涨幅", definicion: "房屋价值每年上涨多少。" },
        { termino: "机会成本", definicion: "如果把首付拿去投资，原本可以获得的收益。" },
      ],
    };
  },
);
