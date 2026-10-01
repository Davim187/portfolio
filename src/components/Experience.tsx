import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { education, experiences } from "../data/content";
import { Reveal, SectionHeading, trackSpotlight } from "./motion";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <section className="experience" id="experience">
      <SectionHeading accent="trajetória">Minha</SectionHeading>

      <div className="timeline" ref={timelineRef}>
        <motion.span className="timeline-progress" style={{ scaleY }} aria-hidden="true" />

        {experiences.map((exp, i) => (
          <motion.article
            key={exp.role}
            className={`timeline-item${exp.current ? " current" : ""}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
          >
            <span className="timeline-dot"></span>
            <div className="timeline-card spotlight" onPointerMove={trackSpotlight}>
              <span className="timeline-date">{exp.period}</span>
              <h3>{exp.role}</h3>
              <span className="timeline-company">{exp.company}</span>
              <p>{exp.description}</p>
              {exp.tech && (
                <div className="tech-tags">
                  {exp.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <Reveal className="education">
        {education.map((ed) => (
          <div key={ed.title} className="education-card spotlight" onPointerMove={trackSpotlight}>
            <i className={ed.icon}></i>
            <div>
              <h4>{ed.title}</h4>
              <span>{ed.place}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
