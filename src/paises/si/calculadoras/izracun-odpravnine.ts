import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.izracun-odpravnine",
  mercado: "si",
  concepto: "indemnizacion-despido",
  slug: "izracun-odpravnine",
  estado: "publicado",
  requiere: { "si.odpravnina": "mapa", "si.povprecna-placa": "serie" },
  campos: [
    { id: "placa", tipo: "moneda", etiqueta: "Povprečna mesečna plača v zadnjih treh mesecih", min: 0, porDefecto: 2000 },
    { id: "leta", tipo: "entero", etiqueta: "Polna leta dela pri delodajalcu", min: 0, max: 60, porDefecto: 8 },
  ],
  calcular(e, v, { redondear }) {
    if (e.placa <= 0) throw new ErrorEntrada("Vnesite plačo, večjo od nič.", "placa");
    const m = v["si.odpravnina"];
    const imenovalec = e.leta > 20 ? enMapa(m, "nad20") : e.leta > 10 ? enMapa(m, "do20") : enMapa(m, "do10");
    const opombe: string[] = [];
    if (e.leta < 1) opombe.push("Zakon določa odpravnino za več kot eno leto dela pri delodajalcu.");
    const brezMeje = e.leta < 1 ? 0 : (e.placa * e.leta) / imenovalec;
    const meja = e.placa * enMapa(m, "najvec");
    const odpravnina = redondear(Math.min(brezMeje, meja));
    if (brezMeje > meja) opombe.push("Znesek je omejen z zgornjo mejo iz zakona, kolektivna pogodba dejavnosti pa lahko določa drugače.");
    const neobdavcena = redondear(Math.min(odpravnina, v["si.povprecna-placa"].valor * enMapa(m, "davcno-najvec")));
    return { odpravnina, delez: e.leta < 1 ? 0 : redondear(Math.min(e.leta / imenovalec, enMapa(m, "najvec"))), neobdavcena, obdavcena: redondear(odpravnina - neobdavcena), observaciones: opombe };
  },
  resultado: [
    { clave: "odpravnina", etiqueta: "Odpravnina", formato: "moneda", destacada: true },
    { clave: "delez", etiqueta: "Število mesečnih osnov", formato: "numero", decimales: 2 },
    { clave: "neobdavcena", etiqueta: "Del brez dohodnine in prispevkov", formato: "moneda" },
    { clave: "obdavcena", etiqueta: "Del z dohodnino in prispevki", formato: "moneda", ocultarSiCero: true },
  ],
});
