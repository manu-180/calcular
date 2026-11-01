import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const NVAZETSVOGH = ["arevtur", "artadrutyun", "snund", "ayl"] as const;

export default definirCalculadora({
  id: "am.shrjanarutyan-hark",
  mercado: "am",
  concepto: "regimen-simplificado",
  slug: "shrjanarutyan-hark",
  estado: "publicado",
  requiere: {
    "am.shrjanarutyan-dedq": "mapa",
    "am.shrjanarutyan-nvazetsum": "mapa",
    "am.shrjanarutyan-nvazaguyn": "mapa",
    "am.shrjanarutyan-shem": "numero",
  },
  campos: [
    { id: "gortuneutyun", tipo: "opcion-dato", etiqueta: "Գործունեության տեսակը", dato: "am.shrjanarutyan-dedq", porDefecto: "ayl" },
    { id: "shrjanarutyun", tipo: "moneda", etiqueta: "Եռամսյակի իրացման շրջանառություն", min: 0, porDefecto: 3000000 },
    {
      id: "tsakhser",
      tipo: "moneda",
      etiqueta: "Փաստաթղթերով հիմնավորված ծախսեր եռամսյակում",
      ayuda: "Հիմնական միջոցների և ոչ նյութական ակտիվների ծախսերը չեն նվազեցվում։",
      min: 0,
      requerido: false,
      visibleSi: { gortuneutyun: ["arevtur", "artadrutyun", "snund", "ayl"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.shrjanarutyun <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ շրջանառություն։", "shrjanarutyun");
    const dedq = enMapa(v["am.shrjanarutyan-dedq"], e.gortuneutyun);
    const skzbnakan = porcentaje(e.shrjanarutyun, dedq);
    let hark = skzbnakan;
    if ((NVAZETSVOGH as readonly string[]).includes(e.gortuneutyun) && e.tsakhser) {
      const nvazetsum = porcentaje(e.tsakhser, enMapa(v["am.shrjanarutyan-nvazetsum"], e.gortuneutyun));
      const nvazaguyn = porcentaje(e.shrjanarutyun, enMapa(v["am.shrjanarutyan-nvazaguyn"], e.gortuneutyun));
      hark = Math.max(skzbnakan - nvazetsum, Math.min(nvazaguyn, skzbnakan));
    }
    const observaciones: string[] = [];
    if (e.shrjanarutyun * 4 > v["am.shrjanarutyan-shem"]) {
      observaciones.push("Տարեկան շրջանառությունը կարող է գերազանցել շրջանառության հարկի շեմը։ Շեմը գերազանցելուց հետո հարկ վճարողը դառնում է ԱԱՀ վճարող։");
    }
    return {
      hark: redondear(hark),
      dedq,
      skzbnakan: redondear(skzbnakan),
      nvazetsum: redondear(skzbnakan - hark),
      observaciones,
    };
  },
  resultado: [
    { clave: "hark", etiqueta: "Շրջանառության հարկը եռամսյակի համար", formato: "moneda", decimales: 0, destacada: true },
    { clave: "dedq", etiqueta: "Դրույքաչափ", formato: "porcentaje", decimales: 1 },
    { clave: "skzbnakan", etiqueta: "Հարկը մինչև ծախսերի նվազեցումը", formato: "moneda", decimales: 0 },
    { clave: "nvazetsum", etiqueta: "Ծախսերի գծով նվազեցում", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
