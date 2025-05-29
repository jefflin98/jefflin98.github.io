import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
];

export default function Header() {
  return (
    <header className="w-full bg-neutral-1/90 backdrop-blur sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-xl font-bold tracking-tight text-white">
          Jeff Lin
        </Link>
        <ul className="flex space-x-6">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-neutral-3 hover:text-white transition ${
                    isActive ? "underline text-white" : ""
                  }`
                }
                end
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}