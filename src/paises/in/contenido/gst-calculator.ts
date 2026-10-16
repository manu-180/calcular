import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "in.gst-calculator",
  h1: "GST calculator",
  title: "GST calculator: add or remove 5%, 18% or 40% GST",
  description:
    "Add GST to a price or take it out, with the {{in.gst-rates[merit]}}, {{in.gst-rates[standard]}} and {{in.gst-rates[demerit]}} rates and the CGST, SGST or IGST split.",
  intro: [
    "Enter a price, pick the GST rate and see the tax and the final amount, split into CGST and SGST or shown as IGST.",
    "Since 22 September 2025 GST has two main rates, a merit rate of {{in.gst-rates[merit]}} and a standard rate of {{in.gst-rates[standard]}}, plus a special rate of {{in.gst-rates[demerit]}} for a short list of goods and services.",
  ],
  comoSeCalcula: [
    "To add GST, multiply the price by the rate. The price with GST is the price plus that amount.",
    "To remove GST from a price that already includes it, divide by 1 plus the rate. At 18%, divide by 1.18.",
    "On a sale within the same state, GST is split in half: CGST goes to the centre and SGST (or UTGST in a union territory) to the state.",
    "On a sale to another state, the whole amount is IGST.",
  ],
  ejemplo: [
    "A bill of ₹10,000 at 18% carries ₹1,800 of GST: ₹900 CGST and ₹900 SGST. The customer pays ₹11,800.",
    "If ₹10,500 already includes 5% GST, the price before tax is ₹10,000 and the GST is ₹500.",
  ],
  faq: [
    {
      pregunta: "Which rate applies to my product?",
      respuesta:
        "It depends on the goods or service and its HSN or SAC code. After the 2025 reform many everyday items moved to {{in.gst-rates[merit]}} and the standard rate is {{in.gst-rates[standard]}}. Check the rate notification for your code.",
    },
    {
      pregunta: "What happened to the 12% and 28% rates?",
      respuesta:
        "The GST Council replaced the four-rate structure with two main rates from 22 September 2025. Many items went down from 12% or 18% to 5%, and goods such as air conditioners and TVs went from 28% to 18%. A few went to the special 40% rate.",
    },
    {
      pregunta: "What goes into the 40% rate?",
      respuesta: "A short list, such as aerated and other sweetened drinks, pan masala and some tobacco products, and services such as casinos and race clubs.",
    },
    {
      pregunta: "Are some items exempt?",
      respuesta: "Yes. For example, individual life and health insurance policies are exempt, and UHT milk, paneer and Indian breads such as roti and paratha are at nil.",
    },
  ],
  glosario: [
    { termino: "CGST", definicion: "Central GST, the half of the tax that goes to the central government on a sale within a state." },
    { termino: "SGST", definicion: "State GST, the half that goes to the state." },
    { termino: "IGST", definicion: "Integrated GST, charged on sales between states and on imports." },
  ],
});
