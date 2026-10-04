import { notFound } from "next/navigation";
import Advantages from "@/components/Advantages";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import FloatingTelegram from "@/components/FloatingTelegram";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Process from "@/components/Process";
import Prices from "@/components/Prices";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Team from "@/components/Team";
import UpdateNotifier from "@/components/UpdateNotifier";
import { getDictionary, hasLocale } from "@/locales";
import { formatSum, getPrices } from "@/lib/prices";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const base = getDictionary(lang);
  // Цена поддержки в FAQ берётся из калькулятора (как и цены в блоке «Цены»), а не хранится в тексте
  const prices = await getPrices();
  const { supportMonthlyFrom } = prices;
  const support = formatSum(supportMonthlyFrom);
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
        <Services dict={dict} />
        <Prices dict={dict} />
        <Advantages dict={dict} />
        <Process dict={dict} />
        <Projects dict={dict} />
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
