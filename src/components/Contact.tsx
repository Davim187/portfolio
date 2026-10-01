import { profile } from "../data/content";
import { scrollToSection } from "../hooks/scroll";
import { Magnetic, Reveal, SectionHeading } from "./motion";

export function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section className="contact" id="contact">
      <SectionHeading accent="conversar?">Vamos</SectionHeading>

      <Reveal className="contact-content">
        <p>
          Tem um processo manual que poderia rodar sozinho, uma integração para construir ou uma vaga que combina com o
          meu perfil? Me chama — respondo rápido.
        </p>

        <div className="contact-info">
          <Magnetic>
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              Enviar e-mail <i className="bx bxs-send"></i>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.whatsapp} target="_blank" rel="noopener" className="btn btn-ghost">
              WhatsApp <i className="bx bxl-whatsapp"></i>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
              LinkedIn <i className="bx bxl-linkedin"></i>
            </a>
          </Magnetic>
        </div>

        <button type="button" className="copy-email" onClick={onCopyEmail}>
          <i className="bx bx-copy"></i> {profile.email}
        </button>

        <span className="contact-location">
          <i className="bx bx-map"></i> {profile.location} · Remoto ou híbrido
        </span>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Davi Morais. Feito com React, TypeScript e Motion.
      </p>
      <a
        href="#home"
        className="back-to-top"
        aria-label="Voltar ao topo"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
        }}
      >
        <i className="bx bx-up-arrow-alt"></i>
      </a>
    </footer>
  );
}
