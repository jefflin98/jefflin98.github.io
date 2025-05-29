import { Mail, Linkedin } from "lucide-react"; // or use Heroicons: import { EnvelopeIcon, ... } from '@heroicons/react/24/outline'

export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto pt-10 px-4 flex-col justify-center min-h-screen">
      <p className="mb-8 text-muted text-lg">
        Feel free to reach out! I'm always open to new opportunities, collaborations, or just a friendly chat.
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