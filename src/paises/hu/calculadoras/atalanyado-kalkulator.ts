import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.atalanyado-kalkulator",
  mercado: "hu",
  concepto: "regimen-simplificado",
  slug: "atalanyado-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.atalanyado-koltseghanyad": "mapa",
    "hu.atalanyado-beveteli-hatar": "mapa",
    "hu.atalanyado-adomentes-resz": "numero",
    "hu.szja": "numero",
    "hu.tb-jarulek": "numero",
    "hu.szocho": "numero",
    "hu.minimalber": "mapa",
    "hu.garantalt-berminimum": "mapa",
  },
  campos: [
    { id: "bevetel", tipo: "moneda", etiqueta: "Éves bevétel", min: 0, porDefecto: 6000000 },
    { id: "tevekenyseg", tipo: "opcion-dato", dato: "hu.atalanyado-koltseghanyad", etiqueta: "Költséghányad a tevékenységed szerint", porDefecto: "altalanos" },
    {
      id: "fofoglalkozasu",
      tipo: "si-no",
      etiqueta: "Főfoglalkozású egyéni vállalkozó vagy",
      ayuda: "Ha mellette legalább heti 36 órás munkaviszonyod van, válaszd a nemet: ilyenkor a járulékot és a szochót minimum nélkül, a tényleges jövedelem után számoljuk.",
      porDefecto: true,
    },
    {
      id: "garantalt",
      tipo: "si-no",
      etiqueta: "A fő tevékenységed legalább középfokú végzettséget igényel",
      ayuda: "Ilyenkor a járulék és a szocho alsó határa a garantált bérminimum.",
      porDefecto: false,
      visibleSi: { fofoglalkozasu: [true] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.bevetel <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb éves bevételt.", "bevetel");
    const koltseghanyad = enMapa(v["hu.atalanyado-koltseghanyad"], e.tevekenyseg);
    const minimalberEves = enMapa(v["hu.minimalber"], "havi") * 12;
    const hatar = enMapa(v["hu.atalanyado-beveteli-hatar"], e.tevekenyseg === "kiskereskedelem" ? "kiskereskedelem" : "altalanos") * minimalberEves;
    const jovedelem = redondear((e.bevetel * (100 - koltseghanyad)) / 100);
    const adomentes = Math.min(jovedelem, v["hu.atalanyado-adomentes-resz"]);
    const adokoteles = jovedelem - adomentes;
    const szja = redondear((adokoteles * v["hu.szja"]) / 100);
    const minimumHavi = e.fofoglalkozasu ? enMapa(e.garantalt ? v["hu.garantalt-berminimum"] : v["hu.minimalber"], "havi") : 0;
    const jarulekAlap = Math.max(adokoteles, minimumHavi * 12);
    const tb = redondear((jarulekAlap * v["hu.tb-jarulek"]) / 100);
    const szocho = redondear((jarulekAlap * v["hu.szocho"]) / 100);
    const osszes = redondear(szja + tb + szocho);
    const observaciones: string[] = [];
    if (e.bevetel > hatar) {
      observaciones.push("A bevételed meghaladja az átalányadózás értékhatárát. Ennél nagyobb bevétellel az átalányadózás nem alkalmazható, a számítás csak tájékoztató.");
    }
    if (e.fofoglalkozasu && adokoteles < minimumHavi * 12) {
      observaciones.push("Az adóköteles jövedelmed kisebb a járulékalap alsó határánál, ezért a TB-járulékot és a szochót a minimum után számoljuk.");
    }
    observaciones.push("A járulékot és a szochót negyedévente kell bevallani és megfizetni. Az éves összeg ezek összege.");
    return {
      osszes,
      jovedelem,
      adomentes,
      adokoteles,
      szja,
      tb,
      szocho,
      havi: redondear(osszes / 12),
      marad: redondear(e.bevetel - osszes),
      hatar,
      observaciones,
    };
  },
  resultado: [
    { clave: "osszes", etiqueta: "Fizetendő adó és járulék egy évre", formato: "moneda", destacada: true },
    { clave: "havi", etiqueta: "Átlagosan havonta", formato: "moneda" },
    { clave: "jovedelem", etiqueta: "Átalányban megállapított jövedelem", formato: "moneda" },
    { clave: "adomentes", etiqueta: "Ebből adómentes", formato: "moneda" },
    { clave: "adokoteles", etiqueta: "Adóköteles jövedelem", formato: "moneda" },
    { clave: "szja", etiqueta: "SZJA", formato: "moneda" },
    { clave: "tb", etiqueta: "TB-járulék", formato: "moneda" },
    { clave: "szocho", etiqueta: "Szocho", formato: "moneda" },
    { clave: "marad", etiqueta: "A bevételből a közterhek után marad", formato: "moneda", ayuda: "A tényleges költségeidet még nem vontuk le." },
    { clave: "hatar", etiqueta: "Az átalányadózás bevételi határa", formato: "moneda" },
  ],
});
