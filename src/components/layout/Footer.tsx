import { Link } from "react-router-dom";
import { Code2, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PyChef</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Master Python through competitive programming. Practice, compete,
              and level up your coding skills.
            </p>
          </div>

          {/* Practice */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Practice
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/problems"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=easy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Easy Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=medium"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Medium Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/problems?difficulty=hard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hard Problems
                </Link>
              </li>
            </ul>
          </div>

          {/* Compete */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Compete
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/leaderboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/submissions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Submissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PyChef. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
