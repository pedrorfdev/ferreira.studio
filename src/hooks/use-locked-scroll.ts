// use-locked-scroll.ts
// Comportamento por step:
// - step 0 (primeiro): trava pra baixo, libera pra cima
// - step 1..N-2 (meio): trava tudo
// - step N-1 (último): trava pra cima, libera pra baixo
import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  steps: number;
  scrollPerStep?: number;
  threshold?: number;
}

interface Result {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  stepIndex: number;
  isLocked: boolean;
}

export function useLockedScroll({
  steps,
  scrollPerStep = 400,
  threshold = 0.6,
}: Options): Result {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);
  const accRef = useRef(0);
  const isLockedRef = useRef(false);
  const enteredRef = useRef(false);

  const [stepIndex, setStepIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // stepIndex via ref para usar dentro de callbacks sem stale closure
  const stepRef = useRef(0);
  function setStep(n: number) {
    stepRef.current = n;
    setStepIndex(n);
  }

  const applyLock = useCallback((locked: boolean) => {
    const el = scrollElRef.current;
    if (!el) return;
    if (locked === isLockedRef.current) return;
    isLockedRef.current = locked;
    setIsLocked(locked);
    el.style.overflow = locked ? "hidden" : "";
  }, []);

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (!isLockedRef.current) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;
      const isFirst = stepRef.current === 0;
      const isLast = stepRef.current === steps - 1;

      // Primeiro item — libera pra cima
      if (isFirst && goingUp) {
        applyLock(false);
        enteredRef.current = false;
        accRef.current = 0;
        return;
      }

      // Último item — libera pra baixo
      if (isLast && goingDown) {
        applyLock(false);
        enteredRef.current = false;
        accRef.current = 0;
        return;
      }

      // Qualquer outro caso — consome o evento
      e.preventDefault();

      if (goingDown) {
        accRef.current += e.deltaY;
        if (accRef.current >= scrollPerStep) {
          accRef.current = 0;
          const next = Math.min(steps - 1, stepRef.current + 1);
          setStep(next);
        }
      } else if (goingUp) {
        accRef.current -= Math.abs(e.deltaY);
        if (accRef.current <= -scrollPerStep) {
          accRef.current = 0;
          const prev = Math.max(0, stepRef.current - 1);
          setStep(prev);
        }
      }
    },
    [steps, scrollPerStep, applyLock],
  );

  const touchStartY = useRef(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      const delta = touchStartY.current - e.touches[0].clientY;
      const goingDown = delta > 0;
      const goingUp = delta < 0;
      const isFirst = stepRef.current === 0;
      const isLast = stepRef.current === steps - 1;

      touchStartY.current = e.touches[0].clientY;

      if (isFirst && goingUp) {
        applyLock(false);
        enteredRef.current = false;
        accRef.current = 0;
        return;
      }
      if (isLast && goingDown) {
        applyLock(false);
        enteredRef.current = false;
        accRef.current = 0;
        return;
      }

      e.preventDefault();
      accRef.current += delta;

      if (accRef.current >= scrollPerStep) {
        accRef.current = 0;
        setStep(Math.min(steps - 1, stepRef.current + 1));
      } else if (accRef.current <= -scrollPerStep) {
        accRef.current = 0;
        setStep(Math.max(0, stepRef.current - 1));
      }
    },
    [steps, scrollPerStep, applyLock],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollEl = sectionRef.current?.closest(
        "[data-scroll-container]",
      ) as HTMLElement | null;
      if (!scrollEl) return;
      scrollElRef.current = scrollEl;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !enteredRef.current) {
            enteredRef.current = true;
            accRef.current = 0;
            setStep(0);
            applyLock(true);
          } else if (!entry.isIntersecting) {
            enteredRef.current = false;
            applyLock(false);
          }
        },
        { root: scrollEl, threshold },
      );

      if (sectionRef.current) obs.observe(sectionRef.current);

      scrollEl.addEventListener("wheel", onWheel, { passive: false });
      scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
      scrollEl.addEventListener("touchmove", onTouchMove, { passive: false });

      return () => {
        obs.disconnect();
        applyLock(false);
        scrollEl.removeEventListener("wheel", onWheel);
        scrollEl.removeEventListener("touchstart", onTouchStart);
        scrollEl.removeEventListener("touchmove", onTouchMove);
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [applyLock, onWheel, onTouchStart, onTouchMove, threshold]);

  return { sectionRef, stepIndex, isLocked };
}
