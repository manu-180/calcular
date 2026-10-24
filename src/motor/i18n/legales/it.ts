import type { DiccionarioLegal } from "./tipos";

// Quasi tutto in forma impersonale: lo stesso testo va bene col tu e col Lei, cambia solo la
// pagina dei contatti.
export const it: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Chi siamo | CalcularYa",
      description: "CalcularYa realizza calcolatori per lavoro, soldi e vita quotidiana in ogni paese, con dati presi da fonti ufficiali.",
      h1: "Chi siamo",
      bajada: "Calcolatori per ogni paese, ciascuno con i suoi dati ufficiali.",
      bloques: [
        {
          parrafos: [
            "CalcularYa è un sito di calcolatori per i conti di tutti i giorni: stipendio, prestiti, tasse, date e molto altro.",
            "Lo realizza Manuel Navarro, che cura anche calcular.ar, il sito di calcolatori per l'Argentina.",
          ],
        },
        {
          titulo: "Come lavoriamo",
          parrafos: [
            "Quando un calcolo dipende da una norma (un salario minimo, un'aliquota contributiva, un tetto), leggiamo il valore nella fonte ufficiale del paese: gazzetta ufficiale, ministero, banca centrale o agenzia delle entrate.",
            "Conserviamo il link e la data del controllo e li mostriamo accanto a ogni calcolatore.",
            "Se un valore non si può confermare nella fonte ufficiale, il calcolatore che lo usa non viene pubblicato.",
            "Quando una norma cambia, il calcolatore cambia con lei e la modifica resta nelle novità di ogni paese.",
          ],
        },
        { titulo: "Gratis", parrafos: ["I calcolatori sono gratuiti e non richiedono registrazione."] },
      ],
    },
    contacto: {
      title: "Contatti | CalcularYa",
      description: "Scrivici se un dato non è aggiornato, se un risultato non ti torna o se manca un calcolatore o un paese.",
      h1: "Contatti",
      bajada: `La nostra email è ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Ci è utile sapere se un dato non è aggiornato, se un risultato non è quello che ti aspettavi o se manca un calcolatore o un paese.",
            "Se riguarda un dato, indica il paese e la pagina in cui l'hai visto.",
            "Risponde una persona in carne e ossa. Può volerci qualche giorno.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacy | CalcularYa",
      description: "Quali dati usa CalcularYa: ciò che si inserisce in un calcolatore viene elaborato nel browser e non viene conservato.",
      h1: "Privacy",
      bajada: `Ultimo aggiornamento: ${actualizado}.`,
      bloques: [
        {
          titulo: "Ciò che si inserisce in un calcolatore",
          parrafos: ["Il calcolo avviene nel browser. I valori inseriti non vengono inviati a nessun server e non li conserviamo."],
        },
        {
          titulo: "Il paese della visita",
          parrafos: [
            "Per suggerire i calcolatori del paese giusto, verifichiamo da quale paese arriva la visita. Lo ricava il nostro fornitore di hosting dall'indirizzo IP.",
            "Non conserviamo l'IP. L'informazione resta nel browser per la durata della visita.",
          ],
        },
        {
          titulo: "Cosa conserva il browser",
          parrafos: [
            "Nell'archiviazione di sessione del browser, che si cancella alla chiusura della scheda, ricordiamo il paese della visita, se l'avviso che lo suggerisce è stato chiuso e, se la visita arriva da un link condiviso, il codice di quel link.",
            "Nell'archiviazione locale, che resta finché non viene cancellata dal browser, conserviamo il paese scelto a mano, un numero casuale per contare le visite e la versione mostrata di un test di design, perché il sito si veda uguale a ogni visita. Niente di tutto questo dice chi è la persona.",
            "Non usiamo cookie pubblicitari né di tracciamento.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["Il sito è ospitato su Vercel. Come ogni server, registra dati tecnici di ogni visita (indirizzo IP e browser) perché il sito funzioni e resti sicuro."],
        },
        {
          titulo: "Come contiamo le visite",
          parrafos: [
            "Misuriamo l'uso del sito con uno strumento nostro: quali pagine si aprono e quanto si usano, da quale sito arriva la visita, il tipo di dispositivo e il paese. Il numero casuale conservato nel browser serve a distinguere una visita nuova da una di ritorno. Non conserviamo l'IP né ciò che si inserisce in un calcolatore.",
            "I link condivisi dal sito portano un codice casuale, diverso a ogni condivisione, per contare quante visite porta ciascuno. Quel codice non identifica nessuno.",
            "Gli importi inseriti in un calcolatore non escono mai dal browser dentro un link.",
          ],
        },
        {
          titulo: "Modifiche e domande",
          parrafos: [
            "Se qualcosa cambia (per esempio, se aggiungiamo pubblicità), lo diremo in questa pagina prima che entri in vigore.",
            `Per qualsiasi domanda sui dati personali, la nostra email è ${mail}.`,
          ],
        },
        {
          titulo: "Gli stipendi condivisi",
          parrafos: [
            "In «Stipendi reali» è possibile aggiungere uno stipendio in forma anonima e facoltativa, solo dopo un consenso esplicito. Salviamo il paese, la professione (da un elenco chiuso), la fascia di anni di esperienza, lo stipendio lordo mensile arrotondato a due cifre significative e il mese. Non salviamo l'indirizzo IP, il browser, un account né la data esatta.",
            "Pubblichiamo solo la mediana e l'intervallo di gruppi di almeno 10 persone. Nessuno stipendio individuale viene mostrato.",
            "Per evitare di aggiungere due volte lo stesso paese nello stesso mese, il browser ricorda nella memoria locale il paese e il mese del contributo, mai l'importo.",
            "Poiché un contributo non è legato a nessuno, non è possibile ritrovarlo in seguito per cancellarlo.",
          ],
        },
      ],
    },
    terminos: {
      title: "Termini d'uso | CalcularYa",
      description: "I calcolatori di CalcularYa danno una stima con i dati ufficiali in vigore. Servono a orientarsi e non sostituiscono una consulenza.",
      h1: "Termini d'uso",
      bajada: `Ultimo aggiornamento: ${actualizado}.`,
      bloques: [
        {
          titulo: "A cosa servono i calcolatori",
          parrafos: [
            "I risultati sono una stima basata sui dati ufficiali in vigore. Servono a orientarsi.",
            "Non sostituiscono il calcolo di un datore di lavoro, di un commercialista o di un avvocato, né quanto stabilisce l'ente ufficiale.",
          ],
        },
        {
          titulo: "Da dove vengono i dati",
          parrafos: [
            "Ogni calcolatore mostra la fonte ufficiale dei suoi valori e la data in cui li abbiamo controllati.",
            "Facciamo il possibile per tenerli aggiornati, ma una norma può cambiare prima che la recepiamo.",
          ],
        },
        {
          titulo: "Uso del sito",
          parrafos: ["Il sito è gratuito. Si può usare e se ne possono condividere i link. Non è consentito copiarne i contenuti in modo massivo né spacciarsi per CalcularYa."],
        },
        {
          titulo: "Responsabilità",
          parrafos: ["Non rispondiamo di decisioni prese solo sulla base di un risultato del sito. Prima di firmare, pagare o presentare un reclamo, conviene far confermare il calcolo da chi di dovere."],
        },
        { titulo: "Contatti", parrafos: [`La nostra email è ${mail}.`] },
      ],
    },
  },
  usted: {
    contacto: {
      description: "Ci scriva se un dato non è aggiornato, se un risultato non Le torna o se manca un calcolatore o un paese.",
      bloques: [
        {
          parrafos: [
            "Ci è utile sapere se un dato non è aggiornato, se un risultato non è quello che si aspettava o se manca un calcolatore o un paese.",
            "Se riguarda un dato, indichi il paese e la pagina in cui l'ha visto.",
            "Risponde una persona in carne e ossa. Può volerci qualche giorno.",
          ],
        },
      ],
    },
  },
});
