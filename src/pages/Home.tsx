import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="max-w-4xl mx-auto pt-10 px-10 flex-col justify-center min-h-screen">
      <h1 className="text-5xl md:text-7xl font-bold text-fg mb-6">Jeff Lin</h1>
      <p className="text-lg text-muted mb-4">
        Software Development Engineer · HCI Researcher · Seattle, WA 
      </p>

      <p className="text-lg text-muted mb-8">
        Passionate about building human-centered computing systems.
      </p>
      
      <button
        onClick={() => navigate("/contact")}
        className="inline-block text-accent border border-accent px-6 py-2 rounded-full hover:bg-accent hover:text-bg transition-colors font-semibold"
      >
        Contact Me
      </button>
    </section>
  );
}