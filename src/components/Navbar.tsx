import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex justify-center gap-10 py-8 text-lg font-medium">
      {navLinks.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={
            "transition-colors hover:text-accent" +
            (location.pathname === to ? " text-accent" : "")
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}