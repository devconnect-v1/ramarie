import type { MetaFunction } from "@remix-run/node";

import { About } from "~/components/marketing/about";
import { Contact } from "~/components/marketing/contact";
import { Copyright } from "~/components/marketing/copyright";
import { Footer } from "~/components/marketing/footer";
import { Hero } from "~/components/marketing/hero";
import { Navbar } from "~/components/marketing/navbar";
import { Popular } from "~/components/marketing/popular";
import { ScrollToTopButton } from "~/components/marketing/scrollToTopButton";

export const meta: MetaFunction = () => [{ title: "Ramarie | Home" }];

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Popular />
      <Contact />
      <Footer />
      <Copyright />
      <ScrollToTopButton />
    </>
  );
}
