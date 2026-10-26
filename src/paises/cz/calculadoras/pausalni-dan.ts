import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { parametryOsvc, REQUIERE_OSVC, rokOsvc } from "../lib/osvc";

const PASMA = { prvni: "První pásmo", druhe: "Druhé pásmo", treti: "Třetí pásmo" } as const;
const VYDAJE = { "80": "zemedelstvi-remesla", "60": "zivnost", jine: "jine" } as const;

export default definirCalculadora({
  id: "cz.pausalni-dan",
  mercado: "cz",
  concepto: "regimen-simplificado",
  slug: "pausalni-dan",
  estado: "publicado",
  requiere: { ...REQUIERE_OSVC, "cz.pausalni-dan": "mapa", "cz.pausalni-dan-limity": "mapa", "cz.pausalni-dan-slozky": "mapa" },
  campos: [
    { id: "prijmy", tipo: "moneda", etiqueta: "Příjmy z podnikání za rok", min: 0, porDefecto: 1000000 },
    {
      id: "slozeni",
      tipo: "opcion",
      etiqueta: "Druh příjmů",
      opciones: [
        { valor: "80", etiqueta: "Aspoň 75 % příjmů s výdaji 80 % (řemesla, zemědělství)" },
        { valor: "60", etiqueta: "Aspoň 75 % příjmů s výdaji 80 % nebo 60 % (živnosti)" },
        { valor: "jine", etiqueta: "Ostatní (svobodná povolání, autorské příjmy, kombinace)" },
      ],
      porDefecto: "60",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prijmy <= 0) throw new ErrorEntrada("Zadejte příjmy vyšší než nula.", "prijmy");
    const l = v["cz.pausalni-dan-limity"];
    const limitPrvni = e.slozeni === "80" ? enMapa(l, "prvni-80") : e.slozeni === "60" ? enMapa(l, "prvni-60") : enMapa(l, "prvni-obecne");
    const limitDruhe = e.slozeni === "jine" ? enMapa(l, "druhe-obecne") : enMapa(l, "druhe-60");
    const limitTreti = enMapa(l, "treti");
    if (e.prijmy > limitTreti) throw new ErrorEntrada("Při příjmech nad horní hranicí třetího pásma do paušálního režimu vstoupit nelze.", "prijmy");
    const pasmo = e.prijmy <= limitPrvni ? "prvni" : e.prijmy <= limitDruhe ? "druhe" : "treti";
    const mesicne = enMapa(v["cz.pausalni-dan"], pasmo);
    const s = v["cz.pausalni-dan-slozky"];
    const typ = VYDAJE[e.slozeni];
    const bezny = rokOsvc(e.prijmy, "hlavni", 12, 0, parametryOsvc(v, typ, "hlavni"));
    const rocne = mesicne * 12;
    const uspora = redondear(bezny.celkem - rocne);
    return {
      mesicne,
      pasmo: PASMA[pasmo],
      rocne,
      dan: enMapa(s, `${pasmo}-dan`),
      socialni: enMapa(s, `${pasmo}-socialni`),
      zdravotni: enMapa(s, `${pasmo}-zdravotni`),
      bezny: redondear(bezny.celkem),
      uspora,
      observaciones: [
        uspora > 0
          ? "Paušální daň vychází levněji než běžný režim s paušálními výdaji."
          : "Běžný režim s paušálními výdaji vychází levněji než paušální daň.",
        "Srovnání předpokládá hlavní činnost po celý rok, žádné jiné příjmy a žádné děti. Do paušálního režimu nemůže plátce DPH ani společník veřejné obchodní společnosti.",
      ],
    };
  },
  resultado: [
    { clave: "mesicne", etiqueta: "Paušální záloha za měsíc", formato: "moneda", destacada: true },
    { clave: "pasmo", etiqueta: "Pásmo paušálního režimu", formato: "texto" },
    { clave: "rocne", etiqueta: "Paušální daň za rok", formato: "moneda" },
    { clave: "dan", etiqueta: "Z toho daň z příjmů (měsíčně)", formato: "moneda" },
    { clave: "socialni", etiqueta: "Z toho sociální pojištění (měsíčně)", formato: "moneda" },
    { clave: "zdravotni", etiqueta: "Z toho zdravotní pojištění (měsíčně)", formato: "moneda" },
    { clave: "bezny", etiqueta: "Daň a pojištění v běžném režimu za rok", formato: "moneda" },
    { clave: "uspora", etiqueta: "Úspora paušálního režimu za rok", formato: "moneda" },
  ],
});
