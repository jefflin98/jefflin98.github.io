import { useNavigate } from "react-router-dom";
import MiniGame from "../components/MiniGame";
import { Mail, Linkedin } from "lucide-react"; // or use Heroicons: import { EnvelopeIcon, ... } from '@heroicons/react/24/outline'

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto px-10 flex-col justify-center min-h-screen">
      <MiniGame />
      <h2 className="text-5xl md:text-7xl font-bold text-fg mt-10 mb-10">Jeff Lin</h2>
      <p className="text-lg mb-4">
        Software Engineer · HCI Researcher · Seattle, WA
      </p>

      <p className="text-lg mb-4">
        Passionate about building human-centered computing systems!
      </p>

      <p className="text-lg mb-8">
        Enjoy snowboarding and music writing in my free time!
      </p>
      
      <ul className="flex flex-row justify-center gap-4 mb-4">
        <li>
          <a
            href="mailto:tl3097@columbia.edu"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-accent/20 text-accent hover:text-fg px-4 py-2 rounded-lg transition shadow group"
          >
            <Mail className="w-5 h-5 group-hover:text-accent" />
            <span>Email</span>
            <span className="ml-2 text-sm text-muted group-hover:text-fg">tl3097@columbia.edu</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/tl3097"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-accent/20 text-accent hover:text-fg px-4 py-2 rounded-lg transition shadow group"
          >
            <Linkedin className="w-5 h-5 group-hover:text-accent" />
            <span>LinkedIn</span>
            <span className="ml-2 text-sm text-muted group-hover:text-fg">linkedin.com/in/tl3097</span>
          </a>
        </li>
      </ul>
    </section>
  );
}