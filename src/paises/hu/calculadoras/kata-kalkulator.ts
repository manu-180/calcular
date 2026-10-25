import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.kata-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "kata-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.kata-teteles-ado": "numero",
    "hu.kata-keretosszeg": "numero",
    "hu.kata-kulonado": "numero",
  },
  campos: [
    { id: "bevetel", tipo: "moneda", etiqueta: "Éves bevétel", min: 0, porDefecto: 12000000 },
    { id: "honapok", tipo: "entero", etiqueta: "Hány hónapig voltál kisadózó az évben?", ayuda: "Minden megkezdett hónap számít.", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bevetel < 0) throw new ErrorEntrada("A bevétel nem lehet negatív.", "bevetel");
    if (e.honapok < 1 || e.honapok > 12) throw new ErrorEntrada("A hónapok száma 1 és 12 között lehet.", "honapok");
    const teteles = redondear(v["hu.kata-teteles-ado"] * e.honapok);
    const keret = e.honapok === 12 ? v["hu.kata-keretosszeg"] : redondear((v["hu.kata-keretosszeg"] / 12) * e.honapok);
    const felett = Math.max(0, e.bevetel - keret);
    const kulonado = redondear((felett * v["hu.kata-kulonado"]) / 100);
    const osszes = redondear(teteles + kulonado);
    const observaciones: string[] = [];
    if (felett > 0) observaciones.push("A keretösszeg feletti bevétel után különadót kell fizetni, és a különadót a következő év február huszonötödikéig kell bevallani és megfizetni.");
    return {
      osszes,
      teteles,
      kulonado,
      keret,
      felett,
      arany: e.bevetel > 0 ? (osszes / e.bevetel) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "osszes", etiqueta: "Fizetendő KATA egy évre", formato: "moneda", destacada: true },
    { clave: "teteles", etiqueta: "Tételes adó", formato: "moneda" },
    { clave: "kulonado", etiqueta: "Különadó a keretösszeg felett", formato: "moneda", ocultarSiCero: true },
    { clave: "keret", etiqueta: "Keretösszeg", formato: "moneda" },
    { clave: "felett", etiqueta: "A keretösszeget meghaladó bevétel", formato: "moneda", ocultarSiCero: true },
    { clave: "arany", etiqueta: "A bevétel ennyi százaléka megy adóra", formato: "porcentaje", decimales: 1 },
  ],
});
