import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ua.podatok-na-depozyt",
  mercado: "ua",
  concepto: "plazo-fijo",
  slug: "podatok-na-depozyt",
  estado: "publicado",
  requiere: {
    "ua.pdfo": "numero",
    "ua.viiskovyi-zbir": "numero",
  },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Сума депозиту", min: 0, porDefecto: 100000 },
    { id: "stavka", tipo: "porcentaje", etiqueta: "Ставка банку, % річних", min: 0, max: 100, porDefecto: 14 },
    { id: "misiatsi", tipo: "entero", etiqueta: "Строк, місяців", min: 1, max: 120, porDefecto: 12 },
    { id: "kapitalizatsiia", tipo: "si-no", etiqueta: "Щомісячна капіталізація процентів", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Введіть суму депозиту, більшу за нуль.", "suma");
    if (e.stavka <= 0) throw new ErrorEntrada("Введіть ставку, більшу за нуль.", "stavka");
    const tPdfo = v["ua.pdfo"];
    const tVz = v["ua.viiskovyi-zbir"];
    let procenty = 0;
    let pdfo = 0;
    let vz = 0;
    if (e.kapitalizatsiia) {
      let zalyshok = e.suma;
      for (let m = 0; m < e.misiatsi; m++) {
        const p = redondear((zalyshok * e.stavka) / 1200);
        const pp = redondear(porcentaje(p, tPdfo));
        const pv = redondear(porcentaje(p, tVz));
        procenty += p;
        pdfo += pp;
        vz += pv;
        zalyshok = redondear(zalyshok + p - pp - pv);
      }
    } else {
      procenty = redondear((e.suma * e.stavka * e.misiatsi) / 1200);
      pdfo = redondear(porcentaje(procenty, tPdfo));
      vz = redondear(porcentaje(procenty, tVz));
    }
    procenty = redondear(procenty);
    pdfo = redondear(pdfo);
    vz = redondear(vz);
    const chysti = redondear(procenty - pdfo - vz);
    return {
      chysti,
      procenty,
      pdfo,
      vz,
      kinets: redondear(e.suma + chysti),
      efektyvna: (chysti / e.suma) * (1200 / e.misiatsi),
    };
  },
  resultado: [
    { clave: "chysti", etiqueta: "Дохід після податків", formato: "moneda", destacada: true },
    { clave: "procenty", etiqueta: "Нараховані проценти", formato: "moneda" },
    { clave: "pdfo", etiqueta: "ПДФО", formato: "moneda" },
    { clave: "vz", etiqueta: "Військовий збір", formato: "moneda" },
    { clave: "kinets", etiqueta: "Сума наприкінці строку", formato: "moneda" },
    { clave: "efektyvna", etiqueta: "Чиста дохідність, % річних", formato: "porcentaje", decimales: 2 },
  ],
});
