"use client";
import { crearCalculadoraCliente } from "@/motor/cliente";
import taxePaiementsNumeraire from "./taxe-paiements-numeraire";
export default crearCalculadoraCliente(taxePaiementsNumeraire);
