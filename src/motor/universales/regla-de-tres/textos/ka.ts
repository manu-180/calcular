import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosKa: TextosUi<UiReglaDeTres> = {
  slug: "samis-tsesi",
  ui: () => ({
    tipo: "პროპორციის სახე",
    directa: "პირდაპირი (A იზრდება, B იზრდება)",
    inversa: "უკუ (A იზრდება, B მცირდება)",
    a: "A",
    aAyuda: "წაიკითხეთ ასე: A ისე შეესაბამება B მნიშვნელობას, როგორც C შეესაბამება X მნიშვნელობას. შეიყვანეთ A, B და C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "ეს მნიშვნელობა არ შეიძლება იყოს ნული, რადგან გამოთვლისას მასზე ვყოფთ.",
    fraseDirecta: (a, b, c, x) => `პირდაპირი პროპორცია. A: ${a}, B: ${b}, C: ${c}, შედეგი (X): ${x}. გამოთვლა: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `უკუ პროპორცია. A: ${a}, B: ${b}, C: ${c}, შედეგი (X): ${x}. გამოთვლა: ${a} × ${b} ÷ ${c}.`,
  }),
};
