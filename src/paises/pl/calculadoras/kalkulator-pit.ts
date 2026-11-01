import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { doZlotych, podatekWedlugSkali } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.kalkulator-pit",
  mercado: "pl",
  concepto: "impuesto-renta",
  slug: "kalkulator-pit",
  estado: "publicado",
  requiere: {
    "pl.skala-pit": "escala",
    "pl.kwota-zmniejszajaca": "numero",
  },
  campos: [
    { id: "przychod", tipo: "moneda", etiqueta: "Przychód w roku (brutto z PIT-11)", min: 0, porDefecto: 100000 },
    { id: "koszty", tipo: "moneda", etiqueta: "Koszty uzyskania przychodu", min: 0, porDefecto: 3000 },
    { id: "skladki", tipo: "moneda", etiqueta: "Składki ZUS do odliczenia (emerytalna, rentowa, chorobowa)", min: 0, porDefecto: 13710 },
    { id: "zaliczki", tipo: "moneda", etiqueta: "Zaliczki na PIT pobrane w roku", min: 0, requerido: false },
    { id: "wspolnie", tipo: "si-no", etiqueta: "Rozliczasz się wspólnie z małżonkiem", porDefecto: false },
    { id: "dochodMalzonka", tipo: "moneda", etiqueta: "Dochód małżonka po odliczeniu składek", min: 0, porDefecto: 0, visibleSi: { wspolnie: [true] } },
  ],
  calcular(e, v) {
    if (e.koszty + e.skladki > e.przychod && e.przychod > 0) throw new ErrorEntrada("Koszty i składki nie mogą być wyższe niż przychód.", "koszty");
    const skala = { progi: v["pl.skala-pit"], kwotaZmniejszajaca: v["pl.kwota-zmniejszajaca"] };
    const dochod = Math.max(0, e.przychod - e.koszty);
    const podstawa = Math.max(0, doZlotych(dochod - e.skladki));
    let podatek: number;
    let podatekOsobno: number | null = null;
    if (e.wspolnie) {
      const malzonek = Math.max(0, doZlotych(e.dochodMalzonka ?? 0));
      podatek = doZlotych(2 * podatekWedlugSkali((podstawa + malzonek) / 2, skala));
      podatekOsobno = doZlotych(podatekWedlugSkali(podstawa, skala)) + doZlotych(podatekWedlugSkali(malzonek, skala));
    } else {
      podatek = doZlotych(podatekWedlugSkali(podstawa, skala));
    }
    const zaliczki = e.zaliczki ?? null;
    return {
      podatek,
      dochod,
      podstawa,
      stawkaEfektywna: e.przychod > 0 ? (podatek / e.przychod) * 100 : 0,
      oszczednosc: podatekOsobno === null ? null : podatekOsobno - podatek,
      doZaplaty: zaliczki === null ? null : Math.max(0, podatek - zaliczki),
      zwrot: zaliczki === null ? null : Math.max(0, zaliczki - podatek),
    };
  },
  resultado: [
    { clave: "podatek", etiqueta: "Podatek należny za rok", formato: "moneda", destacada: true },
    { clave: "dochod", etiqueta: "Dochód (przychód minus koszty)", formato: "moneda" },
    { clave: "podstawa", etiqueta: "Podstawa opodatkowania", formato: "moneda" },
    { clave: "stawkaEfektywna", etiqueta: "Podatek jako procent przychodu", formato: "porcentaje", decimales: 2 },
    { clave: "oszczednosc", etiqueta: "Zysk ze wspólnego rozliczenia", formato: "moneda" },
    { clave: "doZaplaty", etiqueta: "Do dopłaty w zeznaniu", formato: "moneda" },
    { clave: "zwrot", etiqueta: "Zwrot podatku", formato: "moneda" },
  ],
});
