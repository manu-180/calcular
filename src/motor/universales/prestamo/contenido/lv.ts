import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoLv: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kredīta kalkulators: ikmēneša maksājums un procenti",
    title: tituloQueEntre(`Kredīta kalkulators ${GRAMATICA.lv.en(ctx.nombrePais)}`, "Kredīta kalkulators: maksājums un procenti", "Kredīta kalkulators"),
    description: "Aprēķiniet kredīta ikmēneša maksājumu, kopējos procentus un atmaksas grafiku. Redzēsiet, cik ietaupa papildu maksājumi.",
    intro: [
      "Pirms kredīta līguma parakstīšanas svarīgākie ir divi skaitļi: cik maksāsiet katru mēnesi un cik kredīts izmaksās procentos.",
      "Ievadiet kredīta summu, gada procentu likmi un termiņu. Ja plānojat katru mēnesi maksāt vairāk, pievienojiet papildu maksājumu un redzēsiet, par cik ātrāk pabeigsiet maksāt.",
    ],
    comoSeCalcula: [
      "Aprēķins balstīts uz vienādiem ikmēneša maksājumiem (anuitātes metode), kas ir ierasta patēriņa, auto un mājokļa kredītos.",
      "Mēneša likme = gada likme ÷ 12.",
      "Maksājums = kredīta summa × mēneša likme ÷ (1 − (1 + mēneša likme) pakāpē mīnus maksājumu skaits).",
      "Katru mēnesi procentus rēķina no atlikušā parāda. Pārējā maksājuma daļa samazina kredītu.",
    ],
    ejemplo: [
      `Ja kredīts ir ${m(monto)}, gada procentu likme 12%, bet termiņš 36 mēneši, ikmēneša maksājums ir ${m(cuota36)}. Procentos kopā samaksāsiet ${m(interesesTotales(monto, 12, 36))}.`,
      `Pagarinot termiņu līdz 60 mēnešiem, maksājums samazinās līdz ${m(cuota60)}, bet procenti pieaug līdz ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Kā aprēķina kredīta maksājumu?",
        respuesta:
          "Pēc anuitātes formulas. Visi maksājumi ir vienādi, tikai sākumā lielāko maksājuma daļu veido procenti, bet beigās pamatsumma. Tāpēc parāds sākumā samazinās lēni.",
      },
      {
        pregunta: "Vai ir vērts kredītu atmaksāt ātrāk?",
        respuesta:
          "Parasti jā, ja kreditors par to neprasa lielu maksu. Papildu nauda uzreiz samazina atlikumu, un no šīs summas procentus vairs nerēķina. Jo ātrāk atmaksāsiet, jo vairāk ietaupīsiet.",
      },
      {
        pregunta: "Vai garāks termiņš ir izdevīgāks?",
        respuesta: "Maksājums ir mazāks, bet procentos kopā samaksāsiet krietni vairāk. Pirms lēmuma salīdziniet abus skaitļus.",
      },
      {
        pregunta: "Kāpēc bankas norādītais maksājums atšķiras?",
        respuesta:
          "Bankas un citi kreditori bieži pieskaita apdrošināšanu, kredīta apkalpošanas maksu vai rēķina pēc citas likmes, nekā reklamē. Piedāvājumus salīdziniet pēc GPL un kopējās maksājamās summas, ne tikai pēc procentu likmes.",
      },
    ],
    glosario: [
      { termino: "Atlikums", definicion: "Parāda daļa, kas vēl nav atmaksāta." },
      { termino: "GPL", definicion: "Gada procentu likme. Ietver procentus un komisijas maksas, tāpēc parāda kredīta patieso cenu." },
      { termino: "Pamatsumma", definicion: "Katra maksājuma daļa, kas samazina parādu." },
    ],
  };
};
