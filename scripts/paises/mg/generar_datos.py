# Genera src/paises/mg/datos.json. Cada valor se leyó en la fuente citada el día de VERIF.
import json
import os

VERIF = "2026-10-27"
CDI_URL = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf"
CNAPS_URL = "https://www.cnaps.mg/historique-sme"
DESDE = "2026-01-01"
R = "2027-01-01"


def cdi(art):
    return {
        "organismo": "Direction générale des impôts (DGI)",
        "titulo": f"Code des impôts mis à jour suivant la loi de finances initiale 2026, article {art}",
        "url": CDI_URL,
        "tipo": "primaria",
        "verificadoEl": VERIF,
    }


def ver(valor, art, desde=DESDE):
    return {"estado": "verificado", "desde": desde, "valor": valor, "fuente": cdi(art)}


def dato(id_, nombre, tipo, unidad, tramos, **extra):
    d = {"id": f"mg.{id_}", "nombre": nombre, "tipo": tipo, "unidad": unidad}
    d.update(extra)
    d["tramos"] = tramos
    return d


datos = []

datos.append(dato("irsa-bareme", "Barème mensuel de l'IRSA (droit commun)", "escala", "MGA", [ver([
    {"desde": 0, "hasta": 350000, "tasa": 0},
    {"desde": 350000, "hasta": 400000, "tasa": 5},
    {"desde": 400000, "hasta": 500000, "tasa": 10},
    {"desde": 500000, "hasta": 600000, "tasa": 15},
    {"desde": 600000, "hasta": 4000000, "tasa": 20},
    {"desde": 4000000, "hasta": None, "tasa": 25},
], "01.03.16")], proximaRevision=R))
datos.append(dato("irsa-minimum", "Minimum mensuel de l'IRSA", "numero", "MGA", [ver(3000, "01.03.16")], proximaRevision=R))
datos.append(dato("irsa-reduction-charge", "Réduction d'IRSA par personne à charge et par mois", "numero", "MGA", [ver(2000, "01.03.19")], proximaRevision=R))
datos.append(dato("irsa-deductions", "Plafonds de déduction des cotisations du revenu brut (IRSA)", "mapa", "%",
                  [ver({"retraite": 10, "sante": 2}, "01.03.09")],
                  etiquetas={"retraite": "Retraite ou pension", "sante": "Organisme sanitaire ou assurance santé"}, proximaRevision=R))
datos.append(dato("irsa-heures-sup", "Heures supplémentaires exonérées d'IRSA par mois", "numero", "horas", [ver(20, "01.03.03, 9°")], proximaRevision=R))

datos.append(dato("tva", "Taux de la TVA", "mapa", "%", [ver({"normal": 20, "butane": 10, "export": 0}, "06.01.12")],
                  etiquetas={"normal": "Taux normal", "butane": "Gaz butane et ses contenants", "export": "Exportations"}, proximaRevision=R))
datos.append(dato("tva-seuil", "Chiffre d'affaires annuel à partir duquel la TVA est obligatoire", "numero", "MGA", [ver(400000000, "06.01.04")], proximaRevision=R))

datos.append(dato("is-taux", "Taux de l'impôt synthétique", "mapa", "%", [ver({"normal": 5, "cga": 3}, "01.02.05")],
                  etiquetas={"normal": "Taux normal", "cga": "Nouvel adhérent d'un centre de gestion agréé ou nouvel immatriculé en ligne"}, proximaRevision=R))
datos.append(dato("is-reduction", "Réduction d'impôt synthétique sur les charges justifiées", "numero", "%", [ver(2, "01.02.05 bis")], proximaRevision=R))
datos.append(dato("is-plancher", "Impôt synthétique minimum en pourcentage du chiffre d'affaires après réduction", "numero", "%", [ver(3, "01.02.05 bis")], proximaRevision=R))
datos.append(dato("is-abattement-cga", "Abattement des adhérents d'un centre de gestion agréé sur la base de l'impôt synthétique", "numero", "%", [ver(50, "01.02.04")], proximaRevision=R))
datos.append(dato("is-abattement-cga-plafond", "Plafond de l'abattement des adhérents d'un centre de gestion agréé", "numero", "MGA", [ver(10000000, "01.02.04")], proximaRevision=R))
datos.append(dato("is-seuil", "Seuil de chiffre d'affaires de l'impôt synthétique", "numero", "MGA", [ver(400000000, "01.02.02")], proximaRevision=R))

ETIQ_IR = {
    "production": "Activités agricoles, artisanales, industrielles, minières, hôtelières, touristiques",
    "autres": "Autres entreprises",
    "petrolier": "Compagnies pétrolières",
    "carburant": "Vente de carburant au détail",
}
datos.append(dato("ir-taux", "Taux de l'impôt sur les revenus (IR)", "numero", "%", [ver(20, "01.01.14")], proximaRevision=R))
datos.append(dato("ir-minimum-fixe", "Minimum de perception de l'IR : partie fixe", "mapa", "MGA",
                  [ver({"production": 500000, "autres": 1000000, "petrolier": 1000000, "carburant": 0}, "01.01.14")],
                  etiquetas=ETIQ_IR, proximaRevision=R))
