import React, { useState, useEffect } from 'react';
import { useRef } from 'react';

type TextTypingProps = {
  text: string;
  speed?: number;
  className?: string;
};

export default function TextTyping({
  text,
  speed = 100,
  className,
}: TextTypingProps) {
  const [displayText, setDisplayText] = useState(text[0]);
  const index = useRef(0);

  useEffect(() => {
    function tick() {
      index.current++;
      setDisplayText((prev) => prev + text[index.current]);
    }
    if (index.current < text.length - 1) {
      const timer = setInterval(tick, speed);
      return () => clearInterval(timer);
    }
  }, [displayText, speed, text]);

  return <span className={className}>{displayText}</span>;
}
