import { motion } from "motion/react";
import { skillGroups } from "../data/content";
import { SectionHeading, trackSpotlight } from "./motion";

export function Skills() {
  return (
    <section className="skills" id="skills">
      <SectionHeading accent="stack">Minha</SectionHeading>

      <div className="skills-container">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            className="skill-group spotlight"
            onPointerMove={trackSpotlight}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: gi * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
          >
            <h3 className="skill-group-title">
              <i className={group.icon} aria-hidden="true"></i>
              {group.title}
            </h3>
            <motion.ul
              className="skill-list"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.2 + gi * 0.08 } } }}
            >
              {group.items.map((skill) => (
                <motion.li
                  key={skill.name}
                  className="skill-chip"
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                  whileHover={{ y: -3, scale: 1.05 }}
                >
                  {skill.slug ? (
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}`}
                      alt=""
                      loading="lazy"
                      width={16}
                      height={16}
                      className={skill.invert ? "invert-dark" : undefined}
                      onError={(e) => e.currentTarget.remove()}
                    />
                  ) : (
                    <i className={skill.icon} aria-hidden="true"></i>
                  )}
                  {skill.name}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
