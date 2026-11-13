import { useEffect, useRef, useState } from "react";
import "./Reveal.css";

export default function Reveal({ as: Element = "div", delay = 0, className = "", children, ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      {...props}
      ref={elementRef}
      className={`reveal ${className}`.trim()}
      style={{ ...props.style, transitionDelay: `${delay}ms` }}
      data-visible={visible}
    >
      {children}
    </Element>
  );
}
