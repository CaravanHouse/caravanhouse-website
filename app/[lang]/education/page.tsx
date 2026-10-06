import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EduDemos, EduHero, EduProblems } from "@/components/EduLanding";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Prices from "@/components/Prices";
import Process from "@/components/Process";
import UpdateNotifier from "@/components/UpdateNotifier";
import { getDictionary, hasLocale, localeMeta, locales } from "@/locales";

// Страница для учебных центров: /ru/education и /uz/education. Собрана из блоков главной + свои блоки (components/EduLanding.tsx)
export async function generateMetadata({ params }: PageProps<"/[lang]/education">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang).edu;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}/education`,
      languages: { ru: "/ru/education", uz: "/uz/education", "x-default": "/ru/education" },
    },
    openGraph: {
      type: "website",
      url: `/${lang}/education`,
      title: meta.title,
      description: meta.description,
      locale: localeMeta[lang].ogLocale,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeMeta[l].ogLocale),
    },
  };
}

export default async function EducationPage({ params }: PageProps<"/[lang]/education">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  return (
    <>
      <Header lang={lang} dict={{ nav: dict.nav, a11y: dict.a11y, cta: dict.cta }} path="/education" />
      <main id="main" tabIndex={-1} className="outline-none">
        <EduHero dict={dict} />
        <EduProblems dict={dict} />
        <EduDemos dict={dict} />
        <Prices dict={dict} />
        <Process dict={dict} />
        <FinalCTA dict={dict} botRef="site_edu" />
      </main>
      <Footer lang={lang} dict={dict} onHome={false} />
      <UpdateNotifier t={dict.update} />
    </>
  );
}
