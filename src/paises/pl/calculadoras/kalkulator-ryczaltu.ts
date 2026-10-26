import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { ryczalt, type ParametryB2b } from "../lib/b2b";
import { skladkiOdPodstawy, stopyPrzedsiebiorcy, ZERO } from "../lib/dzialalnosc";

const PROGI: Record<string, string> = {
  "do-60000": "Przychód do 60 000 zł w roku",
  "do-300000": "Przychód od 60 000 do 300 000 zł w roku",
  "ponad-300000": "Przychód ponad 300 000 zł w roku",
};

export default definirCalculadora({
  id: "pl.kalkulator-ryczaltu",
  mercado: "pl",
  concepto: "regimen-simplificado",
  slug: "kalkulator-ryczaltu",
  estado: "publicado",
  requiere: {
    "pl.stawki-ryczaltu": "mapa",
    "pl.skladki-pracownika": "mapa",
    "pl.skladki-platnika": "mapa",
    "pl.skladka-wypadkowa": "numero",
    "pl.fundusze": "mapa",
    "pl.podstawa-zus-pelna": "numero",
    "pl.podstawa-zus-preferencyjna": "numero",
    "pl.skladka-zdrowotna": "numero",
    "pl.zdrowotna-ryczalt": "mapa",
    "pl.odliczenie-zdrowotnej-ryczalt": "numero",
  },
  campos: [
    { id: "przychod", tipo: "moneda", etiqueta: "Przychód miesięcznie (bez VAT)", min: 0, porDefecto: 10000 },
    { id: "stawka", tipo: "opcion-dato", dato: "pl.stawki-ryczaltu", etiqueta: "Stawka ryczałtu", porDefecto: "12" },
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
    { id: "chorobowe", tipo: "si-no", etiqueta: "Dobrowolne ubezpieczenie chorobowe", porDefecto: false },
    { id: "koszty", tipo: "moneda", etiqueta: "Wydatki firmy miesięcznie (nie zmniejszają podatku)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.przychod <= 0) throw new ErrorEntrada("Wpisz przychód większy od zera.", "przychod");
    const stopy = stopyPrzedsiebiorcy(v["pl.skladki-pracownika"], v["pl.skladki-platnika"], v["pl.skladka-wypadkowa"], v["pl.fundusze"]);
    const s =
      e.zus === "ulga-na-start"
        ? ZERO
        : e.zus === "preferencyjny"
          ? skladkiOdPodstawy(v["pl.podstawa-zus-preferencyjna"], stopy, { chorobowe: e.chorobowe, fpFs: false })
          : skladkiOdPodstawy(v["pl.podstawa-zus-pelna"], stopy, { chorobowe: e.chorobowe, fpFs: true });
    const p = {
      zdrowotna: v["pl.skladka-zdrowotna"],
      podstawyRyczaltu: v["pl.zdrowotna-ryczalt"],
      odliczenieZdrowotnejRyczalt: v["pl.odliczenie-zdrowotnej-ryczalt"],
    } as ParametryB2b;
    const r = ryczalt({ przychod: e.przychod, koszty: e.koszty, spoleczne: s.spoleczne, fpFs: s.fpFs }, p, enMapa(v["pl.stawki-ryczaltu"], e.stawka));
    return {
      naReke: r.naReke,
      ryczaltMiesiecznie: redondear(r.podatekRoczny / 12),
      ryczaltRoczny: r.podatekRoczny,
      zdrowotna: r.zdrowotna,
      zus: s.razem,
      prog: PROGI[r.prog],
      observaciones: ["Składka zdrowotna zależy od przychodu w całym roku. Kalkulator przyjmuje, że co miesiąc masz taki sam przychód."],
    };
  },
  resultado: [
    { clave: "naReke", etiqueta: "Na rękę miesięcznie (średnio)", formato: "moneda", destacada: true },
    { clave: "ryczaltMiesiecznie", etiqueta: "Ryczałt miesięcznie (średnio)", formato: "moneda" },
    { clave: "ryczaltRoczny", etiqueta: "Ryczałt za rok", formato: "moneda" },
    { clave: "zdrowotna", etiqueta: "Składka zdrowotna", formato: "moneda" },
    { clave: "prog", etiqueta: "Próg składki zdrowotnej", formato: "texto" },
    { clave: "zus", etiqueta: "Składki społeczne z FP i FS", formato: "moneda" },
  ],
});
