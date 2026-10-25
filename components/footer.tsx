import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              A little learning. A little creating.
              <br />A little more you.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="eyebrow">FIND YOUR NEXT STEP</span>
              <Link href="/articles">
                Explore free articles <ArrowUpRight size={14} />
              </Link>
              <Link href="/articles?category=artificial-intelligence">
                Learn about AI <ArrowUpRight size={14} />
              </Link>
              <Link href="/articles?category=content-creation">
                Create better content <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <span className="eyebrow">A LITTLE ABOUT US</span>
              <Link href="/about">
                Our story <ArrowUpRight size={14} />
              </Link>
              <Link href="/privacy">
                Privacy & your data <ArrowUpRight size={14} />
              </Link>
              <a href="/#newsletter">
                The Grow Me letter <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Grow Me. Made for curious minds.
          </span>
          <span>
            Always free. Always growing. <span className="tiny-leaf">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