datos.append(dato("ir-minimum-ca", "Minimum de perception de l'IR : part du chiffre d'affaires hors taxe", "mapa", "%",
                  [ver({"production": 1, "autres": 1, "petrolier": 0.7, "carburant": 0.1}, "01.01.14")],
                  etiquetas=ETIQ_IR, proximaRevision=R))

datos.append(dato("ircm-taux", "Taux de l'impôt sur les revenus des capitaux mobiliers (IRCM)", "mapa", "%",
                  [ver({"general": 20, "cooperative": 10}, "01.04.04")],
                  etiquetas={"general": "Taux général", "cooperative": "Intérêts sur parts sociales et ristournes de coopératives"}, proximaRevision=R))
datos.append(dato("ircm-abattement-dividendes", "Abattement sur les dividendes (IRCM)", "numero", "%", [ver(50, "01.04.04")], proximaRevision=R))

datos.append(dato("ipvi-taux", "Taux de l'impôt sur les plus-values immobilières (IPVI)", "numero", "%", [ver(20, "01.05.07")], proximaRevision=R))
datos.append(dato("ipvi-prix-revient", "Prix de revient forfaitaire pour l'IPVI, en pourcentage du prix de cession", "numero", "%", [ver(75, "01.05.04")], proximaRevision=R))

datos.append(dato("droit-mutation-immeuble", "Droit d'enregistrement sur les ventes d'immeubles", "numero", "%", [ver(5, "02.02.39")], proximaRevision=R))
datos.append(dato("droit-bail", "Droit d'enregistrement des baux", "mapa", "%", [ver({"habitation": 1, "autres": 2, "emphyteotique": 5}, "02.02.12")],
                  etiquetas={"habitation": "Habitation (et baux assimilés)", "autres": "Commercial, professionnel ou mixte", "emphyteotique": "Bail emphytéotique"},
                  proximaRevision=R))
datos.append(dato("droit-cession", "Droits d'enregistrement sur les cessions à titre onéreux de biens meubles", "mapa", "%", [ver({
    "meubles": 5, "utilitaire": 2, "occasion-concession": 2, "fonds": 5, "marchandises": 2, "parts": 0.5, "creances": 0.5,
}, "02.02.22, 02.02.42, 02.02.43 et 02.02.45")], etiquetas={
    "meubles": "Voiture ou autre bien meuble",
    "utilitaire": "Camion, camionnette, car de plus de 10 places, engin ou tracteur agricole",
    "occasion-concession": "Voiture d'occasion vendue par un concessionnaire",
    "fonds": "Fonds de commerce ou clientèle",
    "marchandises": "Marchandises neuves garnissant un fonds",
    "parts": "Actions ou parts sociales",
    "creances": "Créances",
}, proximaRevision=R))
datos.append(dato("droit-donation", "Droit sur les donations entre vifs", "numero", "%", [ver(5, "02.03.25, II")], proximaRevision=R))
datos.append(dato("droit-donation-ligne-directe", "Droit fixe par donataire en ligne directe descendante", "numero", "MGA", [ver(40000, "02.03.25, II")], proximaRevision=R))

# Taxe sur les véhicules à moteur, article 02.09.06: tarif annuel par puissance, énergie et âge.
TVM = {
    "1-4": {"essence": [15000, 40000, 90000, 115000], "diesel": [20000, 45000, 95000, 120000], "electrique": [5000, 30000, 80000, 105000], "hybride": [10000, 35000, 85000, 110000]},
    "5-9": {"essence": [30000, 55000, 105000, 130000], "diesel": [40000, 65000, 115000, 140000], "electrique": [10000, 35000, 85000, 110000], "hybride": [20000, 45000, 95000, 120000]},
    "10-12": {"essence": [60000, 85000, 135000, 160000], "diesel": [80000, 105000, 155000, 180000], "electrique": [20000, 45000, 95000, 120000], "hybride": [40000, 65000, 115000, 140000]},
    "13-15": {"essence": [90000, 115000, 165000, 190000], "diesel": [120000, 145000, 195000, 220000], "electrique": [30000, 55000, 105000, 130000], "hybride": [60000, 85000, 135000, 160000]},
    "16": {"essence": [180000, 205000, 255000, 280000], "diesel": [240000, 265000, 315000, 340000], "electrique": [60000, 85000, 135000, 160000], "hybride": [120000, 145000, 195000, 220000]},
}
AGES = ["a5", "a10", "a20", "plus20"]
tvm = {}
for p, energies in TVM.items():
    for e, montants in energies.items():
        for a, m in zip(AGES, montants):
            tvm[f"{e}-{p}-{a}"] = m
datos.append(dato("taxe-vehicules", "Taxe annuelle sur les véhicules à moteur", "mapa", "MGA", [ver(tvm, "02.09.06")], proximaRevision=R))

