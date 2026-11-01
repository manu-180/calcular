import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.samoosiguryavashti-se-litsa",
  mercado: "bg",
  concepto: "propio",
  slug: "samoosiguryavashti-se-litsa",
  estado: "publicado",
  requiere: { "bg.vnoski-samoosig": "mapa", "bg.zdravna-vnoska": "mapa", "bg.min-dohod-samoosig": "numero", "bg.maks-osig-dohod": "numero" },
  campos: [
    { id: "dohod", tipo: "moneda", etiqueta: "Избран месечен осигурителен доход", min: 0, porDefecto: 1000 },
    { id: "ozm", tipo: "si-no", etiqueta: "Осигурявате се и за общо заболяване и майчинство", porDefecto: true },
    { id: "predi1960", tipo: "si-no", etiqueta: "Родени сте преди 1 януари 1960 г.", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.dohod < 0) throw new ErrorEntrada("Въведете доход.", "dohod");
    const min = v["bg.min-dohod-samoosig"];
    const maks = v["bg.maks-osig-dohod"];
    const osnova = Math.min(maks, Math.max(min, e.dohod));
    const m = v["bg.vnoski-samoosig"];
    const d = (s: number) => redondear((osnova * s) / 100);
    const pensii = d(enMapa(m, e.predi1960 ? "pensii-predi-1960" : "pensii"));
    const dzpo = e.predi1960 ? 0 : d(enMapa(m, "dzpo"));
    const ozm = e.ozm ? d(enMapa(m, "ozm")) : 0;
    const zdravno = d(enMapa(v["bg.zdravna-vnoska"], "obshto"));
    const mesechno = redondear(pensii + dzpo + ozm + zdravno);
    const observaciones: string[] = [];
    if (e.dohod < min) observaciones.push("Сумата е под минималния доход. Смятаме върху минимума.");
    if (e.dohod > maks) observaciones.push("Сумата е над максималния доход. Смятаме върху тавана.");
    return { mesechno, osnova, pensii, dzpo, ozm, zdravno, godishno: redondear(mesechno * 12), observaciones };
  },
  resultado: [
    { clave: "mesechno", etiqueta: "Вноски на месец", formato: "moneda", destacada: true },
    { clave: "osnova", etiqueta: "Осигурителна основа", formato: "moneda" },
    { clave: "pensii", etiqueta: "Фонд „Пенсии“", formato: "moneda" },
    { clave: "dzpo", etiqueta: "Универсален пенсионен фонд", formato: "moneda", ocultarSiCero: true },
    { clave: "ozm", etiqueta: "Общо заболяване и майчинство", formato: "moneda", ocultarSiCero: true },
    { clave: "zdravno", etiqueta: "Здравна вноска", formato: "moneda" },
    { clave: "godishno", etiqueta: "Вноски за 12 месеца", formato: "moneda" },
  ],
});
