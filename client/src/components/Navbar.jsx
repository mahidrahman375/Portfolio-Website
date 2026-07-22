 
import { useState } from "react";
const links = [
{ label: "About", href: "#about" },
{ label: "Skills", href: "#skills" },
{ label: "Projects", href: "#projects" }, { label: "Contact", href: "#contact" },
];
function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
            const closeMenu = () => setMenuOpen(false); 
return (
<header className="site-header">
<nav className="navbar container" aria-label="Main navigation"> <a className="brand" href="#top" onClick={closeMenu}>
Yasin<span>.</span> </a>
<button
className="menu-button"
type="button"
aria-label="Open navigation menu" aria-expanded={menuOpen}
onClick={() => setMenuOpen((current) => !current)}
>
<span />
<span />
        <span />
      </button>
<div className={`nav-links ${menuOpen ? "is-open" : ""}`}> {links.map((link) => (
<a key={link.href} href={link.href} onClick={closeMenu}> {link.label}
</a> ))}
      </div>
    </nav>
</header> ); }
export default Navbar;
   