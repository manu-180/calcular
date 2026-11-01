import { definirContenido } from "@/motor/calculo";
import { tramoRenta } from "../lib/marcadores";

export default definirContenido({
  calculadora: "bd.income-tax-calculator",
  h1: "আয়কর ক্যালকুলেটর ২০২৬-২৭",
  title: "আয়কর ক্যালকুলেটর ২০২৬-২৭ | Income tax BD",
  description: "করমুক্ত সীমা {{bd.tax-free-threshold[general]}} ধরে নতুন হারে আয়কর, বিনিয়োগ রেয়াত, ন্যূনতম কর আর রিটার্নের সময়ের প্রণোদনা হিসাব করুন।",
  intro: [
    "বছরের মোট করযোগ্য আয় লিখুন, করদাতার ধরন বেছে নিন। ক্যালকুলেটর অর্থ আইন, ২০২৬ এর হারে আপনার করদায়, কর রেয়াত আর রিটার্নের সঙ্গে কত টাকা দিতে হবে তা দেখাবে।",
    "এই হার করবর্ষ ২০২৬-২৭ ও ২০২৭-২৮ দুই বছরেই একই। করবর্ষ ২০২৬-২৭ এর রিটার্নে আয়বর্ষ ২০২৫-২৬ (১ জুলাই ২০২৫ থেকে ৩০ জুন ২০২৬) এর আয় দেখাতে হয়।",
  ],
  comoSeCalcula: [
    "প্রথম {{bd.tax-free-threshold[general]}} পর্যন্ত আয়ে কর নেই। নারী ও ৬৫ বছরের বেশি বয়সীদের সীমা {{bd.tax-free-threshold[women-senior]}}, প্রতিবন্ধী ও তৃতীয় লিঙ্গের করদাতার {{bd.tax-free-threshold[disabled]}}, যুদ্ধাহত মুক্তিযোদ্ধা ও জুলাই যোদ্ধার {{bd.tax-free-threshold[freedom-fighter]}}।",
    `সাধারণ করদাতার ক্ষেত্রে ${tramoRenta(1, "desde")} থেকে ${tramoRenta(1, "hasta")} পর্যন্ত অংশে ${tramoRenta(1, "tasa")}, ${tramoRenta(2, "hasta")} পর্যন্ত ${tramoRenta(2, "tasa")}, ${tramoRenta(3, "hasta")} পর্যন্ত ${tramoRenta(3, "tasa")}, ${tramoRenta(4, "hasta")} পর্যন্ত ${tramoRenta(4, "tasa")} আর তার বেশি আয়ে ${tramoRenta(-1, "tasa", "।")} সীমা বেশি হলে প্রতিটি ধাপ ততটাই পিছিয়ে যায়।`,
    "কর রেয়াত হলো মোট আয়ের {{bd.investment-rebate[income-pct]}}, রেয়াতযোগ্য বিনিয়োগের {{bd.investment-rebate[investment-pct]}} এবং {{bd.investment-rebate[max]}} টাকা, এই তিনটির মধ্যে যেটি কম।",
    "আয় করমুক্ত সীমার বেশি হলে কর কমপক্ষে {{bd.minimum-tax[general]}}, নতুন করদাতার ক্ষেত্রে {{bd.minimum-tax[new]}}।",
    "উৎসে কাটা কর বাদ দেওয়ার পর রিটার্ন ৩০ সেপ্টেম্বরের মধ্যে দিলে {{bd.return-timing-rates[incentive]}} প্রণোদনা (সর্বোচ্চ {{bd.return-timing-amounts[incentive-max]}}) পাবেন। জানুয়ারি থেকে মার্চে দিলে {{bd.return-timing-rates[late-jan-mar]}} বা {{bd.return-timing-amounts[late-jan-mar-min]}}, যেটি বেশি, আর এপ্রিল থেকে জুনে দিলে {{bd.return-timing-rates[late-apr-jun]}} বা {{bd.return-timing-amounts[late-apr-jun-min]}} অতিরিক্ত কর।",
  ],
  ejemplo: [
    "জাতীয় রাজস্ব বোর্ডের আয়কর নির্দেশিকার উদাহরণে একজন নারী করদাতার মোট আয় ১১,৬২,০০০ টাকা। কর আসে ৯২,৪০০ টাকা। ৩,১০,০০০ টাকা বিনিয়োগে রেয়াত ৩১,০০০ টাকা, তাই করদায় ৬১,৪০০ টাকা। উৎসে কাটা ৪৭,০০০ টাকা বাদে রিটার্নের সঙ্গে দিতে হয় ১৪,৪০০ টাকা।",
  ],
  faq: [
    {
      pregunta: "২০২৬-২৭ করবর্ষে করমুক্ত আয়ের সীমা কত?",
      respuesta: "সাধারণ করদাতার জন্য {{bd.tax-free-threshold[general]}}। নারী ও ৬৫ বছর বা তার বেশি বয়সীদের {{bd.tax-free-threshold[women-senior]}}। প্রতিবন্ধী সন্তানের পিতা বা মাতা প্রতি সন্তানের জন্য আরও {{bd.disabled-child-extra}} বেশি সীমা পান।",
    },
    {
      pregunta: "বিনিয়োগ করলে কর কত কমে?",
      respuesta: "রেয়াত হয় মোট আয়ের {{bd.investment-rebate[income-pct]}} অথবা বিনিয়োগের {{bd.investment-rebate[investment-pct]}}, যেটি কম। তবে রেয়াত কখনো আপনার করের চেয়ে বেশি হয় না, আর ন্যূনতম করের নিচে কর নামে না।",
    },
    {
      pregunta: "রিটার্ন কখন দিলে কর কম লাগে?",
      respuesta: "১ জুলাই থেকে ৩০ সেপ্টেম্বরের মধ্যে দিলে পরিশোধযোগ্য করের {{bd.return-timing-rates[incentive]}} প্রণোদনা পান। ১ অক্টোবর থেকে ৩১ ডিসেম্বরে দিলে প্রণোদনা বা অতিরিক্ত কর কিছুই নেই। এর পরে দিলে অতিরিক্ত কর লাগে।",
    },
    {
      pregunta: "সম্পদের সারচার্জ কি এখানে হিসাব হয়?",
      respuesta: "না। নিট সম্পদ বেশি হলে আলাদা সারচার্জ দিতে হয়, আর গাড়ির মালিকদের অগ্রিম কর ও পরিবেশ সারচার্জ আছে। এগুলো এই হিসাবে যোগ করা হয়নি।",
    },
  ],
  glosario: [
    { termino: "করবর্ষ", definicion: "আয়বর্ষ শেষ হওয়ার পরের ১ জুলাই থেকে শুরু হওয়া ১২ মাস। এই সময়ে আগের আয়বর্ষের রিটার্ন দাখিল হয়।" },
    { termino: "কর রেয়াত", definicion: "রেয়াতযোগ্য খাতে বিনিয়োগের জন্য করদায় থেকে যে অংশ বাদ যায়।" },
    { termino: "উৎসে কর", definicion: "বেতন, সঞ্চয়পত্রের মুনাফা বা ব্যাংক সুদ দেওয়ার সময় যে কর কেটে রাখা হয়। রিটার্নে এটি জমা হিসেবে বাদ যায়।" },
  ],
});
