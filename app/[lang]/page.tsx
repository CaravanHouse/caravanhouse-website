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
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Team from "@/components/Team";
import { getDictionary, hasLocale } from "@/locales";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <JsonLd lang={lang} dict={dict} />
      <Header lang={lang} dict={{ nav: dict.nav, a11y: dict.a11y, cta: dict.cta }} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero dict={dict} />
        <Services dict={dict} />
        <Advantages dict={dict} />
        <Process dict={dict} />
        <Projects dict={dict} />
        <Team dict={dict} />
        <FAQ faq={dict.faq} />
        <FinalCTA dict={dict} />
      </main>
      <Footer lang={lang} dict={dict} />
      <FloatingTelegram label={dict.floating.label} />
    </>
  );
}
