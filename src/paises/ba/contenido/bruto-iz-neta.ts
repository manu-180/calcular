import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.bruto-iz-neta",
  h1: "Bruto iz neta {{anio}}: koliko bruta treba za željeni neto",
  title: "Bruto iz neta {{anio}}: obračun za FBiH i RS",
  description: "Neto plata je dogovorena, a treba vam bruto? Računa s doprinosima {{ba.doprinosi-ukupno@rs}} i porezom {{ba.porez@fbih}} u FBiH ili {{ba.porez@rs}} u RS.",
  intro: [
    "Kad se s poslodavcem dogovorite o neto iznosu, ugovor ipak mora navesti bruto. Isti neto traži drugačiji bruto u svakom entitetu: doprinosi su {{ba.doprinosi-ukupno@fbih}} i u FBiH i u RS, ali porez nije isti.",
    "Upišite željeni neto, izaberite entitet, a kalkulator traži najmanji bruto koji daje taj iznos.",
  ],
  comoSeCalcula: [
    "Obračun ide obrnutim putem od obične plate. Kalkulator probava bruto iznose i zaustavlja se na prvom koji daje traženi neto, na feninge tačno.",
    "U FBiH uz faktor 1 vrijedi: neto = bruto x 0,69, minus {{ba.porez@fbih}} na bruto x 0,69 umanjen za {{ba.odbitak-mjesecno@fbih}}.",
    "U RS: neto = bruto x 0,69, minus {{ba.porez@rs}} na bruto umanjen za {{ba.odbitak-mjesecno@rs}}. Ako posao ima pravo na neoporezivih {{ba.neoporezivo-rs}}, taj dio se dodaje na kraju.",
  ],
  ejemplo: [
    "Za neto od 1.272 KM u FBiH s faktorom 1 potrebno je tačno 2.000 KM bruta. Poslodavac uz to plati još 100 KM doprinosa, pa mu je trošak 2.100 KM.",
    "U RS za neto od 1.100 KM, na poslu za koji se traži četverogodišnja škola, bruto je oko 1.672 KM. Vlada RS je tu istu vezu navela u odluci o najnižoj plati za 2026.",
  ],
  faq: [
    {
      pregunta: "Može li ugovor navesti samo neto platu?",
      respuesta: "U RS član 121 Zakona o radu, u tekstu iz 119/21, kaže da se plata sastoji od osnovne plate i uvećanja, poreza i doprinosa, a neto je ono što ostane. Za pisanje ugovora zato treba i bruto iznos.",
    },
    {
      pregunta: "Zašto se bruto razlikuje za isti neto u FBiH i RS?",
      respuesta: "Zakon FBiH (član 11) oduzima doprinose prije poreza, uz stopu {{ba.porez@fbih}} i odbitak {{ba.odbitak-mjesecno@fbih}}. Zakon RS (119/21) oporezuje bruto, uz stopu {{ba.porez@rs}} i odbitak {{ba.odbitak-mjesecno@rs}}.",
    },
    {
      pregunta: "Šta ako je neto niži od najniže plate?",
      respuesta: "Kalkulator tada samo računa, ali poslodavac ne smije ići ispod minimuma: {{ba.minimalna-fbih}} neto u FBiH i {{ba.minimalna-rs-neto[osnovna]}} neto u RS za 2026. godinu, prema odlukama vlada entiteta.",
    },
  ],
  glosario: [
    { termino: "Bruto", definicion: "Iznos prije doprinosa i poreza." },
    { termino: "Neto", definicion: "Iznos koji radnik primi." },
    { termino: "Fening", definicion: "Stoti dio konvertibilne marke." },
  ],
});
