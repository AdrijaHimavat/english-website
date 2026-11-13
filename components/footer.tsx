import Link from "next/link";
import { ArrowUpRight, Instagram, Youtube } from "lucide-react";
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
              <Link href="/free-prompts">
                30 free content prompts <ArrowUpRight size={14} />
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
            <div className="gm-footer-social-column">
              <span className="eyebrow">LET'S STAY CONNECTED</span>
              <a className="gm-social-link" href="https://instagram.com/growmew" target="_blank" rel="noopener noreferrer" aria-label="Visit Grow Me on Instagram">
                <span className="gm-social-icon gm-social-instagram"><Instagram size={19} strokeWidth={1.8}/></span>
                <span className="gm-social-text"><strong>Instagram</strong><small>@growmew</small></span>
                <ArrowUpRight size={16} aria-hidden="true"/>
              </a>
              <a className="gm-social-link" href="https://www.youtube.com/@growmew?sub_confirmation=1" target="_blank" rel="noopener noreferrer" aria-label="Visit Grow Me on YouTube and subscribe">
                <span className="gm-social-icon gm-social-youtube"><Youtube size={20} strokeWidth={1.8}/></span>
                <span className="gm-social-text"><strong>YouTube</strong><small>Grow Me · Subscribe</small></span>
                <ArrowUpRight size={16} aria-hidden="true"/>
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
