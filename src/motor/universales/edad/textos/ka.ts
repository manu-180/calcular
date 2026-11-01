import type { TextosUi } from "../../tipos";
import { duracionKa } from "../../dias-entre-fechas/textos/ka";
import type { UiEdad } from "../definicion";

export const textosKa: TextosUi<UiEdad> = {
  slug: "asakis-kalkulatori",
  ui: () => ({
    nacimiento: "დაბადების თარიღი",
    referencia: "ასაკი ამ დღისთვის",
    referenciaAyuda: "ნაგულისხმევად დღევანდელი დღეა. შეცვალეთ, თუ სხვა დღისთვის გსურთ ასაკის გაგება.",
    edad: "ასაკი",
    anios: "შესრულებული წლები",
    totalMeses: "თვეებში",
    totalSemanas: "კვირებში",
    totalDias: "დღეებში",
    proximo: "შემდეგი დაბადების დღე",
    faltan: "დარჩენილი დღეები",
    cumplira: "რამდენი წლის გახდება",
    duracion: duracionKa,
    errorFutura: "დაბადების თარიღი არ შეიძლება იყოს იმ დღეზე გვიან, რომლისთვისაც ასაკს ითვლით.",
    cumpleHoy: (anios) => `დღეს დაბადების დღეა. ასაკი ზუსტად: ${anios} წელი.`,
    nota29: "ვინც 29 თებერვალს დაიბადა, მისი დაბადების დღე არანაკიან წლებში 28 თებერვალს ითვლება.",
  }),
};
