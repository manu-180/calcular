import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-entreprenant";

export default definirCasos(calculadora, [
  {"nombre": "Commerçant à 12 millions de chiffre d'affaires", "origen": {"tipo": "recalculado", "detalle": "Taxe d'État de l'entreprenant, 4 % de 12 000 000 = 480 000, soit 40 000 par mois."}, "fecha": "2026-10-23", "entrada": {"ca": 12000000, "activite": "commerce", "cga": false}, "esperado": {"regime": "Taxe d'État de l'entreprenant", "taux": 4, "impotAnnuel": 480000, "impotMensuel": 40000}},
  {"nombre": "Prestataire adhérent d'un CGA", "origen": {"tipo": "recalculado", "detalle": "5 % réduit de moitié : 2,5 % de 12 000 000 = 300 000."}, "fecha": "2026-10-23", "entrada": {"ca": 12000000, "activite": "autres", "cga": true}, "esperado": {"taux": 2.5, "impotAnnuel": 300000}},
  {"nombre": "Petite activité de services à 3 millions", "origen": {"tipo": "recalculado", "detalle": "Taxe communale de l'entreprenant, 2,5 % : 75 000."}, "fecha": "2026-10-23", "entrada": {"ca": 3000000, "activite": "autres", "cga": false}, "esperado": {"regime": "Taxe communale de l'entreprenant", "impotAnnuel": 75000}},
  {"nombre": "Microentreprise à 100 millions", "origen": {"tipo": "recalculado", "detalle": "6 % de 100 000 000 = 6 000 000."}, "fecha": "2026-10-23", "entrada": {"ca": 100000000, "activite": "commerce", "cga": false}, "esperado": {"regime": "Impôt des microentreprises", "impotAnnuel": 6000000}},
  {"nombre": "Microentreprise suivie par un CGA", "origen": {"tipo": "recalculado", "detalle": "4 % : 4 000 000."}, "fecha": "2026-10-23", "entrada": {"ca": 100000000, "activite": "commerce", "cga": true}, "esperado": {"impotAnnuel": 4000000}},
  {"nombre": "Au-delà de 200 millions", "origen": {"tipo": "recalculado", "detalle": "Régime du réel."}, "fecha": "2026-10-23", "entrada": {"ca": 300000000, "activite": "commerce", "cga": false}, "esperado": {"regime": "Régime du réel", "impotAnnuel": 0}},
]);
