import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function useTyping(words: string[]) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(reduceMotion ? words[0] : "");

  useEffect(() => {
    if (reduceMotion) {
      setText(words[0]);
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const current = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(current.slice(0, charIndex));

      let delay = deleting ? 35 : 75;
      if (!deleting && charIndex === current.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }
      timer = window.setTimeout(tick, delay);
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [words, reduceMotion]);

  return text;
}
