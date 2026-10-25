import type { ClaveFamilia } from "../ofertas-intl";
import type { DiccionarioVenta, TextosFamilia } from "./tipos";

// Registro «sinä» implícito, como los bancos y servicios digitales finlandeses: imperativo singular
// («Laske», «Tarkista»), posesivos con sufijo («palkkasi») y pasivas donde suenan más naturales. Sin
// «Te» ni imperativo plural. El finés declina: los valores variables ({pais}, {titulo}) van en
// nominativo, como sujeto o después de dos puntos, nunca con una desinencia pegada.

const ARKISTOON = { titulo: "Talteen omiin papereihin", texto: "Mukana päivämäärä, jolloin käytetyt arvot olivat voimassa." };
const MUILLA_SUMMILLA = { titulo: "Muilla summilla", explica: "Sama laskelma hieman pienemmillä ja suuremmilla summilla." };
const MUILLA_KOROILLA = { titulo: "Muilla koroilla", explica: "Samat luvut hieman matalammalla ja korkeammalla korolla." };

const familias: Record<ClaveFamilia, TextosFamilia> = {
  liquidacion: {
    nombre: "Lopputiliraportti",
    tituloCorto: "lopputiliraportti",
    paraQuien: "Lopputilin tarkistamiseen ennen kuin allekirjoitat, tai sen vaatimiseen omilla luvuillasi ja oman maasi lain mukaan",
    descripcion: [
      "Pdf-raportti lopputilistäsi erä erältä: mitä saat kustakin osasta, miten se lasketaan ja mitä virallisia arvoja käytetään, kaikki lähteineen.",
      "Mukana tarkistuslista asioista, jotka kannattaa katsoa ennen allekirjoitusta, ja maksuvaatimus valmiiksi täytettynä summallasi.",
    ],
    gancho: "Lopputili paperilla, valmiina tarkistettavaksi ennen kuin allekirjoitat",
    incluye: [
      { titulo: "Jokainen erä laskelmineen", texto: "Voit verrata rivi riviltä siihen, mitä työnantaja tarjoaa." },
      { titulo: "Viralliset lähteet näkyvissä", texto: "Jokainen arvo julkaisijan ja tarkistuspäivän kanssa." },
      { titulo: "Valmis maksuvaatimus", texto: "Täytetty summallasi, jotta voit vaatia maksua kirjallisesti." },
    ],
    pasos: {
      titulo: "Ennen kuin allekirjoitat",
      items: [
        "Vertaa raportin jokaista erää asiakirjaan, jonka allekirjoitat. Jos jokin puuttuu, kysy syy ennen allekirjoitusta.",
        "Tarkista, että työnantajan käyttämä palkka ja päivämäärät ovat samat kuin tässä. Eri aloituspäivä muuttaa lähes jokaisen summan.",
        "Pyydä kopio kaikesta, minkä allekirjoitat, ja säilytä viimeisten kuukausien palkkalaskelmat.",
        "Jos ero on suuri tai sinut on irtisanottu, vie raportti ammattiliittoosi tai työoikeuteen perehtyneelle juristille. Se säästää heiltä ensimmäisen tunnin laskutyön.",
      ],
    },
    nota: {
      titulo: "Maksuvaatimus",
      uso: "Täytä se, allekirjoita ja anna se vastaanottajalle. Pidä itselläsi kopio, johon vastaanottaja merkitsee päivämäärän ja kuittauksensa.",
      pedido: "Vaadin työsuhteeni päättymiseen liittyvän lopputilin maksamista. Liitteenä olevan laskelman mukaan sen määrä on",
      cierre: "Liitteenä on erittely jokaisesta erästä, laskettuna ilmoitettuna päivänä voimassa olleilla virallisilla arvoilla. Pyydän ilmoittamaan maksupäivän.",
    },
  },
  "pagos-laborales": {
    nombre: "Raportti lisistä ja korvauksista",
    tituloCorto: "raportti lisistä ja korvauksista",
    paraQuien: "Sen tarkistamiseen, onko bonus, lomaraha, ylityökorvaus tai voittopalkkio maksettu oikein, ja tarvittaessa erotuksen vaatimiseen",
    descripcion: [
      "Pdf-raportti laskelmastasi vaihe vaiheelta ja omilla luvuillasi: mikä peruste on käytössä, miten lasketaan ja mitä virallisia arvoja käytetään, kaikki lähteineen.",
      "Se toimii jokaiselle listan maksulle. Raportti näyttää, miten tarkistat asian palkkalaskelmasta, ja mukana on kirje erotuksen vaatimiseen kirjallisesti.",
    ],
    gancho: "Laskelma paperilla, jotta voit verrata sitä palkkalaskelmaasi",
    incluye: [
      { titulo: "Laskelma vaihe vaiheelta", texto: "Tiedoillasi ja jokaisella virallisella arvolla." },
      { titulo: "Mitä katsoa palkkalaskelmasta", texto: "Näet minuutissa, saitko oikean summan." },
      { titulo: "Kirje erotuksen vaatimiseen", texto: "Täytetty summallasi ja valmis annettavaksi." },
    ],
    pasos: {
      titulo: "Maksun tarkistamiseen",
      items: [
        "Etsi erä palkkalaskelmastasi ja vertaa sitä raportin summaan.",
        "Jos summa ei täsmää, tarkista ensin, että tietosi ovat samat kuin työnantajalla.",
        "Jos se ei vieläkään täsmää, vaadi erotus kirjallisesti alla olevalla kirjeellä ja säilytä kopio.",
      ],
    },
    nota: {
      titulo: "Maksuvaatimus",
      uso: "Täytä se, allekirjoita ja anna se eteenpäin. Pidä kopio itselläsi.",
      pedido: "Pyydän maksamaan liitteenä olevassa raportissa eritellyn palkanosan, jonka määrä voimassa olevien virallisten arvojen mukaan on",
      cierre: "Jos maksettu summa oli toinen, pyydän kirjallisen selvityksen siitä, miten se on laskettu.",
    },
    escenarios: { titulo: "Jos tuntisi muuttuvat", explica: "Sama laskelma eri tuntimäärällä, jotta voit tarkistaa joka kuukausi laskematta alusta." },
  },
  impuesto: {
    nombre: "Tuloveroraportti",
    tituloCorto: "veroraportti",
    paraQuien: "Sen ymmärtämiseen, paljonko veroa pidätetään, palkkalaskelman tarkistamiseen ja sen näkemiseen, mitä tapahtuu, jos tulosi muuttuvat",
    descripcion: [
      "Pdf-raportti verostasi vaihe vaiheelta, voimassa olevalla virallisella taulukolla ja jokaisen arvon lähteellä.",
      "Mukana taulukko verosta muilla tulotasoilla, joten tiedät etukäteen, paljonko sinulle jää palkankorotuksen tai työpaikan vaihdon jälkeen.",
    ],
    gancho: "Vero selitettynä paperilla, ja mitä tapahtuu, jos tulosi muuttuvat",
    incluye: [
      { titulo: "Laskelma virallisella taulukolla", texto: "Vaihe vaiheelta, jokaisen arvon lähteen kanssa." },
      { titulo: "Vero muilla tulotasoilla", texto: "Voit neuvotella palkasta tietäen, paljonko käteen jää." },
      { titulo: "Mitä tarkistaa palkkalaskelmasta", texto: "Voit keskustella työnantajan tai kirjanpitäjän kanssa luvut käsissäsi." },
    ],
    pasos: {
      titulo: "Ennakonpidätyksen tarkistamiseen",
      items: [
        "Etsi ennakonpidätys palkkalaskelmastasi ja vertaa sitä raporttiin.",
        "Jos se ei täsmää, kysy työnantajalta, mitkä tulot ja vähennykset laskelmassa on mukana.",
        "Säilytä raportti veroilmoitusta varten, jos maassasi sellainen tehdään.",
      ],
    },
    escenarios: { titulo: "Jos tulosi muuttuvat", explica: "Sama laskelma hieman pienemmillä ja suuremmilla tuloilla, samoilla virallisilla arvoilla." },
  },
  contratacion: {
    nombre: "Palkkauksen kustannusarvio",
    tituloCorto: "palkkauksen kustannusarvio",
    paraQuien: "Sen tietämiseen, mitä palkkaaminen todella maksaa kaikkine maksuineen, ennen kuin palkasta sovitaan",
    descripcion: [
      "Pdf-kustannusarvio palkkauksen koko hinnasta: palkka, työntekijän ja työnantajan maksut sekä varaukset, jokainen arvo virallisen lähteen kanssa.",
      "Mukana taulukko kustannuksista muilla palkoilla, joten voit tehdä tarjouksen tietäen, mitä kukin taso maksaa, ja näyttää sen osakkaalle tai kirjanpitäjälle.",
    ],
    gancho: "Tee kustannuksista arvio ennen kuin päätät palkkaamisesta",
    incluye: [
      { titulo: "Jokainen maksu erikseen", texto: "Kunkin säännön ja virallisen lähteen kanssa." },
      { titulo: "Kustannus muilla palkoilla", texto: "Voit neuvotella tietäen, mitä kukin taso maksaa." },
      { titulo: "Valmis näytettäväksi", texto: "Osakkaalle, kirjanpitäjälle tai omiin papereihisi." },
    ],
    pasos: {
      titulo: "Ennen kuin palkkaat",
      items: [
        "Kysy kirjanpitäjältäsi, onko alallasi työehtosopimus tai yleistä korkeampi vähimmäispalkka.",
        "Laita arvion varaukset sivuun joka kuukausi: ne ovat maksuja, jotka erääntyvät yhtä aikaa vuoden tai sopimuksen lopussa.",
        "Ilmoita työntekijä ensimmäisestä päivästä alkaen: arvion hinnassa ovat jo mukana lakisääteiset maksut.",
      ],
    },
    escenarios: { titulo: "Kustannus muilla palkoilla", explica: "Sama laskelma pienemmillä ja suuremmilla palkoilla, samoilla virallisilla arvoilla." },
  },
  "ajuste-inflacion": {
    nombre: "Indeksitarkistuskirje",
    tituloCorto: "indeksitarkistuskirje",
    paraQuien: "Vuokran, maksuerän, palkkion tai palkan indeksitarkistuksen vaatimiseen tai ilmoittamiseen virallisen indeksin mukaan",
    descripcion: [
      "Kirje valmiina annettavaksi, täytettynä tarkistetulla summallasi, sekä perustelut: virallinen indeksi kunakin päivänä, sen julkaiseva viranomainen ja linkki lähteeseen.",
      "Kun perustelut ovat näkyvissä, toinen osapuoli voi tarkistaa summan minuutissa, ja keskustelu koskee indeksiä eikä laskutoimitusta.",
    ],
    gancho: "Tee indeksitarkistuksesta lähetysvalmis kirje, perusteena virallinen indeksi",
    incluye: [
      { titulo: "Täytetty kirje", texto: "Tarkistetun summan kanssa, tulostettavaksi tai lähetettäväksi." },
      { titulo: "Virallinen indeksi perusteena", texto: "Viranomaisen, päivämäärän ja lähdelinkin kanssa." },
      { titulo: "Laskelma näkyvissä", texto: "Toinen osapuoli voi tarkistaa sen itse." },
    ],
    nota: {
      titulo: "Ilmoitus indeksitarkistuksesta",
      uso: "Täytä se sopimuksen tiedoilla ja anna se yhdessä laskelman kanssa.",
      pedido: "Ilmoitan, että sovittu summa tarkistetaan virallisen hintaindeksin muutoksen mukaisesti liitteenä olevan laskelman osoittamalla tavalla. Tarkistettu summa on",
      cierre: "Laskelmassa käytetään erittelyssä mainitun viranomaisen virallista indeksiä, jonka voi tarkistaa ilmoitetusta lähteestä.",
    },
  },
  regimen: {
    nombre: "Raportti pienyrittäjän verotuksesta",
    tituloCorto: "pienyrittäjän veroraportti",
    paraQuien: "Sen tietämiseen, paljonko maksat pienyrittäjän verojärjestelmässä ja mitä tapahtuu, jos liikevaihtosi kasvaa tai pienenee",
    descripcion: [
      "Pdf-raportti maksustasi tai verostasi pienyrittäjän järjestelmässä, laskettuna vaihe vaiheelta virallisella taulukolla ja jokaisen arvon lähteellä.",
      "Mukana taulukko siitä, mitä maksaisit toisella liikevaihdolla, joten näet ajoissa, kun jokin raja lähestyy.",
    ],
    gancho: "Verotuksesi paperilla, ja mitä tapahtuu, jos liikevaihto muuttuu",
    incluye: [
      { titulo: "Laskelma virallisella taulukolla", texto: "Vaihe vaiheelta, jokaisen arvon lähteen kanssa." },
      { titulo: "Maksusi toisella liikevaihdolla", texto: "Näet ajoissa, kun jokin raja lähestyy." },
      ARKISTOON,
    ],
    escenarios: { titulo: "Jos liikevaihto muuttuu", explica: "Sama laskelma pienemmällä ja suuremmalla liikevaihdolla, samoilla virallisilla arvoilla." },
  },
  deposito: {
    nombre: "Määräaikaistalletusten vertailu",
    tituloCorto: "talletusvertailu",
    paraQuien: "Määräaikaistalletuksesi vertailuun eri talletusajoilla ennen kuin valitset, minne ja kuinka pitkäksi aikaa talletat",
    descripcion: ["Pdf-raportti talletuksesi tuotosta ja taulukko samasta talletuksesta muilla talletusajoilla, samalla laskutavalla kuin laskurissa."],
    gancho: "Vertaa talletustasi usealla talletusajalla yhdessä raportissa",
    incluye: [
      { titulo: "Talletuksesi usealla talletusajalla", texto: "Yhdessä taulukossa, joten voit valita heti." },
      { titulo: "Laskelma vaihe vaiheelta", texto: "Jokaisen arvon lähteen kanssa." },
      ARKISTOON,
    ],
    escenarios: { titulo: "Talletuksesi muilla talletusajoilla", explica: "Sama laskelma muilla talletusajoilla." },
  },
  alimentos: {
    nombre: "Elatusapuraportti",
    tituloCorto: "elatusapuraportti",
    paraQuien: "Lastenvalvojan tapaamiseen tai elatusapuneuvotteluun perustellun summan kanssa",
    descripcion: ["Pdf-raportti, jossa on suuntaa antava elatusapulaskelma vaihe vaiheelta virallisine arvoineen ja lähteineen, sekä taulukko summasta muilla tulotasoilla."],
    gancho: "Mene tapaamiseen laskelma paperilla",
    incluye: [
      { titulo: "Perusteltu laskelma", texto: "Vaihe vaiheelta, jokaisen arvon lähteen kanssa." },
      { titulo: "Summa muilla tulotasoilla", texto: "Voit neuvotella vaihtoehdot edessäsi." },
      { titulo: "Juristillesi tai lastenvalvojalle", texto: "Se säästää heiltä ensimmäisen tunnin laskutyön." },
    ],
    escenarios: { titulo: "Muilla tulotasoilla", explica: "Sama laskelma pienemmillä ja suuremmilla tuloilla." },
  },
  jubilacion: {
    nombre: "Eläke-ennuste",
    tituloCorto: "eläke-ennuste",
    paraQuien: "Eläkkeesi suunnitteluun paperilla olevan ennusteen avulla ja sen näkemiseen, mitä muuttuu, jos säästät enemmän",
    descripcion: ["Pdf-raportti, jossa on arvio eläkkeestäsi vaihe vaiheelta virallisine arvoineen ja lähteineen, sekä taulukko ennusteesta muilla palkoilla."],
    gancho: "Eläke-ennusteesi paperilla",
    incluye: [
      { titulo: "Arvio vaihe vaiheelta", texto: "Jokaisen arvon lähteen kanssa." },
      { titulo: "Muilla palkoilla", texto: "Näet, mitä muuttuu, jos säästät enemmän." },
      ARKISTOON,
    ],
    escenarios: { titulo: "Muilla palkoilla", explica: "Sama laskelma pienemmillä ja suuremmilla palkoilla." },
  },
  "plan-prestamo": {
    nombre: "Lainasuunnitelma",
    tituloCorto: "lainasuunnitelma",
    paraQuien: "Sen tietämiseen, mitä laina todella maksaa, ja tarjousten vertailuun ennen kuin allekirjoitat",
    descripcion: [
      "Pdf-raportti koko lainasta: kuukausierä, takaisin maksettava kokonaissumma ja kuinka paljon siitä on korkoa.",
      "Kun lasket erän, jokainen maksu näkyy erikseen. Lisäksi samat luvut muilla koroilla, joten voit verrata pankkien tarjouksia oikeilla summilla.",
    ],
    gancho: "Vertaa lainatarjouksia omilla luvuillasi ennen kuin allekirjoitat",
    incluye: [
      { titulo: "Laina muilla koroilla", texto: "Näet, mitä prosenttiyksikkö ylös tai alas tarkoittaa." },
      { titulo: "Koko hinta näkyvissä", texto: "Paljonko maksat korkoa, ilman pientä präntättyä." },
      { titulo: "Tarkistuslista ennen allekirjoitusta", texto: "Kysymykset, jotka kannattaa esittää lainanantajalle." },
    ],
    pasos: {
      titulo: "Ennen kuin allekirjoitat lainasopimuksen",
      items: [
        "Kysy todellinen vuosikorko kaikkine kuluineen, ei pelkkää nimelliskorkoa. Sitä kannattaa verrata.",
        "Kysy avausmaksusta, pakollisista vakuutuksista ja ennenaikaisen takaisinmaksun kuluista.",
        "Vertaa vähintään kolmea tarjousta raportin muiden korkojen taulukon avulla.",
        "Valitse erä, jonka pystyt maksamaan huonompanakin kuukautena. Nyrkkisääntönä enintään kolmasosa tuloista.",
      ],
    },
    escenarios: MUILLA_KOROILLA,
  },
  "plan-hipoteca": {
    nombre: "Asuntolainasuunnitelma",
    tituloCorto: "asuntolainasuunnitelma",
    paraQuien: "Asuntolainapäätökseen kaikki luvut edessäsi: erä, korko ja mitä tapahtuu, jos korko muuttuu",
    descripcion: [
      "Pdf-raportti koko asuntolainasta: kuukausierä, maksettava kokonaissumma ja kuinka paljon menee korkoihin vuosien aikana.",
      "Mukana laskelman kaikki taulukot kokonaisuudessaan (ilmaisella sivulla näkyvät vain ensimmäiset rivit) ja samat luvut muilla koroilla. Jos vertasit vuokraamista ja ostamista, saat vertailun paperilla, joten päätös on helpompi tehdä yhdessä.",
    ],
    gancho: "Mene pankkiin koko lyhennyssuunnitelma ja muut korot mukanasi",
    incluye: [
      { titulo: "Koko taulukko", texto: "Kaikki rivit, ei vain ensimmäisiä." },
      { titulo: "Asuntolaina muilla koroilla", texto: "Näet, mitä prosenttiyksikkö tekee erällesi." },
      { titulo: "Kysymyksiä pankille", texto: "Asiat, jotka haluat selvittää ennen allekirjoitusta." },
    ],
    pasos: {
      titulo: "Ennen kuin allekirjoitat asuntolainan",
      items: [
        "Pyydä tarjous kirjallisena: korko, laina-aika ja kokonaiskulut vakuutuksineen ja maksuineen.",
        "Kysy, onko korko kiinteä vai vaihtuva ja mitä erälle tapahtuu, jos viitekorko nousee.",
        "Tarkista, mitä ennenaikainen takaisinmaksu maksaa ja voitko lyhentää ylimääräistä ilman kuluja.",
        "Lisää erään asumisen kulut (kiinteistövero, vakuutus, yhtiövastike tai ylläpito) ennen kuin päätät, mihin sinulla on varaa.",
      ],
    },
    escenarios: MUILLA_KOROILLA,
  },
  "plan-inversion": {
    nombre: "Säästö- ja sijoitussuunnitelma",
    tituloCorto: "säästösuunnitelma",
    paraQuien: "Sen näkemiseen, miten säästösi kasvavat ajan myötä ja mitä muuttuu, jos säästät enemmän tai tuotto on toinen",
    descripcion: [
      "Pdf-raportti säästöennusteestasi: paljonko säästät, paljonko saat tuottoa ja paljonko sinulla on lopussa.",
      "Mukana laskelman kaikki taulukot kokonaisuudessaan ja samat luvut muilla koroilla, joten voit valita säästökohteen oikeilla summilla.",
    ],
    gancho: "Säästösuunnitelmasi paperilla, vuosi vuodelta",
    incluye: [
      { titulo: "Koko ennuste", texto: "Taulukon kaikki rivit, ei vain ensimmäisiä." },
      { titulo: "Muilla koroilla", texto: "Voit verrata vaihtoehtoja ennen kuin valitset." },
      { titulo: "Suunnitelma, joka pitää", texto: "Askeleet, joilla aikomuksesta tulee säästöä." },
    ],
    pasos: {
      titulo: "Jotta suunnitelma toteutuu",
      items: [
        "Ajoita siirto palkkapäivälle: mitä et näe, sitä et käytä.",
        "Vertaa tuottoa inflaatioon: jos tuotto on pienempi, rahan arvo laskee, vaikka summa kasvaa.",
        "Avaa raportti uudelleen kerran vuodessa ja päivitä lukusi.",
      ],
    },
    escenarios: MUILLA_KOROILLA,
  },
  "plan-deudas": {
    nombre: "Luottokortin maksusuunnitelma",
    tituloCorto: "kortin maksusuunnitelma",
    paraQuien: "Sen tietämiseen, milloin kortti on maksettu, paljonko se maksaa korkoina ja miten pääset siitä nopeammin eroon",
    descripcion: [
      "Pdf-raportti velasta kuukausi kuukaudelta: mitä maksat, mitä menee korkoihin ja kuinka nopeasti saldo pienenee.",
      "Mukana koko taulukko viimeiseen maksuun asti ja samat luvut muilla summilla, joten näet, paljonko säästät maksamalla vähän enemmän joka kuukausi.",
    ],
    gancho: "Näe kuukausi kuukaudelta, milloin kortti on maksettu",
    incluye: [
      { titulo: "Kuukausi kuukaudelta viimeiseen maksuun", texto: "Jokaisen kuukauden korkojen kanssa." },
      { titulo: "Muilla maksuilla", texto: "Näet, kuinka paljon aiemmin pääset velasta eroon, jos maksat vähän enemmän." },
      { titulo: "Tie ulos", texto: "Askeleet, joilla et ajaudu velkaan uudelleen." },
    ],
    pasos: {
      titulo: "Velasta eroon",
      items: [
        "Lopeta kortin käyttö, kun maksat sitä pois: jokainen uusi osto pidentää taulukkoa.",
        "Maksa aina enemmän kuin vähimmäiserä. Pienikin lisä auttaa, ja muiden maksujen taulukko näyttää, kuinka paljon.",
        "Jos sinulla on useita velkoja, maksa ensin se, jossa on korkein korko, ja muista muiden vähimmäiserät.",
        "Kysy pankilta velan siirtämisestä tai lainojen yhdistämisestä matalampaan korkoon ja vertaa tarjousta raporttiin.",
      ],
    },
    escenarios: { titulo: "Muilla kuukausierillä", explica: "Sama velka hieman pienemmällä ja suuremmalla kuukausimaksulla." },
  },
  "plan-presupuesto": {
    nombre: "Budjettisuunnitelma",
    tituloCorto: "budjettisuunnitelma",
    paraQuien: "Kuukauden järjestämiseen selkeällä suunnitelmalla: paljonko välttämättömiin menoihin, mieluisiin asioihin ja säästöön",
    descripcion: [
      "Pdf-raportti, joka tekee laskelmasta suunnitelman: paljonko varaat kuhunkin asiaan, omassa valuutassasi ja omilla luvuillasi.",
      "Mukana sama suunnitelma muilla summilla, joten tiedät etukäteen, mitä muuttuu kuukautena, jolloin rahaa on enemmän tai vähemmän, ja askeleet sen noudattamiseen.",
    ],
    gancho: "Tee laskelmasta suunnitelma kuukaudelle",
    incluye: [
      { titulo: "Suunnitelmasi omilla luvuillasi", texto: "Mihin mikin menee, valmiina noudatettavaksi." },
      { titulo: "Muilla summilla", texto: "Voit säätää suunnitelmaa, kun kuukausi muuttuu." },
      { titulo: "Askeleet sen noudattamiseen", texto: "Asiat, joiden ansiosta budjetti kestää kuukautta pidempään." },
    ],
    pasos: {
      titulo: "Jotta budjetti toimii",
      items: [
        "Siirrä säästöt palkkapäivänä ennen kuin alat käyttää rahaa. Loput voit käyttää.",
        "Kirjaa menosi ylös kuukauden ajan, vaikka puhelimeen, ja vertaa suunnitelmaan.",
        "Kerää ensin puskuri, jotta odottamaton meno ei päädy luottokortille.",
      ],
    },
    escenarios: MUILLA_SUMMILLA,
  },
  "plan-negocio": {
    nombre: "Raportti yrityksen luvuista",
    tituloCorto: "yritysraportti",
    paraQuien: "Hinnoista, katteista tai investoinnista päättämiseen selkein luvuin, valmiina näytettäväksi osakkaalle",
    descripcion: [
      "Pdf-raportti, jossa laskelma on selitetty vaihe vaiheelta: mitä tietoja se käyttää, miten se lasketaan ja mikä tulos siitä tulee.",
      "Mukana taulukko samasta laskelmasta muilla summilla, joten näet, miten tulos muuttuu, jos jokin kulu nousee tai lasket hintaa.",
    ],
    gancho: "Tee luvuista raportti, jonka pohjalta voit päättää tai jonka voit näyttää",
    incluye: [
      { titulo: "Laskelma selitettynä", texto: "Voit ymmärtää sen ja perustella sen osakkaalle tai pankille." },
      { titulo: "Muilla summilla", texto: "Näet etukäteen, mitä hinnan tai kulun muutos tekee." },
      { titulo: "Kysymyksiä ennen päätöstä", texto: "Mitä tarkistaa ennen kuin muutat hintaa." },
    ],
    pasos: {
      titulo: "Ennen kuin päätät",
      items: [
        "Varmista, että kuluissa on kaikki mukana: rahdit, maksut, verot ja oma aikasi.",
        "Vertaa hintaasi kahteen tai kolmeen kilpailijaan ennen kuin muutat sitä.",
        "Katso taulukon huonointa tapausta: jos yritys kestää sen, päätös on turvallisempi.",
      ],
    },
    escenarios: MUILLA_SUMMILLA,
  },
  "kit-freelance": {
    nombre: "Freelancerin hinnoittelupaketti",
    tituloCorto: "freelancerin hinnoittelupaketti",
    paraQuien: "Työsi arvoisen hinnan pyytämiseen ja hinnan esittämiseen varmana",
    descripcion: [
      "Pdf-raportti tuntihinnastasi selitettynä: tavoittelemasi tulot, tunnit, jotka voit todella laskuttaa, ja kulut, jotka hinta kattaa.",
      "Mukana hinnat muille tulotavoitteille ja hintakirje, jonka voit lähettää asiakkaille tuntihintasi kanssa.",
    ],
    gancho: "Esitä hintasi luvuilla, älä anteeksipyynnöllä",
    incluye: [
      { titulo: "Hintasi selitettynä", texto: "Kun joku kysyy, miksi hinta on tämä." },
      { titulo: "Muille tulotavoitteille", texto: "Hinta, jonka kukin tavoite vaatii." },
      { titulo: "Valmis hintakirje", texto: "Summasi kanssa, asiakkaille lähetettäväksi." },
    ],
    pasos: {
      titulo: "Oikean hinnan pyytämiseen",
      items: [
        "Laske vain tunnit, jotka voit laskuttaa: myös palaverit, tarjoukset ja maksumuistutukset ovat työtä.",
        "Kun voit, hinnoittele koko projekti kerralla: asiakas ostaa tuloksen, ei tunteja.",
        "Tarkista hintasi kerran vuodessa tai aiemmin, jos kulusi nousevat.",
      ],
    },
    nota: {
      titulo: "Hintakirje",
      uso: "Täytä se asiakkaan tiedoilla ja lähetä se tarjouksesi kanssa.",
      pedido: "Kuten sovimme, lähetän hintani palveluista, joista keskustelimme. Tuntihintani on",
      cierre: "Hinta kattaa työajan ja yritykseni kulut. Teen mielelläni myös kiinteän hinnan koko projektille.",
    },
    escenarios: { titulo: "Muille tulotavoitteille", explica: "Sama laskelma pienemmillä ja suuremmilla tulotavoitteilla." },
  },
  "plan-sueldo": {
    nombre: "Palkkaraportti",
    tituloCorto: "palkkaraportti",
    paraQuien: "Palkasta, tarjouksesta tai palkankorotuksesta neuvotteluun tietäen, mitä se on tunnissa, kuukaudessa ja vuodessa",
    descripcion: [
      "Pdf-raportti palkkalaskelmastasi selitettynä, omilla luvuillasi ja jokaisella käytetyllä arvolla.",
      "Mukana taulukko muista summista, joten voit verrata tarjouksia tai pyytää palkankorotusta selkein luvuin.",
    ],
    gancho: "Neuvottele palkasta luvut paperilla",
    incluye: [
      { titulo: "Koko laskelma", texto: "Jokaisen kirjoittamasi arvon kanssa." },
      { titulo: "Muilla summilla", texto: "Voit verrata kahta tarjousta minuutissa." },
      { titulo: "Vinkkejä neuvotteluun", texto: "Mitä sanoa ja mitä pyytää summan lisäksi." },
    ],
    pasos: {
      titulo: "Neuvotteluun",
      items: [
        "Puhu vuosipalkasta tai tuntipalkasta, kun vertaat tarjouksia: kuukausisummat piilottavat eroja.",
        "Pyydä myös muuta kuin rahaa: vapaapäiviä, etätyötä, koulutusta tai bonusta.",
        "Esitä tietty summa ja sen perustelu: kokemuksesi, markkinatilanne tai se, mikä tehtävässäsi on muuttunut.",
      ],
    },
    escenarios: MUILLA_SUMMILLA,
  },
  "kit-calculos": {
    nombre: "Laskelma selitettynä vaihe vaiheelta",
    tituloCorto: "selitetty laskelma",
    paraQuien: "Ratkaistun ja selitetyn laskun tallentamiseen, tulostamiseen, opiskeluun tai jakamiseen",
    descripcion: [
      "Pdf-raportti laskusta, sen ratkaisusta ja tuloksesta omilla luvuillasi.",
      "Käytä sitä opiskeluun, laskelman tallentamiseen tai näyttämiseen jollekulle ilman, että sinun tarvitsee selittää sitä.",
    ],
    gancho: "Ota lasku mukaasi vaihe vaiheelta selitettynä",
    incluye: [
      { titulo: "Lasku ratkaistuna", texto: "Tietojesi ja tuloksen kanssa." },
      { titulo: "Miten se lasketaan", texto: "Näet, mistä kukin luku tulee." },
      { titulo: "Valmis tulostettavaksi", texto: "Tai tallennettavaksi pdf-tiedostona ja jaettavaksi." },
    ],
    pasos: {
      titulo: "Tarkistukseen",
      items: ["Laske takaperin: aloita tuloksesta ja palaa lähtöarvoon.", "Pyöristä vasta lopussa: pyöristäminen joka vaiheessa muuttaa tulosta."],
    },
    escenarios: MUILLA_SUMMILLA,
  },
  "kit-gastos-grupo": {
    nombre: "Yhteisten kulujen erittely",
    tituloCorto: "kuluerittely",
    paraQuien: "Jotta jokainen tietää, mitä on velkaa, ilman kiistoja ja ilman laskuja lautasliinan kulmassa",
    descripcion: [
      "Pdf-erittely ryhmän laskusta: kokonaissumma, mitä kukin maksaa ja tarvittaessa kuka on velkaa kenellekin.",
      "Lähetä se viestinä tai tulosta se, niin kenenkään ei tarvitse laskea alusta.",
    ],
    gancho: "Jaa lasku ryhmän kesken selkeästi ja ilman kiistoja",
    incluye: [
      { titulo: "Mitä kukin maksaa", texto: "Kokonaissumma ja yksityiskohdat näkyvissä." },
      { titulo: "Valmis jaettavaksi", texto: "Pdf-tiedostona, ryhmälle lähetettäväksi." },
      { titulo: "Muilla kokonaissummilla", texto: "Jos laskuun tulee vielä jotain lisää." },
    ],
    pasos: {
      titulo: "Tasaamiseen",
      items: ["Lähetä erittely ryhmälle ennen kuin kukaan maksaa: se estää väärinkäsitykset.", "Sovi muiden kanssa, miten ja milloin velat tasataan."],
    },
    escenarios: { titulo: "Muilla kokonaissummilla", explica: "Sama jako, jos kokonaissumma on hieman pienempi tai suurempi." },
  },
  "kit-estudio": {
    nombre: "Keskiarvoraportti",
    tituloCorto: "keskiarvoraportti",
    paraQuien: "Keskiarvosi selkeyttämiseen paperilla, jokaisen arvosanan painon kanssa",
    descripcion: [
      "Pdf-raportti keskiarvostasi: jokainen arvosana, sen paino ja miten tulos lasketaan.",
      "Käytä sitä arvosanan tarkistamiseen, seuraavan kokeen suunnitteluun tai laskelman näyttämiseen sitä tarvitseville.",
    ],
    gancho: "Keskiarvosi selitettynä paperilla",
    incluye: [
      { titulo: "Jokainen arvosana painoineen", texto: "Näet, mikä vaikuttaa eniten." },
      { titulo: "Laskelma vaihe vaiheelta", texto: "Tarkistettavaksi tai näytettäväksi." },
      { titulo: "Ideoita seuraavaan kokeeseen", texto: "Miten käytät keskiarvoa suunnitteluun." },
    ],
    pasos: {
      titulo: "Ennen seuraavaa koetta",
      items: ["Katso, mikä arvosana painaa eniten, ja käytä enemmän aikaa siihen aineeseen tai kokeeseen.", "Jos jokin arvosana näyttää lasketun väärin, vie raportti opettajallesi."],
    },
  },
  "kit-fechas": {
    nombre: "Raportti päivämääristä ja määräajoista",
    tituloCorto: "päivämääräraportti",
    paraQuien: "Päivämäärän tai määräajan laskemiseen paperille, valmiina liitettäväksi tai jotta se ei unohdu",
    descripcion: [
      "Pdf-raportti päivämäärälaskelmasta: kirjoittamasi päivämäärät, tulos ja miten päivät lasketaan.",
      "Käytä sitä asioiden hoitamiseen, sopimukseen, eräpäivään tai vain muistiin.",
    ],
    gancho: "Päivämäärä paperilla, valmiina liitettäväksi",
    incluye: [
      { titulo: "Laskelma selitettynä", texto: "Päivämäärät ja miten päivät lasketaan." },
      { titulo: "Valmis liitettäväksi", texto: "Hakemuksen tai sopimuksen liitteeksi." },
      { titulo: "Omiin papereihisi", texto: "Mukana päivämäärä, jolloin se tehtiin." },
    ],
    pasos: {
      titulo: "Ennen kuin käytät päivämäärää asiakirjassa",
      items: [
        "Tarkista, lasketaanko määräaika kalenteripäivinä vai arkipäivinä: se muuttaa tulosta.",
        "Katso, osuuko viimeinen päivä pyhäpäivälle tai viikonloppuun.",
        "Merkitse päivämäärä kalenteriin ja aseta muistutus muutamaa päivää aiemmin.",
      ],
    },
  },
  "plan-salud": {
    nombre: "Raportti painoindeksistä ja kaloreista",
    tituloCorto: "painoindeksi- ja kaloriraportti",
    paraQuien: "Painon ja energiantarpeen lukujen tallentamiseen paperille ja viemiseen vastaanotolle",
    descripcion: [
      "Pdf-raportti tuloksesta selitettynä: mitä se mittaa, miten se lasketaan ja mihin vaihteluväliin se osuu, omilla tiedoillasi.",
      "Se on yleistä tietoa, josta voit keskustella terveydenhuollon ammattilaisen kanssa. Se ei ole diagnoosi eikä korvaa vastaanottokäyntiä.",
    ],
    gancho: "Vie lukusi vastaanotolle selitettyinä ja paperilla",
    incluye: [
      { titulo: "Tulos selitettynä", texto: "Mitä se mittaa ja miten se lasketaan." },
      { titulo: "Kysymyksiä vastaanotolle", texto: "Saat käynnistä enemmän irti." },
      { titulo: "Kehityksen seurantaan", texto: "Säilytä jokainen raportti ja vertaa ajan mittaan." },
    ],
    pasos: {
      titulo: "Keskusteluun terveydenhuollon ammattilaisen kanssa",
      items: [
        "Ota raportti mukaan ja kysy, mikä vaihteluväli on sinulle terveellinen iän ja terveyshistorian perusteella.",
        "Kerro, miten syöt, paljonko liikut ja miten nukut: luvut eivät kerro kaikkea.",
        "Älä tee suuria muutoksia ruokavalioon tai liikuntaan keskustelematta ensin jonkun kanssa.",
      ],
    },
    aviso: "Yleistä tietoa. Ei korvaa terveydenhuollon ammattilaisen neuvoja.",
  },
  "plan-embarazo": {
    nombre: "Raportti hedelmällisyydestä ja raskaudesta",
    tituloCorto: "hedelmällisyys- ja raskausraportti",
    paraQuien: "Laskettujen päivämäärien tallentamiseen paperille ja viemiseen seuraavalle neuvolakäynnille",
    descripcion: [
      "Pdf-raportti lasketuista päivämääristä ja siitä, miten kukin lasketaan, kirjoittamillasi tiedoilla.",
      "Päivämäärät ovat arvioita: jokainen keho ja jokainen raskaus on erilainen. Ne auttavat suunnittelemaan ja keskustelemaan kätilön tai lääkärin kanssa, eivätkä ne korvaa tutkimusta.",
    ],
    gancho: "Päivämääräsi paperilla seuraavalle neuvolakäynnille",
    incluye: [
      { titulo: "Lasketut päivämääräsi", texto: "Ja miten kukin lasketaan." },
      { titulo: "Kysymyksiä käynnille", texto: "Saat käynnistä kaiken irti." },
      { titulo: "Omiin papereihisi", texto: "Käytettyjen tietojen kanssa." },
    ],
    pasos: {
      titulo: "Ennen seuraavaa käyntiä",
      items: [
        "Ota raportti ja viimeisten kuukautisten alkamispäivä mukaan käynnille.",
        "Kysy, mitkä tutkimukset ovat ajankohtaisia raskausviikollasi ja milloin seuraava käynti on.",
        "Jos jokin oire huolestuttaa, hakeudu hoitoon odottamatta raportin päivämääriä.",
      ],
    },
    aviso: "Yleistä tietoa. Päivämäärät ovat arvioita eivätkä korvaa kätilön tai lääkärin seurantaa.",
  },
  "plan-entrenamiento": {
    nombre: "Juoksuvauhtiraportti",
    tituloCorto: "vauhtiraportti",
    paraQuien: "Juoksemaan lähtemiseen tietäen tavoitevauhtisi ja sen, miten jaat voimasi",
    descripcion: [
      "Pdf-raportti vauhdista, ajasta ja nopeudesta selitettynä, kirjoittamillasi tiedoilla.",
      "Mukana laskelman kaikki taulukot kokonaisuudessaan ja vinkkejä vauhdin käyttämiseen harjoittelussa.",
    ],
    gancho: "Vauhtisi paperilla kisapäivää varten",
    incluye: [
      { titulo: "Vauhtisi selitettynä", texto: "Ajan ja nopeuden kanssa." },
      { titulo: "Tulostettavaksi ja mukaan", texto: "Taskuun tai jääkaapin oveen." },
      { titulo: "Harjoitteluvinkkejä", texto: "Miten käytät vauhtia loukkaantumatta." },
    ],
    pasos: {
      titulo: "Vauhdin käyttämiseen",
      items: [
        "Juokse ensimmäiset minuutit hieman tavoitevauhtia hitaammin: se tuntuu lopussa.",
        "Tee suurin osa viikon harjoittelusta rauhallisella vauhdilla, jossa pystyt vielä puhumaan.",
        "Jos johonkin sattuu, lopeta ja käy näyttämässä: vauhti voi odottaa.",
      ],
    },
    aviso: "Yleistä tietoa. Ei korvaa terveydenhuollon ammattilaisen tai valmentajan neuvoja.",
  },
  "kit-viaje": {
    nombre: "Matkan polttoainebudjetti",
    tituloCorto: "polttoainebudjetti",
    paraQuien: "Sen tietämiseen, paljonko polttoaineeseen menee, ja kulujen jakamiseen kyydissä olevien kesken",
    descripcion: [
      "Pdf-raportti matkan polttoainekuluista omilla luvuillasi: matka, kulutus ja hinta.",
      "Mukana taulukko muista polttoaineen hinnoista siltä varalta, että ne muuttuvat ennen lähtöä, ja tarkistuslista muun matkan budjetointiin.",
    ],
    gancho: "Matkan hinta paperilla ennen lähtöä",
    incluye: [
      { titulo: "Matkan hinta", texto: "Matkan, kulutuksen ja hinnan kanssa." },
      { titulo: "Muilla hinnoilla", texto: "Jos polttoaine kallistuu ennen lähtöä." },
      { titulo: "Tarkistuslista muuhun matkaan", texto: "Tiemaksut, pysäköinti ja ruoka." },
    ],
    pasos: {
      titulo: "Matkan budjetointiin",
      items: [
        "Lisää polttoaineen hintaan tiemaksut, pysäköinti ja ruoka.",
        "Jos matkustajia on useampi, jaa kokonaissumma ja kerro siitä kaikille ennen lähtöä.",
        "Tarkista rengaspaineet: liian matalilla paineilla auto kuluttaa enemmän.",
      ],
    },
    escenarios: { titulo: "Muilla hinnoilla", explica: "Sama matka hieman halvemmalla ja kalliimmalla polttoaineella." },
  },
  "kit-hogar": {
    nombre: "Sähkön hintaraportti",
    tituloCorto: "sähköraportti",
    paraQuien: "Sen tietämiseen, mitä kukin laite sinulle maksaa ja missä voit säästää sähkölaskussa",
    descripcion: [
      "Pdf-raportti siitä, mitä laite maksaa, kulutuksesi ja sähkön hinnan perusteella.",
      "Mukana taulukko muista sähkön hinnoista ja lista ideoista laskun pienentämiseen.",
    ],
    gancho: "Selvitä, mitä laite sinulle maksaa ja miten saat kulut alas",
    incluye: [
      { titulo: "Hinta kulutuksellasi", texto: "Selitettynä vaihe vaiheelta." },
      { titulo: "Muilla hinnoilla", texto: "Jos sähkön hinta nousee." },
      { titulo: "Säästövinkkejä", texto: "Ne, jotka näkyvät laskussa eniten." },
    ],
    pasos: {
      titulo: "Sähkölaskun pienentämiseen",
      items: [
        "Irrota valmiustilassa olevat laitteet pistorasiasta: myös sammutetut laitteet kuluttavat sähköä.",
        "Käytä eniten sähköä vieviä laitteita silloin, kun sähkö on halvinta, jos sopimuksesi hinta vaihtelee tunneittain.",
        "Vertaa raporttia sähkölaskuusi nähdäksesi, kuinka suuren osan laite vie kokonaissummasta.",
      ],
    },
    escenarios: { titulo: "Muilla hinnoilla", explica: "Sama kulutus hieman halvemmalla ja kalliimmalla sähköllä." },
  },
  "kit-obra": {
    nombre: "Rakennustyön materiaalilista",
    tituloCorto: "materiaalilista",
    paraQuien: "Materiaalien ostamiseen oikea määrä, ilman että mitään puuttuu tai jää yli",
    descripcion: [
      "Pdf-raportti materiaalilaskelmasta: mitat, määrät ja miten ne lasketaan, valmiina vietäväksi rautakauppaan.",
      "Mukana tarkistuslista oikein ostamiseen: hukkavara, mitä kysyä ja mitä tarkistaa ennen kuin aloitat.",
    ],
    gancho: "Mene rautakauppaan materiaalilista kädessä",
    incluye: [
      { titulo: "Mitat ja määrät", texto: "Kaikki laskemasi yhdellä sivulla." },
      { titulo: "Näytettäväksi kaupassa", texto: "Saat hinnan juuri siitä, mitä tarvitset." },
      { titulo: "Tarkistuslista oikein ostamiseen", texto: "Hukkavara ja tarkistettavat asiat." },
    ],
    pasos: {
      titulo: "Ennen kuin ostat",
      items: [
        "Lisää 5 tai 10 % hukkavaraa leikkauksia varten, tai enemmän, jos muoto on epäsäännöllinen.",
        "Osta kaikki samasta erästä: väri ja sävy voivat vaihdella erien välillä.",
        "Kysy valitsemasi tuotteen menekki: se vaihtelee merkeittäin.",
        "Säilytä kuitti ja avaamattomat ylijäämät: monet kaupat ottavat ne takaisin.",
      ],
    },
  },
  "kit-facturacion": {
    nombre: "Arvonlisäveroraportti",
    tituloCorto: "alv-raportti",
    paraQuien: "Laskuttamiseen tai hinnan tarkistamiseen niin, että arvonlisävero on selvästi erikseen, valmiina kirjanpitoon tai kirjanpitäjälle",
    descripcion: [
      "Pdf-raportti laskelmasta: veroton hinta, arvonlisävero ja yhteensä, voimassa olevalla verokannalla ja sen lähteellä.",
      "Mukana taulukko muista summista, kätevä verottoman ja verollisen hinnaston tekemiseen.",
    ],
    gancho: "Hinta verollisena ja verottomana paperilla",
    incluye: [
      { titulo: "Arvonlisävero erikseen", texto: "Veroton summa, alv ja yhteensä voimassa olevalla verokannalla." },
      { titulo: "Muilla summilla", texto: "Voit tehdä koko hinnaston kerralla." },
      { titulo: "Kirjanpitäjälle", texto: "Verokannan lähteen ja päivämäärän kanssa." },
    ],
    pasos: {
      titulo: "Ennen kuin laskutat",
      items: [
        "Tarkista, koskeeko tuotettasi tai palveluasi yleinen verokanta, alennettu verokanta vai onko se verotonta.",
        "Varmista, että laskussa näkyvät veroton summa ja arvonlisävero erikseen, kun sitä vaaditaan.",
        "Säilytä raportti laskun kanssa kirjanpidossa.",
      ],
    },
    escenarios: MUILLA_SUMMILLA,
  },
  "informe-calculo": {
    nombre: "Laskelmaraportti",
    tituloCorto: "laskelmaraportti",
    paraQuien: "Tämän laskelman saamiseen kirjallisena, omilla luvuillasi, sen oletuksilla ja jokaisen virallisen arvon lähteellä",
    descripcion: [
      "Pdf-raportti juuri tekemästäsi laskelmasta vaihe vaiheelta tiedoillasi: tulos, sen taustalla olevat oletukset ja jokainen virallinen arvo lähteineen ja tarkistuspäivineen.",
      "Säilytä se tai näytä se kirjanpitäjällesi, työnantajallesi tai muille, joiden pitää tarkistaa se, ilman että jokaista lukua tarvitsee selittää uudelleen.",
    ],
    gancho: "Ota tämä laskelma mukaan kirjallisena, lähteineen",
    incluye: [
      { titulo: "Tulos tietoinesi", texto: "Juuri niin kuin laskit sen, valmiina tulostettavaksi." },
      { titulo: "Miten se lasketaan", texto: "Vaiheet ja oletukset, jotta jokaisen luvun voi jäljittää." },
      { titulo: "Viralliset lähteet", texto: "Jokainen arvo viranomaisen, linkin ja tarkistuspäivän kanssa." },
    ],
    pasos: {
      titulo: "Ennen kuin käytät sitä",
      items: [
        "Tarkista, että ylhäällä olevat tiedot ovat sinun: tulos riippuu niistä.",
        "Jos jokin virallinen arvo on muuttunut, laske uudelleen: raportti käyttää ostopäivänä voimassa olleita arvoja.",
      ],
    },
  },
};

