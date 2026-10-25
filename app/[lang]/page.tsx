import { notFound } from "next/navigation";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingTelegram from "@/components/FloatingTelegram";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Packages from "@/components/Packages";
import Problems from "@/components/Problems";
import Process from "@/components/Process";
import SiteShowcase from "@/components/SiteShowcase";
import Team from "@/components/Team";
import UpdateNotifier from "@/components/UpdateNotifier";
import { getDictionary, hasLocale } from "@/locales";
import { formatSum, getPrices } from "@/lib/prices";

// Сайт студии под одну нишу: сайты для учебных центров, репетиторов и онлайн-школ.
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const base = getDictionary(lang);
  // Цены — из калькулятора calc.caravanhouse.uz, а не из текста
  const prices = await getPrices();
  const support = formatSum(prices.supportMonthlyFrom);
  const dict = {
    ...base,
    faq: { ...base.faq, items: base.faq.items.map((i) => ({ ...i, answer: i.answer.replace("{support}", support) })) },
  };

  return (
    <>
      <JsonLd lang={lang} dict={dict} prices={prices} />
      <Header lang={lang} dict={{ nav: dict.nav, a11y: dict.a11y, cta: dict.cta }} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero dict={dict} />
        <Problems dict={dict} />
        <SiteShowcase dict={dict} />
        <Packages dict={dict} prices={prices} />
        <Process dict={dict} />
        <Team dict={dict} />
        <FAQ faq={dict.faq} />
        <FinalCTA dict={dict} />
      </main>
      <Footer lang={lang} dict={dict} />
      <FloatingTelegram label={dict.floating.label} />
      <UpdateNotifier t={dict.update} />
    </>
  );
}
