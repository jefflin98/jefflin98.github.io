export default function Footer() {
  return (
    <footer className="w-full py-6 mt-8 bg-neutral-1 text-center text-neutral-3 text-sm">
      © {new Date().getFullYear()} Tzu-Chieh (Jeff) Lin — Seattle, WA · <a href="mailto:tl3097@columbia.edu">tl3097@columbia.edu</a> · <a href="https://www.linkedin.com/in/tl3097" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </footer>
  );
}