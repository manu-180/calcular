import { formaLt } from "../../../i18n/plural";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionLt } from "../../dias-entre-fechas/textos/lt";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoLt: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Amžiaus skaičiuoklė",
    title: tituloQueEntre(`Amžiaus skaičiuoklė pagal gimimo datą (${ctx.nombrePais})`, "Amžiaus skaičiuoklė pagal gimimo datą", "Amžiaus skaičiuoklė"),
    description: "Apskaičiuokite tikslų amžių metais, mėnesiais ir dienomis, kiek dienų jau nugyventa ir kiek liko iki kito gimtadienio.",
    intro: [
      "Įveskite gimimo datą ir pamatysite tikslų amžių šiandien, taip pat mėnesiais, savaitėmis ir dienomis.",
      "Pakeiskite antrą datą, jei norite sužinoti, koks amžius buvo tam tikrą dieną arba kiek metų sukaks.",
    ],
    comoSeCalcula: [
      "Skaičiuoklė skaičiuoja pilnus mėnesius nuo gimimo iki pasirinktos datos. 12 mėnesių sudaro vienus metus.",
      "Dienos, likusios po paskutinio pilno mėnesio, yra amžiaus dienos.",
      "Keliamaisiais metais skaičiuojamos 366 dienos.",
    ],
    ejemplo: [
      `Kai gimimo data yra ${fechaLarga(ctx.locale, nac)}, ${fechaLarga(ctx.locale, ref)} amžius yra lygiai ${duracionLt(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Iš viso tai ${formatearNumero(ctx, total)} ${formaLt(total, "diena", "dienos", "dienų")}.`,
    ],
    faq: [
      {
        pregunta: "Kaip apskaičiuoti tikslų amžių?",
        respuesta: "Pirmiausia skaičiuojami pilni metai, tada pilni mėnesiai nuo paskutinio gimtadienio ir galiausiai likusios dienos.",
      },
      {
        pregunta: "Kaip yra, kai gimimo data yra vasario 29 d.?",
        respuesta: "Nekeliamaisiais metais ši skaičiuoklė gimtadieniu laiko vasario 28 d. Kai kurios taisyklės vietoj jos naudoja kovo 1 d.",
      },
      {
        pregunta: "Kiek dienų jau nugyventa?",
        respuesta: "Žiūrėkite eilutę „Dienomis“. Ji skaičiuoja kiekvieną dieną nuo gimimo iki pasirinktos datos, be paskutinės dienos.",
      },
    ],
    glosario: [
      { termino: "Amžius", definicion: "Pilnų metų skaičius nuo gimimo." },
      { termino: "Keliamieji metai", definicion: "Metai, kuriuose yra 366 dienos ir vasario 29 d. Jie būna kas ketverius metus, išskyrus kai kuriuos šimtmečių sandūros metus." },
    ],
  };
};
