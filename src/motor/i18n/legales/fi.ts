import type { DiccionarioLegal } from "./tipos";

export const fi: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Tietoa meistä | CalcularYa",
      description: "CalcularYa tekee laskureita työhön, rahaan ja arkeen jokaiseen maahan, ja luvut tulevat virallisista lähteistä.",
      h1: "Tietoa meistä",
      bajada: "Laskurit jokaiseen maahan, jokaisessa maan omat viralliset luvut.",
      bloques: [
        {
          parrafos: [
            "CalcularYa on sivusto, jonka laskureilla saat vastauksen arjen kysymyksiin: palkka, lainat, verot, päivämäärät ja paljon muuta.",
            "Sivustoa tekee Manuel Navarro, joka tekee myös calcular.ar-sivustoa, jossa on laskureita Argentiinaan.",
          ],
        },
        {
          titulo: "Näin toimimme",
          parrafos: [
            "Kun laskelma riippuu säännöstä (vähimmäispalkasta, maksuprosentista tai ylärajasta), haemme arvon maan virallisesta lähteestä: säädöskokoelmasta, ministeriöltä, keskuspankilta tai veroviranomaiselta.",
            "Tallennamme linkin ja tarkistuspäivän ja näytämme ne jokaisen laskurin yhteydessä.",
            "Jos arvoa ei voi vahvistaa virallisesta lähteestä, sitä käyttävää laskuria ei julkaista.",
            "Kun sääntö muuttuu, laskuri muuttuu mukana, ja muutos kirjataan maan muutoslokiin.",
          ],
        },
        { titulo: "Maksuton", parrafos: ["Laskurit ovat ilmaisia ja toimivat ilman tiliä."] },
      ],
    },
    contacto: {
      title: "Yhteystiedot | CalcularYa",
      description: "Lähetä meille sähköpostia, jos arvo on vanhentunut, tulos ei täsmää tai kaipaat jotain laskuria tai maata.",
      h1: "Yhteystiedot",
      bajada: `Sähköpostiosoitteemme on ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Kerro meille, jos jokin arvo on vanhentunut, tulos on eri kuin odotit tai jokin laskuri tai maa puuttuu.",
            "Jos asia koskee arvoa, kerro, mikä maa on kyseessä ja millä sivulla näit sen.",
            "Viestiisi vastaa oikea ihminen. Vastaus voi viedä muutaman päivän.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Tietosuoja | CalcularYa",
      description: "Mitä tietoja CalcularYa käyttää: laskuriin kirjoittamasi tiedot käsitellään selaimessa, emmekä tallenna niitä.",
      h1: "Tietosuoja",
      bajada: `Päivitetty viimeksi: ${actualizado}.`,
      bloques: [
        {
          titulo: "Mitä kirjoitat laskuriin",
          parrafos: ["Laskelma tehdään selaimessa. Kirjoittamiasi arvoja ei lähetetä millekään palvelimelle, emmekä tallenna niitä."],
        },
        {
          titulo: "Käynnin maa",
          parrafos: [
            "Jotta voimme ehdottaa oikean maan laskureita, katsomme, mistä maasta käynti tulee. Palveluntarjoajamme päättelee sen IP-osoitteesta.",
            "Emme tallenna IP-osoitetta. Tieto pysyy selaimessa käynnin ajan.",
          ],
        },
        {
          titulo: "Mitä selain tallentaa",
          parrafos: [
            "Selaimen istuntotallennus, joka tyhjenee, kun suljet välilehden, muistaa käyntisi maan, sen, suljitko maata ehdottavan ilmoituksen, ja jos tulit jaetun linkin kautta, linkin koodin.",
            "Paikalliseen tallennustilaan, joka säilyy, kunnes tyhjennät sen selaimesta, tallentuvat itse valitsemasi maa, satunnaisluku käyntien laskemista varten ja se, minkä version ulkoasutestistä näet, jotta sivusto näyttää samalta joka kerta. Mikään näistä ei kerro, kuka olet.",
            "Emme käytä mainos- tai seurantaevästeitä.",
          ],
        },
        {
          titulo: "Sivuston ylläpito",
          parrafos: ["Sivusto toimii Vercelin palvelimilla. Kuten kaikki palvelimet, ne kirjaavat jokaisesta käynnistä teknisiä tietoja (IP-osoitteen ja selaimen), jotta sivusto toimii ja pysyy turvallisena."],
        },
        {
          titulo: "Näin laskemme käynnit",
          parrafos: [
            "Mittaamme sivuston käyttöä omalla työkalullamme: mitä sivuja avataan ja kuinka paljon niitä käytetään, miltä sivustolta käynti tulee, laitteen tyyppi ja maa. Selaimeen tallennettu satunnaisluku erottaa uuden käynnin palaavasta. Emme tallenna IP-osoitetta emmekä mitään, mitä kirjoitat laskuriin.",
            "Sivustolta jaetuissa linkeissä on satunnainen koodi, joka on uusi jokaisella jakokerralla. Sen avulla laskemme, montako käyntiä kukin linkki tuo. Koodi ei yksilöi ketään.",
            "Laskuriin kirjoittamasi summat eivät koskaan lähde selaimesta linkin mukana.",
          ],
        },
        {
          titulo: "Muutokset ja kysymykset",
          parrafos: [
            "Jos tähän tulee muutoksia (esimerkiksi mainoksia), kerromme siitä tällä sivulla ennen kuin muutos tulee voimaan.",
            `Henkilötietoja koskevissa kysymyksissä sähköpostiosoitteemme on ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Käyttöehdot | CalcularYa",
      description: "CalcularYan laskurit antavat arvion voimassa olevilla virallisilla luvuilla. Ne ovat työkalu eivätkä korvaa neuvontaa.",
      h1: "Käyttöehdot",
      bajada: `Päivitetty viimeksi: ${actualizado}.`,
      bloques: [
        {
          titulo: "Mihin laskurit on tarkoitettu",
          parrafos: [
            "Tulokset ovat arvioita, jotka perustuvat voimassa oleviin virallisiin lukuihin. Ne ovat suuntaa antavia.",
            "Ne eivät korvaa työnantajan, kirjanpitäjän tai juristin laskelmaa eivätkä asiasta vastaavan viranomaisen kantaa.",
          ],
        },
        {
          titulo: "Mistä luvut tulevat",
          parrafos: [
            "Jokainen laskuri näyttää arvojensa virallisen lähteen ja päivän, jolloin tarkistimme ne.",
            "Pidämme kaiken niin ajan tasalla kuin pystymme, mutta sääntö voi muuttua ennen kuin ehdimme päivittää sen.",
          ],
        },
        {
          titulo: "Sivuston käyttö",
          parrafos: ["Sivusto on ilmainen. Voit käyttää sitä ja jakaa linkkejä. Sisältöä ei saa kopioida laajasti, eikä CalcularYana saa esiintyä."],
        },
        {
          titulo: "Vastuu",
          parrafos: ["Emme vastaa päätöksistä, jotka perustuvat pelkästään tämän sivuston tulokseen. Varmista laskelma oikealta henkilöltä tai viranomaiselta ennen kuin allekirjoitat, maksat tai vaadit jotain."],
        },
        { titulo: "Yhteystiedot", parrafos: [`Sähköpostiosoitteemme on ${mail}.`] },
      ],
    },
  },
});
