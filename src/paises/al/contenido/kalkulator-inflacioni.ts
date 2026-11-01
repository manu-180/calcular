import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.kalkulator-inflacioni",
  h1: "Kalkulator inflacioni {{anio}}",
  title: "Kalkulator inflacioni {{anio}}: sa vlen sot shuma juaj",
  description: "Llogaritni fuqinë blerëse të një shume me Indeksin e Çmimeve të Konsumit të INSTAT, që nga janari 2021. Vendosni shumën dhe dy muajt që doni të krahasoni.",
  intro: [
    "Sipas INSTAT, inflacioni vjetor në shtator 2026 ishte 2,9%, nga 2,4% një vit më parë. Por për një periudhë më të gjatë ka më shumë rëndësi rritja e grumbulluar: kjo llogaritje e tregon për çdo muaj që nga janari 2021.",
    "Vendosni një shumë dhe dy muaj. Do të shihni sa duhet për të blerë të njëjtën gjë dhe sa vlen ajo shumë me çmimet e muajit të parë.",
  ],
  comoSeCalcula: [
    "Përdoret Indeksi i Çmimeve të Konsumit (IÇK), me bazë 2025 = 100. Indeksi i muajit të fundit është {{al.ick}}.",
    "Faktori është indeksi i muajit të fundit i pjesëtuar me indeksin e muajit të parë.",
    "Shuma shumëzohet me faktorin për të marrë fuqinë e njëjtë blerëse, ose pjesëtohet për të parë vlerën e vjetër.",
    "Që nga shkurti 2026, INSTAT e llogarit indeksin me klasifikimin ECOICOP 2018. Kalkulatori përdor serinë e rillogaritur COICOP Ver. 2.",
  ],
  ejemplo: [
    "Me 100 000 lekë në shtator 2025 blinit diçka që në shtator 2026 kushton 102 924 lekë. Për të njëjtën periudhë, 100 000 lekë të shtatorit 2026 vlejnë rreth 97 160 lekë me çmimet e një viti më parë. Nga janari 2021, 50 000 lekë janë bërë 61 128 lekë.",
  ],
  faq: [
    {
      pregunta: "Sa është inflacioni në Shqipëri?",
      respuesta: "INSTAT shënoi 2,9% në shtator 2026, krahasuar me shtatorin 2025. Krahasuar me gushtin 2026, çmimet u rritën me 0,4%.",
    },
    {
      pregunta: "Çfarë e ka rritur më shumë inflacionin?",
      respuesta: "Në shtator 2026, sipas INSTAT, ndikuan më shumë ushqimet dhe pijet joalkoolike, me 0,96 pikë përqindje, dhe transporti, me 0,81 pikë përqindje.",
    },
    {
      pregunta: "Ku është shifra e indeksit për muajin tim?",
      respuesta: "INSTAT e publikon në tabelën “Indeksi i Çmimeve të Konsumit (COICOP Ver.2)”, për çdo muaj që nga janari 2021. Këtu i ka të gjitha ato pika.",
    },
  ],
  glosario: [
    { termino: "IÇK", definicion: "Indeksi i Çmimeve të Konsumit, që mat ndryshimin e çmimeve të një shporte mallrash." },
    { termino: "Fuqi blerëse", definicion: "Sa mallra mund të blini me një shumë parash." },
  ],
});