export const fi: DiccionarioVenta = {
  familias,
  general: { si: "Kyllä", no: "Ei" },
  tarjeta: {
    cejaInforme: "Pdf-raportti",
    cejaPlanilla: "Excel-taulukko",
    pagoUnico: "kertamaksu",
    comprarInforme: "Hanki raporttini",
    comprarPlanilla: "Hanki taulukkoni",
    confianza: "Maksa PayPalilla tai kortilla. Jos et voi käyttää sitä, saat rahasi takaisin 7 päivän kuluessa.",
    verDetalle: "Katso, mitä se sisältää",
    tambien: "Tästä voi olla myös hyötyä:",
    tablasOficiales: "Viralliset taulukot",
    bajadaInforme: "Raportti käy sen läpi vaihe vaiheelta omilla luvuillasi ja jokaisen arvon lähteellä, valmiina tulostettavaksi tai tallennettavaksi pdf-tiedostona.",
    bajadaPlanilla: "Taulukossa se on omilla luvuillasi ja kaavat näkyvissä, joten voit muuttaa mitä haluat.",
    bajadaPlanillaHoja: "Taulukon välilehdellä ”{hoja}” se on omilla luvuillasi ja kaavat näkyvissä, joten voit muuttaa mitä haluat.",
    equivale: "Noin {monto} päivän kurssilla.",
    cobroDolares: "Maksu veloitetaan Yhdysvaltain dollareina.",
  },
  aviso: {
    pronto: "Tulossa pian",
    titulo: "Kerro minulle, kun se on valmis",
    ayuda: "Kirjoitamme vain kerran, kun sen voi ostaa.",
    boton: "Ilmoita minulle",
    listo: "Selvä. Lähetämme sinulle sähköpostia heti, kun sen voi ostaa.",
    error: "Sähköpostiosoitettasi ei voitu tallentaa. Tarkista, että se on kirjoitettu oikein, ja yritä uudelleen.",
    correo: "Sähköpostiosoitteesi",
  },
  planilla: {
    gancho: "Vie laskelma Exceliin tietosi valmiiksi täytettyinä",
    incluye: [
      { titulo: "Tietosi valmiiksi täytettyinä", texto: "Muuta keltaista solua, niin kaikki lasketaan uudelleen." },
      { titulo: "Palkka, lomaraha ja lopputili", texto: "Yhdessä tiedostossa, jota voit käyttää koko vuoden." },
      { titulo: "Päivittyy jokaisen virallisen muutoksen myötä", texto: "Samasta linkistä saat uuden version maksamatta uudelleen." },
    ],
  },
  informe: {
    tusDatos: "Tietosi",
    resultado: "Tulos",
    corregir: "Korjaa tietojani",
    actualizar: "Päivitä raportti",
    imprimir: "Tulosta tai tallenna pdf-tiedostona",
    imprimirAyuda: "Valitse tulostusikkunasta ”Tallenna PDF-muodossa”, niin saat tiedoston.",
    sinResultado: "Täytä tietosi kohdassa ”Korjaa tietojani”, niin raportti luodaan.",
    lugar: "Paikka ja päivämäärä",
    destinatario: "Vastaanottaja",
    firma: "Allekirjoitus",
    nombre: "Nimi",
    documento: "Henkilötunnus",
    etiquetaEnMinuscula: true,
    comoSeCalcula: "Näin se lasketaan",
    fuentes: "Viralliset lähteet",
    verificado: "tarkistettu",
    emitido: "Laadittu",
    valores: "Viralliset arvot, tilanne",
    numero: "Raportti",
    elegir: "Valitse raportin laskelma:",
    legal:
      "Raportti on arvio, joka perustuu mainittuihin sääntöihin ja virallisiin arvoihin ilmoitettuna päivänä. Se ei korvaa ammattilaisen neuvoja eikä toimivaltaisen viranomaisen päätöstä. Jos jokin tiedoistasi on toinen, tulos muuttuu: korjaa tiedot ja tulosta uudelleen.",
    legalSinFuentes: "Raportti on arvio, joka perustuu kirjoittamiisi tietoihin ilmoitettuna päivänä. Se ei korvaa ammattilaisen neuvoja. Jos jokin tieto muuttuu, tulos muuttuu: korjaa se ja tulosta uudelleen.",
    errorTitulo: "Raporttia ei voitu avata",
    error: "Emme pystyneet vahvistamaan tämän linkin maksua. Jos raha on veloitettu tililtäsi, kirjoita meille, niin selvitämme asian. Jos osto ei mennyt läpi, voit tehdä sen uudelleen.",
    verificar: "Emme pystyneet tarkistamaan maksua juuri nyt. Yritä uudelleen muutaman minuutin kuluttua: sinun ei tarvitse maksaa uudelleen.",
    cupo: "Liian monta yritystä peräkkäin. Odota muutama minuutti ja avaa linkki uudelleen.",
  },
  catalogo: {
    tituloProducto: "{nombre} ({pais})",
    disparadorInforme: "Aina kun jokin laskelmassa käytetty virallinen arvo muuttuu",
    planillaDescripcion: "Valmis Excel-taulukko: täytä tietosi keltaisiin soluihin, niin kaikki lasketaan. Kaavat noudattavat näitä säädöksiä: {normas}.",
    planillaIncluye: "Mukana: {incluye}. Jokainen välilehti näyttää vaiheet, ja virallisten taulukoiden välilehdellä on jokainen arvo lähteineen ja tarkistuspäivineen.",
  },
  planillas: {
    migaPlanillas: "Taulukot ja raportit",
    catalogoTitulo: "Taulukot ja raportit: {pais}",
    catalogoBajada: "Excel-taulukot ja pdf-raportit omilla luvuillasi ja maan virallisilla tiedoilla. Maksat kerran, ilman tilausta.",
    seccionPlanillas: "Excel-taulukot",
    seccionInformes: "Pdf-raportit",
    catalogoVacio: "{pais}: taulukot ovat tulossa pian. Siihen asti laskurit ovat ilmaisia.",
    verCalculadoras: "Katso laskurit",
    comprar: "Osta hintaan {precio}",
    pronto: "Tulossa pian",
    incluye: "Saat tämän",
    incluyeInforme: [
      "Raportti omilla luvuillasi sivulla, jonka voit tulostaa tai tallentaa pdf-tiedostona.",
      "Linkki, joka ei vanhene koskaan: voit korjata tietojasi ja tulostaa uudelleen milloin haluat.",
      "Jos et voi käyttää sitä, saat rahasi takaisin 7 päivän kuluessa.",
    ],
    incluyePlanilla: [
      "Tiedosto .xlsx-muodossa, joka aukeaa Excelissä ja Google Sheetsissä.",
      "Päivitykset: {disparador}, päivitämme sen, ja samasta linkistä saat uuden version.",
      "Jos et voi käyttää sitä, saat rahasi takaisin 7 päivän kuluessa.",
    ],
    pagoUnico: "Kertamaksu PayPalilla. Voit maksaa tililläsi tai kortilla.",
    comprarPlanilla: "Osta {titulo}",
    comprarBajadaInforme: "Lähetämme raportin linkin tähän osoitteeseen heti, kun maksu on vahvistettu.",
    comprarBajadaPlanilla: "Lähetämme taulukon tähän osoitteeseen heti, kun maksu on vahvistettu.",
    etiquetaEmail: "Sähköpostiosoitteesi",
    seguirPago: "Siirry maksamaan",
    privacidad: "Käytämme sähköpostiosoitettasi vain ostoksesi ja sen päivitysten lähettämiseen.",
    datosTitulo: "Laskelmasi luvuilla",
    datosUsar: "Käytä näitä lukuja ostoksessani. Ne tallennetaan vain ostoksen valmistelua varten.",
    errores: {
      email: "Tarkista sähköpostiosoitteesi: siitä näyttää puuttuvan jotain.",
      error: "Maksun aloittaminen ei onnistunut. Mitään ei veloitettu. Yritä uudelleen muutaman minuutin kuluttua.",
      cancelado: "Maksu keskeytettiin. Mitään ei veloitettu.",
      fallido: "PayPal ei hyväksynyt maksua. Voit kokeilla toista korttia.",
      pronto: "Sitä ei voi vielä ostaa.",
    },
    graciasTitulo: "Kiitos ostoksestasi",
    graciasListoInforme: "Maksu on vahvistettu. {titulo} on nyt valmis avattavaksi. Lähetimme linkin myös sähköpostiisi, eikä se vanhene koskaan.",
    graciasListoPlanilla: "Maksu on vahvistettu. {titulo} on nyt valmis ladattavaksi. Lähetimme sen myös sähköpostiisi linkillä, joka ei vanhene koskaan.",
    graciasPendiente: "Odotamme vahvistusta PayPalilta. Heti kun se tulee, lähetämme ostoksesi sähköpostiisi.",
    muestraIntro: "Tämä on välilehti ”{hoja}” esimerkkitiedoilla, joilla se aukeaa. Laskelma on tämän päivän, voimassa olevilla virallisilla arvoilla.",
    muestraLeyenda: ["sinä täytät", "taulukko laskee"],
    comprobar: "Tarkista ennen kuin maksat: ilmainen laskuri antaa samat luvut. Kokeile samaa esimerkkiä ja vertaa.",
    comprobarEnlace: "Ilmaiseen laskuriin",
    faqTitulo: "Usein kysyttyä",
    faq: {
      sheets: {
        pregunta: "Toimiiko se Google Sheetsissä ja Excelissä?",
        respuesta: "Kyllä. Se on .xlsx-tiedosto: se aukeaa Excelissä ja Google Sheetsissä (lataa se Driveen ja avaa siellä). Laskelmat käyttävät tavallisia kaavoja, ei makroja.",
      },
      recibo: {
        pregunta: "Miten saan sen?",
        respuesta: "Heti kun maksu on vahvistettu, lähetämme sen sähköpostiisi latauslinkillä, joka ei vanhene koskaan. Voit myös ladata sen sivulta, joka aukeaa maksun jälkeen.",
      },
      dolares: {
        pregunta: "Maksanko dollareina?",
        respuesta: "Kyllä. Hinta on Yhdysvaltain dollareina (USD), ja maksat PayPalilla, tililläsi tai kortilla.",
        conReferencia: "Näytämme yllä likimääräisen summan omassa valuutassasi päivän kurssilla, vain suuntaa antavana: lopullinen summa riippuu pankkisi tai korttisi käyttämästä kurssista.",
        sinReferencia: "Jos korttisi on eri valuutassa, pankki tekee muunnoksen.",
      },
      devolucion: { pregunta: "Voinko saada rahani takaisin?", respuesta: "Kyllä. Jos et voi käyttää taulukkoa, vastaa toimitusviestiin 7 päivän kuluessa, niin palautamme rahat." },
      actualiza: { pregunta: "Päivittyykö se, kun viralliset arvot muuttuvat?", respuesta: "Kyllä. {disparador}, päivitämme sen, ja samasta linkistä saat uuden version." },
    },
    descargar: "Lataa taulukko (.xlsx)",
    abrirInforme: "Avaa raporttini",
    fuentes: "Käytetyt viralliset lähteet",
    calculadoras: "Toimii näiden laskurien kanssa",
    muestra: "Tältä se näyttää",
  },
  correo: {
    asuntoInforme: "Ostoksesi CalcularYa-palvelusta: {titulo}",
    asuntoPlanilla: "{titulo}: lataus ja päivitykset",
    mismosNumeros: "Luvut ovat samat kuin {enlace}, virallisilla tiedoilla.",
    enlaceCalculadora: "CalcularYan ilmaisessa laskurissa",
    comprobante: "Tämä on kuitti ostoksestasi ({marca}).",
    informe: {
      encabezado: "Raporttisi on valmis avattavaksi",
      intro: "Kiitos ostoksestasi: {titulo}. Avaa se tästä:",
      boton: "Avaa raporttini",
      abre: "Se aukeaa selaimessa. Sieltä voit tulostaa sen tai tallentaa sen pdf-tiedostona.",
      guarda: "Säilytä tämä viesti",
      vence: "Linkki on sinun eikä vanhene koskaan. Raportti käyttää ostopäivänäsi voimassa olleita virallisia arvoja, ja voit korjata tietojasi ja tulostaa uudelleen milloin haluat.",
      devolucion: "Jos et voi käyttää raporttia, vastaa tähän viestiin 7 päivän kuluessa, niin palautamme rahat.",
      ayuda: "Ongelmia? Vastaa tähän viestiin tai kirjoita meille osoitteeseen {contacto}.",
    },
    planilla: {
      encabezado: "Taulukkosi on valmis",
      intro: "Kiitos ostoksestasi: {titulo}. Lataa se tästä:",
      boton: "Lataa taulukko (.xlsx)",
      abre: "Aukeaa Excelissä ja Google Sheetsissä.",
      guarda: "Säilytä tämä viesti",
      vence: "Linkki on sinun eikä vanhene koskaan. {disparador}, päivitämme taulukon, ja samasta linkistä saat ajantasaisen version. Sinun ei tarvitse maksaa uudelleen.",
      devolucion: "Jos et voi käyttää taulukkoa, vastaa tähän viestiin 7 päivän kuluessa, niin palautamme rahat.",
      ayuda: "Ongelmia? Vastaa tähän viestiin tai kirjoita meille osoitteeseen {contacto}.",
    },
  },
};
