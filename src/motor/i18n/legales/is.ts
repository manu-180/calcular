import type { DiccionarioLegal } from "./tipos";

// Islandés (ADR 0002, D34): «þú» e imperativo de singular.
export const is: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Um okkur | CalcularYa",
      description: "CalcularYa býr til reiknivélar fyrir vinnu, peninga og daglegt líf í hverju landi, með tölum úr opinberum heimildum.",
      h1: "Um okkur",
      bajada: "Reiknivélar fyrir hvert land, hver með sín opinberu gögn.",
      bloques: [
        {
          parrafos: [
            "CalcularYa er vefur með reiknivélum fyrir daglega útreikninga: laun, lán, skatta, dagsetningar og margt fleira.",
            "Manuel Navarro heldur vefnum úti og sér einnig um calcular.ar, reiknivélavef fyrir Argentínu.",
          ],
        },
        {
          titulo: "Svona vinnum við",
          parrafos: [
            "Þegar útreikningur ræðst af reglum (lágmarkslaunum, iðgjaldahlutföllum, einhverjum mörkum) sækjum við gildið í opinbera heimild viðkomandi lands: stjórnartíðindi, ráðuneyti, seðlabanka eða skattyfirvöld.",
            "Við geymum hlekkinn og dagsetningu staðfestingar og sýnum hvort tveggja með hverri reiknivél.",
            "Ef ekki er hægt að staðfesta gildi í opinberri heimild er reiknivélin sem notar það ekki birt.",
            "Þegar regla breytist breytist reiknivélin líka og við skráum breytinguna undir nýjungum viðkomandi lands.",
          ],
        },
        { titulo: "Ókeypis", parrafos: ["Reiknivélarnar eru ókeypis og þú þarft ekki notandaaðgang."] },
      ],
    },
    contacto: {
      title: "Hafa samband | CalcularYa",
      description: "Skrifaðu okkur ef tala er úrelt, niðurstaða kemur þér á óvart eða ef þig vantar reiknivél eða land.",
      h1: "Hafa samband",
      bajada: `Netfangið okkar: ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Það hjálpar okkur ef þú lætur vita af úreltri tölu, óvæntri niðurstöðu eða reiknivél eða landi sem vantar.",
            "Ef þetta snýst um tölu skaltu nefna landið og síðuna þar sem þú sást hana.",
            "Raunveruleg manneskja svarar. Það getur tekið nokkra daga.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Persónuvernd | CalcularYa",
      description: "Hvaða gögn CalcularYa notar: það sem þú slærð inn í reiknivél er unnið í vafranum þínum og við geymum það ekki.",
      h1: "Persónuvernd",
      bajada: `Síðast breytt: ${actualizado}.`,
      bloques: [
        {
          titulo: "Það sem þú slærð inn í reiknivél",
          parrafos: ["Útreikningurinn fer fram í vafranum þínum. Það sem þú slærð inn er ekki sent á neinn netþjón og við geymum það ekki."],
        },
        {
          titulo: "Landið þitt",
          parrafos: [
            "Til að bjóða þér reiknivélar rétta landsins greinum við frá hvaða landi þú tengist. Hýsingaraðilinn okkar ákvarðar það út frá IP-tölunni þinni.",
            "Við geymum ekki IP-töluna þína. Svarið er aðeins í vafranum þínum á meðan á heimsókninni stendur.",
          ],
        },
        {
          titulo: "Það sem vafrinn þinn geymir",
          parrafos: [
            "Lotugeymsla vafrans, sem tæmist þegar þú lokar flipanum, man land heimsóknarinnar, hvort þú lokaðir tilkynningunni sem býður það og, ef þú komst í gegnum deildan hlekk, kóða þess hlekks.",
            "Staðbundin geymsla, sem helst þar til þú eyðir henni í vafranum, geymir landið sem þú valdir, handahófskennda tölu til að telja heimsóknir og þá útlitsprófun sem þú sérð, svo vefurinn líti eins út í hvert sinn sem þú kemur aftur. Ekkert af þessu segir hver þú ert.",
            "Við notum ekki vafrakökur til auglýsinga eða rakningar.",
          ],
        },
        {
          titulo: "Hýsing vefsins",
          parrafos: ["Vefurinn keyrir á Vercel. Eins og allir netþjónar skráir hann tæknileg gögn um hverja heimsókn (IP-tölu og vafra) svo vefurinn virki og sé öruggur."],
        },
        {
          titulo: "Hvernig við teljum heimsóknir",
          parrafos: [
            "Við mælum notkun vefsins með eigin verkfæri: hvaða síður eru opnaðar og hversu oft, af hvaða síðu þú komst, tegund tækis og land. Handahófskennd tala sem vafrinn þinn geymir greinir nýja heimsókn frá endurkomu. Við geymum hvorki IP-töluna þína né það sem þú slærð inn í reiknivél.",
            "Hlekkir sem deilt er af vefnum innihalda handahófskenndan kóða, nýjan í hvert sinn, svo við getum talið hve margar heimsóknir hver þeirra skilar. Kóðinn segir ekki til um neinn.",
            "Upphæðir sem þú slærð inn í reiknivél fara aldrei úr vafranum þínum sem hluti af hlekk.",
          ],
        },
        {
          titulo: "Breytingar og spurningar",
          parrafos: [
            "Ef eitthvað af þessu breytist (til dæmis ef við tökum upp auglýsingar) birtum við það á þessari síðu áður en breytingin tekur gildi.",
            `Ef þú ert með spurningu um gögnin þín skaltu skrifa okkur á ${mail}.`,
          ],
        },
        {
          titulo: "Laun sem fólk deilir",
          parrafos: [
            "Á síðunni „Raunveruleg laun“ getur hver sem er bætt launum sínum við nafnlaust, og aðeins eftir að hafa merkt við skýrt samþykki. Við geymum land, starfssvið (af föstum lista), bil starfsreynslu, heildarlaun á mánuði, námunduð í tvo markverða tölustafi, og mánuð. Við geymum hvorki IP-tölu, vafra né notandaaðgang. Fram að uppfærslu næsta dags geymum við einnig dag færslunnar og fingrafar tengingarinnar, dulkóðað með lykli sem breytist daglega og ekki er hægt að endurheimta IP-tölu úr; hvoru tveggja er eytt þegar deginum lýkur.",
            "Við birtum tölurnar einu sinni á dag. Starfssvið birtist þegar það hefur 10 færslur eða fleiri frá ólíkum dögum og úr að minnsta kosti tveimur ólíkum mánuðum. Við sýnum aðeins námundað miðgildi og bil, og fjölda færslna í bilum, svo enginn geti reiknað út laun tiltekins einstaklings með því að bera saman síðuna tvo daga í röð. Einstök laun sýnum við aldrei.",
            "Til að sama land bætist ekki tvisvar við í sama mánuði man vafrinn í staðbundinni geymslu land og mánuð færslunnar, en aldrei upphæðina.",
            "Þar sem færslan tengist engum er ekki hægt að finna hana eða eyða henni síðar.",
          ],
        },
      ],
    },
    terminos: {
      title: "Notkunarskilmálar | CalcularYa",
      description: "Reiknivélar CalcularYa gefa niðurstöðu til upplýsingar út frá gildandi opinberum gögnum. Þetta er viðmið, ekki fagleg ráðgjöf.",
      h1: "Notkunarskilmálar",
      bajada: `Síðast breytt: ${actualizado}.`,
      bloques: [
        {
          titulo: "Til hvers reiknivélarnar eru",
          parrafos: [
            "Niðurstöðurnar eru til upplýsingar og byggjast á gildandi opinberum gögnum. Notaðu þær sem viðmið.",
            "Þær koma ekki í stað útreiknings vinnuveitanda, bókara eða lögmanns né afstöðu viðkomandi stofnunar.",
          ],
        },
        {
          titulo: "Hvaðan gögnin koma",
          parrafos: [
            "Hver reiknivél sýnir opinbera heimild gilda sinna og dagsetninguna þegar við staðfestum þau.",
            "Við leggjum okkur fram um að hafa þau uppfærð, en regla getur breyst áður en við setjum hana inn.",
          ],
        },
        {
          titulo: "Notkun vefsins",
          parrafos: ["Vefurinn er ókeypis. Þú mátt nota hann og deila hlekkjum hans. Óheimilt er að afrita efni í stórum stíl eða koma fram í nafni CalcularYa."],
        },
        {
          titulo: "Ábyrgð",
          parrafos: ["Við berum ekki ábyrgð á ákvörðunum sem teknar eru eingöngu út frá niðurstöðum þessa vefs. Áður en þú skrifar undir, borgar eða sækir einhvern rétt skaltu staðfesta tölurnar hjá viðeigandi aðila eða stofnun."],
        },
        { titulo: "Hafa samband", parrafos: [`Netfangið okkar: ${mail}.`] },
      ],
    },
  },
});
