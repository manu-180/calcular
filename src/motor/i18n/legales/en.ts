import type { DiccionarioLegal } from "./tipos";

export const en: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "About us | CalcularYa",
      description: "CalcularYa builds calculators for work, money and everyday life in every country, with figures taken from official sources.",
      h1: "About us",
      bajada: "Calculators for every country, each with its own official data.",
      bloques: [
        {
          parrafos: [
            "CalcularYa is a calculator site for everyday math: pay, loans, taxes, dates and much more.",
            "It's made by Manuel Navarro, who also runs calcular.ar, a calculator site for Argentina.",
          ],
        },
        {
          titulo: "How we work",
          parrafos: [
            "When a calculation depends on a rule (a minimum wage, a contribution rate, a cap), we read the value in the country's official source: the official gazette, the ministry, the central bank or the tax agency.",
            "We keep the link and the date we checked it, and show both next to each calculator.",
            "If a value can't be confirmed in the official source, the calculator that uses it isn't published.",
            "When a rule changes, the calculator changes with it, and the change is logged in each country's updates.",
          ],
        },
        { titulo: "Free", parrafos: ["The calculators are free and don't require an account."] },
      ],
    },
    contacto: {
      title: "Contact | CalcularYa",
      description: "Write to us if a figure is out of date, a result isn't what you expected, or you'd like a new calculator or country.",
      h1: "Contact",
      bajada: `Our email is ${mail}.`,
      bloques: [
        {
          parrafos: [
            "It helps us to hear when a figure is out of date, when a result isn't what you expected, or when a calculator or country is missing.",
            "If it's about a figure, include the country and the page where you saw it.",
            "A real person replies. It may take us a few days.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privacy | CalcularYa",
      description: "What data CalcularYa uses: what you type into a calculator is processed in your browser and we don't store it.",
      h1: "Privacy",
      bajada: `Last updated: ${actualizado}.`,
      bloques: [
        {
          titulo: "What you type into a calculator",
          parrafos: ["The math runs in your browser. What you type isn't sent to any server, and we don't store it."],
        },
        {
          titulo: "Your country",
          parrafos: [
            "To suggest the right country's calculators, we look up which country your visit comes from. Our hosting provider infers it from your IP address.",
            "We don't store your IP address. The answer stays in your browser for the length of the visit.",
          ],
        },
        {
          titulo: "What your browser stores",
          parrafos: [
            "Your browser's session storage, which is cleared when you close the tab, remembers your visit's country, whether you closed the notice that suggests it and, if you arrived through a shared link, that link's code.",
            "Local storage, which stays until you clear it in your browser, keeps the country you picked yourself, a random number used to count visits, and the version of a design test you're shown, so the site looks the same every time you come back. None of it says who you are.",
            "We don't use advertising or tracking cookies.",
          ],
        },
        {
          titulo: "Hosting",
          parrafos: ["The site is hosted on Vercel. Like any server, it logs technical data for each visit (IP address and browser) so the site works and stays secure."],
        },
        {
          titulo: "How we count visits",
          parrafos: [
            "We measure how the site is used with our own tool: which pages are opened and how much they're used, which site you came from, your device type and your country. The random number your browser keeps tells a new visit from a returning one. We don't store your IP address or anything you type into a calculator.",
            "Links shared from the site carry a random code, different every time something is shared, so we can count how many visits each one brings. That code doesn't identify anyone.",
            "The amounts you type into a calculator never leave your browser inside a link.",
          ],
        },
        {
          titulo: "Changes and questions",
          parrafos: [
            "If any of this changes (for example, if we add advertising), we'll say so on this page before it takes effect.",
            `For any question about your data, email us at ${mail}.`,
          ],
        },
        {
          titulo: "Salaries people share",
          parrafos: [
            "On “Real salaries” anyone can add a salary anonymously, and only after ticking an explicit consent box. We store the country, the occupation (from a fixed list), the experience range, the gross monthly salary rounded to two significant figures and the month. We do not store the IP address, the browser or an account. Until the next day's update we also keep the day of the entry and a fingerprint of the connection, encrypted with a key that changes every day and that cannot be turned back into the IP address; both are deleted when the day closes.",
            "Figures are published once a day. An occupation appears once it has 10 or more entries, made on several days and in at least two different months. We only show the median and the range, rounded, and the number of entries in ranges, so nobody can work out a person's salary by comparing the page on two days. No individual salary is ever shown.",
            "To avoid adding the same country twice in one month, the browser keeps the country and month of the entry in local storage, never the amount.",
            "Because an entry is not linked to anyone, there is no way to find it later to delete it.",
          ],
        },
      ],
    },
    terminos: {
      title: "Terms of use | CalcularYa",
      description: "CalcularYa's calculators give an estimate using the official data in force. They're a guide, not professional advice.",
      h1: "Terms of use",
      bajada: `Last updated: ${actualizado}.`,
      bloques: [
        {
          titulo: "What the calculators are for",
          parrafos: [
            "Results are estimates based on the official data in force. Use them as a guide.",
            "They don't replace the calculation of an employer, an accountant or a lawyer, or what the official agency says.",
          ],
        },
        {
          titulo: "Where the data comes from",
          parrafos: [
            "Every calculator shows the official source of its values and the date we checked them.",
            "We do our best to keep them current, but a rule can change before we add it.",
          ],
        },
        {
          titulo: "Using the site",
          parrafos: ["The site is free. You can use it and share its links. Copying the content in bulk or posing as CalcularYa isn't allowed."],
        },
        {
          titulo: "Liability",
          parrafos: ["We're not responsible for decisions based solely on a result from this site. Before you sign, pay or file a claim, confirm the numbers with the right person or agency."],
        },
        { titulo: "Contact", parrafos: [`Our email is ${mail}.`] },
      ],
    },
  },
});
