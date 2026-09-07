import { ArrowUpRight } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="brand-mark">RB</span>
        <h2>Advance the question.<br />Strengthen the method.</h2>
        <a href="/contact">Start a conversation <ArrowUpRight size={18} /></a>
      </div>
      <div className="footer-links">
        <div><span>Explore</span><a href="/labs/power-systems">Power Systems Lab</a><a href="/labs/quantum-cyber">Quantum Cyber Lab</a><a href="/research">Publications</a><a href="/courses">Courses</a></div>
        <div><span>Work together</span><a href="/research-with-us">Research mentorship</a><a href="/consulting">Consulting</a><a href="/resources">Open resources</a><a href="/contact">Contact</a></div>
        <div><span>Profile</span><a href="/about">About</a><a href="/insights">Research notes</a><a href="https://drive.google.com/file/d/1Sl3V8dpNnozAG4whzRDWzbhrW_N5uhZK/view" target="_blank" rel="noreferrer">Curriculum vitae</a><a href="/admin">Admin</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Md. Omer Faruque</span><span>AI in Power Systems & Quantum Cyber Intelligence Labs</span></div>
    </footer>
  );
}
