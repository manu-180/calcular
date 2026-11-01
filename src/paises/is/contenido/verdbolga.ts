import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.verdbolga",
  h1: "Verðbólga: reiknaðu kaupmátt með vísitölu {{anio}}",
  title: "Verðbólgureiknivél {{anio}}: vísitala neysluverðs {{is.vnv}}",
  description: "Vísitala neysluverðs er {{is.vnv}}. Sjáðu hvernig upphæð breytist með verðbólgu á milli mánaða, samkvæmt tölum Hagstofu Íslands.",
  intro: [
    "Vísitala neysluverðs er {{is.vnv}} frá {{is.vnv#desde}}, samkvæmt Hagstofu Íslands. Veldu upphæð og tvo mánuði og sjáðu hvað sami kaupmáttur kostar í dag.",
    "Í október 2026 var tólf mánaða verðbólga 5,9% samkvæmt Hagstofunni. Reiknivélin notar sömu tölur, frá janúar 2016.",
  ],
  comoSeCalcula: [
    "Upphæðin er margfölduð með vísitölu lokamánaðar og deilt með vísitölu upphafsmánaðar.",
    "Sé lokamánuður ekki kominn í töflu Hagstofunnar er reiknað til síðasta birta mánaðar.",
    "Verðbólgan á tímabilinu er hlutfallsleg hækkun vísitölunnar.",
  ],
  ejemplo: [
    "100.000 kr. í október 2025 (vísitala 661,4) jafngilda 105.897 kr. í október 2026 (vísitala 700,4). Hækkunin er 5.897 kr., eða um 5,9%, sama tala og Hagstofan birtir.",
  ],
  faq: [
    { pregunta: "Er húsnæði inni í vísitölunni?", respuesta: "Já. Hagstofan birtir líka vísitölu án húsnæðis, en reiknivélin notar almennu vísitöluna. Velur þú framtíðarmánuð er reiknað til síðasta birta mánaðar." },
    { pregunta: "Hvernig mælist tólf mánaða verðbólga?", respuesta: "Hún er breyting vísitölu neysluverðs á tólf mánuðum. Veldu sama mánuð í fyrra sem upphafsmánuð, og reiknivélin sýnir hana." },
    { pregunta: "Hvaðan koma tölurnar?", respuesta: "Úr töflu Hagstofu Íslands um vísitölu neysluverðs og breytingar, með grunninn 1988 = 100." },
    { pregunta: "Af hverju get ég ekki valið eldri mánuð?", respuesta: "Reiknivélin geymir mánaðartölur frá janúar 2016. Hagstofan birtir lengri röð í töflum sínum." },
  ],
  glosario: [
    { termino: "Vísitala neysluverðs", definicion: "Mæling Hagstofunnar á verðlagi neysluvara og þjónustu." },
    { termino: "Kaupmáttur", definicion: "Hvað hægt er að kaupa fyrir tiltekna upphæð." },
  ],
});