datos.append(dato("ifpb", "Impôt foncier sur la propriété bâtie (IFPB)", "mapa", "%", [ver({"taux": 5, "residence-principale": 30}, "10.02.06 et 10.02.10")],
                  etiquetas={"taux": "Taux sur la valeur locative", "residence-principale": "Part de la valeur locative retenue pour la résidence principale"},
                  proximaRevision=R))
datos.append(dato("ifpb-minimum", "IFPB minimum par immeuble", "numero", "MGA", [ver(5000, "10.02.10")], proximaRevision=R))

datos.append(dato("avantages-nature", "Évaluation des avantages en nature pour l'IRSA", "mapa", "%",
                  [ver({"vehicule": 15, "logement": 50, "logement-plafond": 25, "telephone": 15}, "01.03.08")],
                  etiquetas={
                      "vehicule": "Véhicule : part des dépenses mensuelles",
                      "logement": "Logement : part du loyer réel",
                      "logement-plafond": "Logement : plafond en part des rémunérations fixes",
                      "telephone": "Téléphone : part des dépenses mensuelles",
                  }, proximaRevision=R))

datos.append(dato("taxe-assurance", "Taxe sur les contrats d'assurance", "mapa", "%", [ver({
    "navigation": 4, "incendie-activite": 7, "incendie-autres": 20, "vie": 3, "rente-viagere": 5, "autres": 4.5,
}, "02.06.02")], etiquetas={
    "navigation": "Navigation maritime, fluviale ou aérienne",
    "incendie-activite": "Incendie : biens affectés à une activité professionnelle",
    "incendie-autres": "Incendie : autres biens",
    "vie": "Assurance vie et rentes différées de 3 ans et plus",
    "rente-viagere": "Rente viagère",
    "autres": "Autres assurances (automobile, responsabilité civile...)",
}, proximaRevision=R))


def cnaps(titulo):
    return {"organismo": "Caisse nationale de prévoyance sociale (CNaPS)", "titulo": titulo, "url": CNAPS_URL, "tipo": "primaria", "verificadoEl": VERIF}


MOTIVO_SME = (
    "La presse (L'Express de Madagascar, juillet 2026) rapporte, d'après la direction générale du Travail, "
    "un décret publié le 29 juin 2026 qui porte le SME à 315 000 Ar à partir d'octobre 2026. "
    "Ni le décret ni la page de la CNaPS (qui affiche encore 300 000 Ar sans date de fin) ne le confirment."
)
datos.append(dato("sme-general", "Salaire minimum d'embauche (SME) mensuel, régime général non agricole", "numero", "MGA", [
    {"estado": "verificado", "desde": "2024-03-01", "hasta": "2026-02-28", "valor": 262680, "fuente": cnaps("Historique du salaire minimum d'embauche, régime général")},
    {"estado": "verificado", "desde": "2026-03-01", "hasta": "2026-09-30", "valor": 300000, "fuente": cnaps("Historique du salaire minimum d'embauche, régime général")},
    {"estado": "no-verificado", "desde": "2026-10-01", "valor": 315000, "motivo": MOTIVO_SME},
], proximaRevision="2027-03-01"))
datos.append(dato("sme-agricole", "Salaire minimum d'embauche (SME) mensuel, régime agricole", "numero", "MGA", [
    {"estado": "verificado", "desde": "2024-03-01", "hasta": "2026-02-28", "valor": 266500, "fuente": cnaps("Historique du salaire minimum d'embauche, régime agricole")},
    {"estado": "verificado", "desde": "2026-03-01", "valor": 304300, "fuente": cnaps("Historique du salaire minimum d'embauche, régime agricole")},
]))
datos.append(dato("plafond-cnaps-sme", "Plafond mensuel soumis à cotisation CNaPS, en nombre de SME", "numero", "factor", [
    {"estado": "verificado", "desde": "2024-03-01", "valor": 8, "fuente": cnaps("Historique du SME : le plafond mensuel soumis à cotisation vaut huit fois le SME")},
]))
MOTIVO_TAUX = (
    "Taux attribué à l'arrêté interministériel n° 5410/99 par des sites syndicaux et de paie ; "
    "ni l'arrêté ni une page de la CNaPS publiant le taux ne sont accessibles en ligne."
)
datos.append(dato("cotisation-cnaps-salarie", "Cotisation CNaPS à la charge du salarié", "numero", "%", [
    {"estado": "no-verificado", "desde": "2026-01-01", "valor": 1, "motivo": MOTIVO_TAUX},
]))
datos.append(dato("cotisation-sante-salarie", "Cotisation salariale à l'organisme sanitaire inter-entreprises (OSTIE, AMIT...)", "numero", "%", [
    {"estado": "no-verificado", "desde": "2026-01-01", "valor": 1,
     "motivo": "Taux attribué au décret n° 2003-1162 par des sites de paie ; le texte n'est pas en ligne sur un site officiel et le site de l'OSTIE ne répond pas."},
]))

destino = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "src", "paises", "mg", "datos.json")
with open(destino, "w", encoding="utf-8", newline="\n") as f:
    json.dump({"mercado": "mg", "datos": datos}, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(datos), "datos")
