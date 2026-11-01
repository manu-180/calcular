import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.minimalna-plata",
  h1: "Minimalna plata {{anio}} u BiH: {{ba.minimalna-fbih}} i {{ba.minimalna-rs-neto[osnovna]}}",
  title: "Minimalna plata {{anio}}: {{ba.minimalna-fbih}} FBiH, {{ba.minimalna-rs-neto[osnovna]}} RS",
  description: "Najniža neto plata je {{ba.minimalna-fbih}} u FBiH i od {{ba.minimalna-rs-neto[osnovna]}} u RS, po spremi. Pogledajte bruto iznos i trošak poslodavca po entitetu.",
  intro: [
    "Bosna i Hercegovina nema jednu minimalnu platu. U Federaciji BiH najniža plata je {{ba.minimalna-fbih}} neto, za sve poslove (datum primjene: {{ba.minimalna-fbih#desde}}). U Republici Srpskoj iznos zavisi od obrazovanja koje posao traži: od {{ba.minimalna-rs-neto[osnovna]}} do {{ba.minimalna-rs-neto[visoka]}} neto.",
    "Izaberite entitet, a za RS i obrazovanje, pa ćete vidjeti neto, bruto i šta to znači za poslodavca.",
  ],
  comoSeCalcula: [
    "U FBiH odluka Vlade navodi samo neto iznos. Bruto računamo kao plata unazad, uz doprinose {{ba.doprinosi-ukupno@fbih}} i porez {{ba.porez@fbih}} s odbitkom {{ba.odbitak-mjesecno@fbih}}.",
    "U RS odluka sama navodi bruto i neto za svaku grupu poslova, pa te iznose prikazujemo onako kako ih je Vlada objavila.",
    "Trošak poslodavca u FBiH dodaje {{ba.doprinosi-poslodavac-fbih[pio]}}, {{ba.doprinosi-poslodavac-fbih[zdravstvo]}} i {{ba.doprinosi-poslodavac-fbih[nezaposlenost]}} na bruto. U RS trošak je jednak brutu.",
  ],
  ejemplo: [
    "U FBiH neto od {{ba.minimalna-fbih}} znači oko 1.605 KM bruta i oko 1.686 KM ukupnog troška za firmu.",
    "U RS radnik na poslu za koji se traži četverogodišnja škola ne smije imati manje od {{ba.minimalna-rs-neto[cetverogodisnja]}} neto, što je {{ba.minimalna-rs-bruto[cetverogodisnja]}} bruto.",
  ],
  faq: [
    {
      pregunta: "Ko određuje najnižu platu u FBiH?",
      respuesta: "Vlada FBiH, po Uredbi o metodologiji izračuna i usklađivanja najniže plate („Službene novine FBiH” 106/21), nakon konsultacija s Ekonomsko-socijalnim vijećem. Odluka za 2026. donesena je 30. decembra 2025. Važi od 1. januara do 31. decembra 2026.",
    },
    {
      pregunta: "Kako se usklađuje iznos u FBiH?",
      respuesta: "Uredba traži zbir 50 posto rasta potrošačkih cijena i 50 posto rasta BDP-a za period januar do septembar tekuće godine, prema podacima Federalnog zavoda za statistiku. Usklađivanje se radi do kraja tekuće godine.",
    },
    {
      pregunta: "Zašto u RS postoji više iznosa?",
      respuesta: "Odluka o najnižoj plati u RS za 2026. godinu („Službeni glasnik RS” 115/25) razlikuje pet grupa poslova po potrebnom obrazovanju: {{ba.minimalna-rs-neto[osnovna]}}, {{ba.minimalna-rs-neto[trogodisnja]}}, {{ba.minimalna-rs-neto[cetverogodisnja]}}, {{ba.minimalna-rs-neto[visa]}} i {{ba.minimalna-rs-neto[visoka]}} neto.",
    },
  ],
  glosario: [
    { termino: "Najniža plata", definicion: "Plata ispod koje poslodavac ne smije platiti puno radno vrijeme." },
    { termino: "Ekonomsko-socijalno vijeće", definicion: "Tijelo vlade, sindikata i poslodavaca koje razmatra iznos prije odluke." },
    { termino: "Sprema", definicion: "Stepen obrazovanja koji se traži za posao." },
  ],
});
