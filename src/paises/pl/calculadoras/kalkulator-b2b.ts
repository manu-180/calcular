import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { liniowy, ryczalt, skala, type ParametryB2b } from "../lib/b2b";
import { skladkiOdPodstawy, stopyPrzedsiebiorcy, ZERO } from "../lib/dzialalnosc";
import { doGroszy } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-b2b",
  mercado: "pl",
  concepto: "propio",
  slug: "kalkulator-b2b",
  estado: "publicado",
  requiere: {
    "pl.skala-pit": "escala",
    "pl.kwota-zmniejszajaca": "numero",
    "pl.podatek-liniowy": "numero",
    "pl.stawki-ryczaltu": "mapa",
    "pl.skladki-pracownika": "mapa",
    "pl.skladki-platnika": "mapa",
    "pl.skladka-wypadkowa": "numero",
    "pl.fundusze": "mapa",
    "pl.podstawa-zus-pelna": "numero",
    "pl.podstawa-zus-preferencyjna": "numero",
    "pl.skladka-zdrowotna": "numero",
    "pl.skladka-zdrowotna-liniowa": "numero",
    "pl.zdrowotna-podstawa-minimalna": "numero",
    "pl.zdrowotna-ryczalt": "mapa",
    "pl.limit-zdrowotnej-liniowy": "numero",
    "pl.odliczenie-zdrowotnej-ryczalt": "numero",
  },
  campos: [
    { id: "przychod", tipo: "moneda", etiqueta: "Przychód netto z faktur miesięcznie (bez VAT)", min: 0, porDefecto: 15000 },
    { id: "koszty", tipo: "moneda", etiqueta: "Koszty firmy miesięcznie (bez VAT)", min: 0, porDefecto: 1000 },
    {
      id: "zus",
      tipo: "opcion",
      etiqueta: "Składki społeczne",
      opciones: [
        { valor: "pelny", etiqueta: "Pełny ZUS" },
        { valor: "preferencyjny", etiqueta: "Preferencyjny ZUS" },
        { valor: "ulga-na-start", etiqueta: "Ulga na start" },
      ],
      porDefecto: "pelny",
    },
    { id: "chorobowe", tipo: "si-no", etiqueta: "Dobrowolne ubezpieczenie chorobowe", porDefecto: true },
    { id: "stawka", tipo: "opcion-dato", dato: "pl.stawki-ryczaltu", etiqueta: "Stawka ryczałtu dla Twojej branży", porDefecto: "12" },
  ],
  calcular(e, v, { redondear }) {
    if (e.przychod <= 0) throw new ErrorEntrada("Wpisz przychód większy od zera.", "przychod");
    if (e.koszty >= e.przychod) throw new ErrorEntrada("Koszty muszą być niższe niż przychód.", "koszty");
    const stopy = stopyPrzedsiebiorcy(v["pl.skladki-pracownika"], v["pl.skladki-platnika"], v["pl.skladka-wypadkowa"], v["pl.fundusze"]);
    const s =
      e.zus === "ulga-na-start"
        ? ZERO
        : e.zus === "preferencyjny"
          ? skladkiOdPodstawy(v["pl.podstawa-zus-preferencyjna"], stopy, { chorobowe: e.chorobowe, fpFs: false })
          : skladkiOdPodstawy(v["pl.podstawa-zus-pelna"], stopy, { chorobowe: e.chorobowe, fpFs: true });
    const p: ParametryB2b = {
      skala: { progi: v["pl.skala-pit"], kwotaZmniejszajaca: v["pl.kwota-zmniejszajaca"] },
      liniowy: v["pl.podatek-liniowy"],
      zdrowotna: v["pl.skladka-zdrowotna"],
      zdrowotnaLiniowa: v["pl.skladka-zdrowotna-liniowa"],
      zdrowotnaMinimalna: doGroszy((v["pl.zdrowotna-podstawa-minimalna"] * v["pl.skladka-zdrowotna"]) / 100),
      limitZdrowotnejLiniowy: v["pl.limit-zdrowotnej-liniowy"],
      podstawyRyczaltu: v["pl.zdrowotna-ryczalt"],
      odliczenieZdrowotnejRyczalt: v["pl.odliczenie-zdrowotnej-ryczalt"],
    };
    const w = { przychod: e.przychod, koszty: e.koszty, spoleczne: s.spoleczne, fpFs: s.fpFs };
    const sk = skala(w, p);
    const li = liniowy(w, p);
    const ry = ryczalt(w, p, enMapa(v["pl.stawki-ryczaltu"], e.stawka));
    const formy = [
      { nazwa: "Skala podatkowa", naReke: sk.naReke },
      { nazwa: "Podatek liniowy", naReke: li.naReke },
      { nazwa: "Ryczałt", naReke: ry.naReke },
    ];
    const najlepsza = formy.reduce((a, b) => (b.naReke > a.naReke ? b : a));
    return {
      najwiecej: najlepsza.naReke,
      najlepsza: najlepsza.nazwa,
      naRekeSkala: sk.naReke,
      naRekeLiniowy: li.naReke,
      naRekeRyczalt: ry.naReke,
      zus: s.razem,
      zdrowotnaSkala: sk.zdrowotna,
      zdrowotnaLiniowy: li.zdrowotna,
      zdrowotnaRyczalt: ry.zdrowotna,
      podatekSkala: redondear(sk.podatekRoczny / 12),
      podatekLiniowy: redondear(li.podatekRoczny / 12),
      podatekRyczalt: redondear(ry.podatekRoczny / 12),
      observaciones: [
        "Kwoty na rękę to średnia miesięczna z całego roku, po odjęciu kosztów, składek i podatku. Kalkulator nie zalicza Funduszu Pracy i Funduszu Solidarnościowego do kosztów i nie uwzględnia ulg podatkowych.",
      ],
    };
  },
  resultado: [
    { clave: "najwiecej", etiqueta: "Najwięcej na rękę miesięcznie", formato: "moneda", destacada: true },
    { clave: "najlepsza", etiqueta: "Najkorzystniejsza forma opodatkowania", formato: "texto" },
    { clave: "naRekeSkala", etiqueta: "Na rękę: skala podatkowa", formato: "moneda" },
    { clave: "naRekeLiniowy", etiqueta: "Na rękę: podatek liniowy", formato: "moneda" },
    { clave: "naRekeRyczalt", etiqueta: "Na rękę: ryczałt", formato: "moneda" },
    { clave: "zus", etiqueta: "Składki społeczne z FP i FS w miesiącu", formato: "moneda" },
    { clave: "zdrowotnaSkala", etiqueta: "Składka zdrowotna: skala", formato: "moneda" },
    { clave: "zdrowotnaLiniowy", etiqueta: "Składka zdrowotna: liniowy", formato: "moneda" },
    { clave: "zdrowotnaRyczalt", etiqueta: "Składka zdrowotna: ryczałt", formato: "moneda" },
    { clave: "podatekSkala", etiqueta: "Podatek miesięcznie (średnio): skala", formato: "moneda" },
    { clave: "podatekLiniowy", etiqueta: "Podatek miesięcznie (średnio): liniowy", formato: "moneda" },
    { clave: "podatekRyczalt", etiqueta: "Podatek miesięcznie (średnio): ryczałt", formato: "moneda" },
  ],
});
