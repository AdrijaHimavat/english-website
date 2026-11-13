import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@/components/newsletter";

export const metadata: Metadata = {
  title: "30 free AI prompts for Instagram content",
  description:
    "Copy-and-paste prompts for planning, hooks, Reel scripts, carousels and captions. Works with Claude, ChatGPT or Gemini.",
  alternates: { canonical: "/free-prompts" },
};

const groups: { title: string; note: string; prompts: string[] }[] = [
  {
    title: "Know your page and audience",
    note: "Run these once. Paste the answers back in before every later prompt.",
    prompts: [
      "I run an Instagram page about [topic] for [who]. Ask me 10 questions, one at a time, to work out exactly who my ideal follower is. Then summarise that person in 5 sentences.",
      "Here is my Instagram bio: [paste]. Rewrite it 5 ways in under 150 characters. Each must say who I help, with what, and give one reason to follow.",
      "List 25 questions a beginner in [topic] types into search or asks in comments. Group them by how close the person is to buying something.",
      "My page covers [topic]. Suggest 3 content pillars. For each: what it teaches, who it is for, and 5 example post titles.",
      "Here are my last 9 post topics: [list]. Tell me what a stranger would think this page is about, and which posts confuse that message.",
      "Give me 10 beliefs my audience holds about [topic] that are wrong or out of date. For each, write the one-sentence truth I can teach.",
    ],
  },
  {
    title: "Plan a month",
    note: "Ask for a table so you can paste it into a spreadsheet.",
    prompts: [
      "Using these pillars: [pillars], build a 30-day Instagram plan with 4 Reels, 2 carousels and daily Stories each week. Table columns: day, format, topic, hook, call to action.",
      "I can film for 2 hours on Sunday. From this plan: [paste], pick the posts I can batch in one session and give me a shot list in filming order.",
      "Turn this one idea into 7 posts for 7 days, each a different format: [idea].",
      "Here is a long video transcript: [paste]. Find the 8 strongest 20 to 40 second moments for Reels. Quote the first and last sentence of each.",
      "Give me 20 Story ideas for [topic] that ask the viewer to tap, vote or reply. No giveaways.",
      "Review this content plan: [paste]. Which 5 posts are weakest, and what would you replace each with?",
    ],
  },
  {
    title: "Hooks and Reel scripts",
    note: "The first two seconds decide whether the rest is seen.",
    prompts: [
      "Write 15 opening lines for a Reel about [topic]. Under 10 words each. No questions, no 'did you know', no 'stop scrolling'.",
      "Write a 30-second Reel script on [topic]: hook, 3 short points, one closing line that tells the viewer what to do next. Mark what appears on screen beside each line.",
      "Here is my Reel script: [paste]. Cut it by a third without losing any step. Show me what you removed.",
      "Give me 5 ways to open the same Reel about [topic]: a result, a mistake, a comparison, a demonstration, a number.",
      "Write the on-screen text for this Reel, one line per cut, maximum 6 words per line: [script].",
      "I recorded this voice-over: [paste]. Suggest B-roll or screen recording for each sentence that I can film with a phone.",
    ],
  },
  {
    title: "Carousels and captions",
    note: "Carousels are saved when each slide can stand alone.",
    prompts: [
      "Write a 7-slide carousel on [topic]. Slide 1 is a promise in under 8 words. Slides 2 to 6 teach one step each in under 25 words. Slide 7 asks for a save.",
      "Write 3 captions for this post: [describe]. One of 2 lines, one of 5 lines, one that tells a short story. Put the search words [keywords] in the first line of each.",
      "Rewrite this caption so the first 125 characters make sense alone, because that is all most people see: [paste].",
      "Turn this carousel into a 20-second Reel script: [paste slides].",
      "Give me 10 calls to action for [topic] that ask for a save, a share or a reply, never 'link in bio'.",
      "List 15 phrases someone would search on Instagram to find this post: [describe]. Sort from broad to specific.",
    ],
  },
  {
    title: "Review and improve",
    note: "Paste real numbers. The answers are only as good as the data.",
    prompts: [
      "Here are my last 10 posts with reach, saves, shares and follows: [paste]. Which 2 should I make again, and what do they have in common?",
      "This Reel got [views] views and [watch time] average watch time at [length] seconds long. Give 3 likely reasons people left and one test for each.",
      "Here are 20 comments from my posts: [paste]. What do people keep asking for that I have not made yet?",
      "Compare these two hooks on the same topic and their results: [paste]. What should my next hook copy from the winner?",
      "Write polite replies to these 10 comments that each end with a question, to keep the conversation going: [paste].",
      "Based on this month's results: [paste], write next month's 3 goals as numbers I can check in Instagram Insights.",
    ],
  },
];

export default function FreePrompts() {
  let n = 0;
  return (
    <>
      <div className="container legal-page">
        <span className="eyebrow">FREE · NO SIGN-UP NEEDED</span>
        <h1>30 AI prompts for a month of Instagram content</h1>
        <p className="article-deck">
          Copy a prompt, replace the parts in [brackets], and paste it into
          Claude, ChatGPT or Gemini. They are in the order you would use them:
          know your audience, plan, script, write, review.
        </p>
        {groups.map((g) => (
          <section key={g.title}>
            <h2>{g.title}</h2>
            <p>{g.note}</p>
            <ol className="prompt-list" start={n + 1}>
              {g.prompts.map((p) => {
                n += 1;
                return <li key={p}>{p}</li>;
              })}
            </ol>
          </section>
        ))}
        <h2>Where to go next</h2>
        <p>
          The prompts work better once you know how Instagram decides who sees
          a post. That is what the free{" "}
          <Link href="/courses">Instagram growth course</Link> covers, lesson by
          lesson.
        </p>
      </div>
      <div className="container">
        <Newsletter />
      </div>
    </>
  );
}
