import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.osiguritelni-vnoski",
  mercado: "bg",
  concepto: "aportes-seguridad-social",
  slug: "osiguritelni-vnoski",
  estado: "publicado",
  requiere: { "bg.vnoski-rabotnik": "mapa", "bg.vnoski-rabotodatel": "mapa", "bg.zdravna-vnoska": "mapa", "bg.maks-osig-dohod": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Брутна месечна заплата", min: 0, porDefecto: 1500 },
    { id: "predi1960", tipo: "si-no", etiqueta: "Родени сте преди 1 януари 1960 г.", porDefecto: false, ayuda: "Те плащат по-висока вноска за пенсия и нямат вноска за универсален пенсионен фонд." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете брутна заплата над нула.", "bruto");
    const osnova = Math.min(e.bruto, v["bg.maks-osig-dohod"]);
    const d = (s: number) => redondear((osnova * s) / 100);
    const m = v["bg.vnoski-rabotnik"];
    const t = v["bg.vnoski-rabotodatel"];
    const z = v["bg.zdravna-vnoska"];
    const klyuch = e.predi1960 ? "pensii-predi-1960" : "pensii";
    const pensiiLitse = d(enMapa(m, klyuch));
    const pensiiFirma = d(enMapa(t, klyuch));
    const ozmLitse = d(enMapa(m, "ozm"));
    const ozmFirma = d(enMapa(t, "ozm"));
    const bezLitse = d(enMapa(m, "bezrabotitsa"));
    const bezFirma = d(enMapa(t, "bezrabotitsa"));
    const dzpoLitse = e.predi1960 ? 0 : d(enMapa(m, "dzpo"));
    const dzpoFirma = e.predi1960 ? 0 : d(enMapa(t, "dzpo"));
    const zdrLitse = d(enMapa(z, "rabotnik"));
    const zdrFirma = d(enMapa(z, "rabotodatel"));
    const litse = redondear(pensiiLitse + ozmLitse + bezLitse + dzpoLitse + zdrLitse);
    const firma = redondear(pensiiFirma + ozmFirma + bezFirma + dzpoFirma + zdrFirma);
    return { osnova, litse, firma, obshto: redondear(litse + firma), pensiiLitse, pensiiFirma, ozmLitse, ozmFirma, bezLitse, bezFirma, dzpoLitse, dzpoFirma, zdrLitse, zdrFirma };
  },
  resultado: [
    { clave: "litse", etiqueta: "Вноски за Ваша сметка", formato: "moneda", destacada: true },
    { clave: "firma", etiqueta: "Вноски за сметка на работодателя (без трудова злополука)", formato: "moneda" },
    { clave: "obshto", etiqueta: "Общо вноски", formato: "moneda" },
    { clave: "osnova", etiqueta: "Осигурителна основа", formato: "moneda" },
    { clave: "pensiiLitse", etiqueta: "„Пенсии“: работник", formato: "moneda" },
    { clave: "pensiiFirma", etiqueta: "„Пенсии“: работодател", formato: "moneda" },
    { clave: "ozmLitse", etiqueta: "Общо заболяване и майчинство: работник", formato: "moneda" },
    { clave: "ozmFirma", etiqueta: "Общо заболяване и майчинство: работодател", formato: "moneda" },
    { clave: "bezLitse", etiqueta: "„Безработица“: работник", formato: "moneda" },
    { clave: "bezFirma", etiqueta: "„Безработица“: работодател", formato: "moneda" },
    { clave: "dzpoLitse", etiqueta: "Допълнителна пенсия: работник", formato: "moneda", ocultarSiCero: true },
    { clave: "dzpoFirma", etiqueta: "Допълнителна пенсия: работодател", formato: "moneda", ocultarSiCero: true },
    { clave: "zdrLitse", etiqueta: "Здравна вноска: работник", formato: "moneda" },
    { clave: "zdrFirma", etiqueta: "Здравна вноска: работодател", formato: "moneda" },
  ],
});
