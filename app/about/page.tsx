import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  HeartHandshake,
  Sprout,
  Sparkles,
} from "lucide-react";
import { HeroArt } from "@/components/hero-art";
import { Newsletter } from "@/components/newsletter";
export const metadata: Metadata = {
  title: "About Grow Me",
  description:
    "We believe useful knowledge should be open to everyone. Meet Grow Me, a free learning space for your digital life.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <section className="about-hero container">
        <div>
          <span className="eyebrow">HELLO. WE’RE GROW ME.</span>
          <h1>
            Room to learn.
            <br />
            <em>Space to become.</em>
          </h1>
          <p>
            Growing online can feel like a race. We think it can feel a little
            more like tending a garden.
          </p>
          <p>
            A useful lesson. A small experiment. A little progress you can build
            on.
          </p>
          <Link href="/articles" className="button">
            Find your next step <ArrowUpRight size={18} />
          </Link>
        </div>
        <HeroArt />
      </section>
      <section className="about-story">
        <div className="container story-grid">
          <span className="eyebrow">WHY WE’RE HERE</span>
          <div>
            <h2>
              Good knowledge should
              <br />
              have an open door.
            </h2>
            <p>
              Grow Me is an independent educational space for people who want to
              create better content, make sense of new tools, and build a more
              thoughtful online presence.
            </p>
            <p>
              We turn big, sometimes overwhelming topics into practical guides
              you can actually use. From planning your next Instagram post to
              working more carefully with AI, we focus on the skills behind
              meaningful progress.
            </p>
            <p>
              Every article is free to read. There’s no membership to unlock, no
              paid course waiting at the end, and no requirement to hand over
              your email. Just an open invitation to learn.
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="section-block">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A FEW THINGS WE BELIEVE</span>
              <h2>Small principles. Real purpose.</h2>
            </div>
          </div>
          <div className="values-grid">
            {[
              {
                icon: BookOpen,
                title: "Useful over overwhelming",
                text: "Clear explanations, real examples, and a next step. Learning should help you move, not leave you with a longer list of things to worry about.",
              },
              {
                icon: HeartHandshake,
                title: "Open to everyone",
                text: "Every guide is freely accessible. Whether you are starting from scratch or finding your rhythm, there is room for you here.",
              },
              {
                icon: Sparkles,
                title: "Curious, not certain",
                text: "Tools change. Platforms evolve. We encourage testing ideas, checking evidence, and being honest about what we do not know.",
              },
              {
                icon: Sprout,
                title: "Progress at your pace",
                text: "No promises of overnight success. Just practical skills, thoughtful experiments, and the confidence that grows from doing.",
              },
            ].map((v) => (
              <div className="value-card" key={v.title}>
                <v.icon size={29} strokeWidth={1.4} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="editorial-promise">
          <span className="eyebrow">OUR EDITORIAL PROMISE</span>
          <h2>Thoughtful advice, with the edges left honest.</h2>
          <p>
            Our guides are original educational writing. We aim to separate
            practical suggestions from established facts, explain limitations,
            and avoid unsupported claims about algorithms or guaranteed growth.
            You’ll find examples to adapt, not rules that pretend to fit
            everyone.
          </p>
          <p>
            We don’t present third-party work as our own. We encourage you to
            check current official documentation for tools and platforms before
            making important decisions.
          </p>
        </section>
        <Newsletter />
      </div>
    </>
  );
}
