import { definirCasos } from "@/motor/calculo";
import gstCalculator from "./gst-calculator";

export default definirCasos(gstCalculator, [
  {
    "nombre": "BTS worked example of diesel at 12.5%",
    "origen": {
      "tipo": "oficial",
      "url": "https://media.bts.gov.bz/uploads/Orientation_Manual_for_Issuers_of_Electronic_Tax_Documents_v_1_30_2026_05_20_ac8fd13e93.pdf",
      "detalle": "12.5% of 26,964.30 is 3,370.54 and the total is 30,334.84, as in the BTS manual."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 26964.3,
      "modo": "sin"
    },
    "esperado": {
      "gst": 3370.54,
      "total": 30334.84,
      "base": 26964.3
    }
  },
  {
    "nombre": "GST taken out of a price that includes it",
    "origen": {
      "tipo": "recalculado",
      "url": "https://media.bts.gov.bz/uploads/Orientation_Manual_for_Issuers_of_Electronic_Tax_Documents_v_1_30_2026_05_20_ac8fd13e93.pdf",
      "detalle": "225 x 12.5 / 112.5 = 25.00 and 225 - 25 = 200."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 225,
      "modo": "con"
    },
    "esperado": {
      "gst": 25,
      "base": 200,
      "total": 225
    }
  },
  {
    "nombre": "GST added to a small price",
    "origen": {
      "tipo": "recalculado",
      "url": "https://media.bts.gov.bz/uploads/Orientation_Manual_for_Issuers_of_Electronic_Tax_Documents_v_1_30_2026_05_20_ac8fd13e93.pdf",
      "detalle": "100 x 12.5% = 12.50."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 100,
      "modo": "sin"
    },
    "esperado": {
      "gst": 12.5,
      "total": 112.5
    }
  }
]);
