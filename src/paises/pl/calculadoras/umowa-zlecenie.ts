import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { doGroszy, doZlotych } from "../lib/podatki";

export default definirCalculadora({
  id: "pl.umowa-zlecenie",
  mercado: "pl",
  concepto: "propio",
  slug: "umowa-zlecenie",
  estado: "publicado",
  requiere: {
    "pl.skala-pit": "escala",
    "pl.kwota-zmniejszajaca": "numero",
    "pl.skladki-pracownika": "mapa",
    "pl.skladka-zdrowotna": "numero",
    "pl.koszty-procentowe": "mapa",
    "pl.limit-malej-umowy": "numero",
    "pl.ryczalt-malej-umowy": "numero",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Kwota brutto z umowy zlecenia", min: 0, porDefecto: 3000 },
    { id: "student", tipo: "si-no", etiqueta: "Jesteś uczniem lub studentem i nie masz jeszcze 26 lat", porDefecto: false },
    { id: "chorobowe", tipo: "si-no", etiqueta: "Dobrowolne ubezpieczenie chorobowe", porDefecto: false, visibleSi: { student: [false] } },
    { id: "mlody", tipo: "si-no", etiqueta: "Masz mniej niż 26 lat (ulga dla młodych)", porDefecto: false, visibleSi: { student: [false] } },
    { id: "pit2", tipo: "si-no", etiqueta: "PIT-2 złożony u zleceniodawcy", porDefecto: false, visibleSi: { student: [false] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.brutto <= 0) throw new ErrorEntrada("Wpisz kwotę brutto większą od zera.", "brutto");
    const observaciones: string[] = [];
    if (e.student) {
      observaciones.push("Uczniowie i studenci przed 26. urodzinami na zleceniu nie płacą składek ZUS ani składki zdrowotnej, a ich przychód jest zwolniony z PIT do limitu ulgi dla młodych.");
      return { netto: e.brutto, emerytalne: 0, rentowe: 0, chorobowe: 0, zdrowotna: 0, koszty: 0, zaliczka: 0, observaciones };
    }
    const s = v["pl.skladki-pracownika"];
    const emerytalne = doGroszy((e.brutto * enMapa(s, "emerytalne")) / 100);
    const rentowe = doGroszy((e.brutto * enMapa(s, "rentowe")) / 100);
    const chorobowe = e.chorobowe ? doGroszy((e.brutto * enMapa(s, "chorobowe")) / 100) : 0;
    const spoleczne = emerytalne + rentowe + chorobowe;
    const zdrowotna = doGroszy(((e.brutto - spoleczne) * v["pl.skladka-zdrowotna"]) / 100);
    let koszty = 0;
    let zaliczka = 0;
    if (e.brutto <= v["pl.limit-malej-umowy"]) {
      zaliczka = e.mlody ? 0 : doZlotych((e.brutto * v["pl.ryczalt-malej-umowy"]) / 100);
      observaciones.push("Przy umowie na kwotę do 200 zł zawartej z osobą, która nie jest pracownikiem zleceniodawcy, pobiera się zryczałtowany podatek od całego przychodu, bez kosztów.");
    } else {
      koszty = doGroszy(((e.brutto - spoleczne) * enMapa(v["pl.koszty-procentowe"], "standard")) / 100);
      const podstawa = Math.max(0, doZlotych(e.brutto - spoleczne - koszty));
      const pomniejszenie = e.pit2 ? v["pl.kwota-zmniejszajaca"] / 12 : 0;
      zaliczka = e.mlody ? 0 : Math.max(0, doZlotych((podstawa * v["pl.skala-pit"][0].tasa) / 100 - pomniejszenie));
    }
    if (e.mlody) observaciones.push("Ulga dla młodych zwalnia z PIT przychód do limitu rocznego. Składki ZUS i zdrowotną płacisz normalnie.");
    return {
      netto: redondear(e.brutto - spoleczne - zdrowotna - zaliczka),
      emerytalne,
      rentowe,
      chorobowe,
      zdrowotna,
      koszty,
      zaliczka,
      observaciones,
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Na rękę", formato: "moneda", destacada: true },
    { clave: "emerytalne", etiqueta: "Składka emerytalna", formato: "moneda" },
    { clave: "rentowe", etiqueta: "Składka rentowa", formato: "moneda" },
    { clave: "chorobowe", etiqueta: "Składka chorobowa", formato: "moneda", ocultarSiCero: true },
    { clave: "zdrowotna", etiqueta: "Składka zdrowotna", formato: "moneda" },
    { clave: "koszty", etiqueta: "Koszty uzyskania przychodu", formato: "moneda", ocultarSiCero: true },
    { clave: "zaliczka", etiqueta: "Zaliczka na PIT", formato: "moneda" },
  ],
});
