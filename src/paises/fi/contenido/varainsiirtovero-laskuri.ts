import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fi.varainsiirtovero-laskuri",
  h1: "Varainsiirtoverolaskuri: asunnon ja kiinteistön varainsiirtovero",
  title: "Varainsiirtovero 2026: laske asuntokaupan vero",
  description:
    "Laske varainsiirtovero asunto-osakkeesta ({{fi.varainsiirtovero[asunto-osake]}} velattomasta hinnasta), kiinteistöstä ({{fi.varainsiirtovero[kiinteisto]}}) tai muista arvopapereista.",
  intro: [
    "Kun ostat asunnon, kiinteistön tai osakkeita, maksat varainsiirtoveroa. Laskuri kertoo veron määrän ostamasi kohteen mukaan.",
    "Kerros- tai rivitaloasunto on asunto-osake. Omakotitalo tontteineen tai mökki omalla tontilla on kiinteistö, ja sen vero on suurempi.",
  ],
  comoSeCalcula: [
    "Asunto-osakkeesta vero on {{fi.varainsiirtovero[asunto-osake]}} velattomasta hinnasta. Velaton hinta on kauppahinta ja asunnon osuus taloyhtiön lainasta yhteensä.",
    "Kiinteistöstä ja rakennuksesta vero on {{fi.varainsiirtovero[kiinteisto]}} kauppahinnasta.",
    "Muista arvopapereista, kuten listaamattoman osakeyhtiön osakkeista, vero on {{fi.varainsiirtovero[arvopaperi]}}.",
  ],
  ejemplo: [
    "Ostat kerrostaloasunnon 60 000 eurolla, ja asuntoon kohdistuu 20 000 euroa taloyhtiön lainaa. Velaton hinta on 80 000 euroa.",
    "Varainsiirtovero on {{fi.varainsiirtovero[asunto-osake]}} 80 000 eurosta eli 1 200 euroa.",
  ],
  faq: [
    {
      pregunta: "Paljonko on varainsiirtovero asunnosta?",
      respuesta: "Asunto-osakkeesta {{fi.varainsiirtovero[asunto-osake]}} velattomasta hinnasta. Omakotitalosta, joka ostetaan tontin kanssa, vero on {{fi.varainsiirtovero[kiinteisto]}}.",
    },
    {
      pregunta: "Lasketaanko yhtiölaina mukaan?",
      respuesta: "Lasketaan. Vero lasketaan velattomasta hinnasta, eikä ole väliä, maksatko yhtiölainaosuuden heti vai myöhemmin.",
    },
    {
      pregunta: "Kuka maksaa varainsiirtoveron?",
      respuesta: "Ostaja. Ostaja tekee varainsiirtoveroilmoituksen ja maksaa veron itse OmaVerossa.",
    },
  ],
  glosario: [
    { termino: "Velaton hinta", definicion: "Asunnon kauppahinta ja sen osuus taloyhtiön lainasta yhteensä." },
    { termino: "Asunto-osake", definicion: "Asunto-osakeyhtiön osakkeet, jotka oikeuttavat hallitsemaan asuntoa." },
  ],
});
