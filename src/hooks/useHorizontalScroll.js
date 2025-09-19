import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 브레이크포인트 상수로 분리
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
};

const CARD_WIDTHS = {
  mobile: 350,
  tablet: 560,
  desktop: 640,
  large: 900,
};

const GAPS = {
  mobile: 24,
  tablet: 32,
  desktop: 48,
};

const getCardWidth = () => {
  const width = window.innerWidth;
  if (width <= BREAKPOINTS.mobile) return CARD_WIDTHS.mobile;
  if (width <= BREAKPOINTS.tablet) return CARD_WIDTHS.tablet;
  if (width <= BREAKPOINTS.desktop) return CARD_WIDTHS.desktop;
  return CARD_WIDTHS.large;
};

const getGap = () => {
  const width = window.innerWidth;
  if (width <= BREAKPOINTS.tablet) return GAPS.mobile;
  if (width <= BREAKPOINTS.desktop) return GAPS.tablet;
  return GAPS.desktop;
};

export const useHorizontalScroll = (selectedWorks) => {
  const selectedWorksRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const calculateDimensions = useCallback(() => {
    const cardWidth = getCardWidth();
    const gap = getGap();
    return {
      cardWidth,
      gap,
      totalWidth:
        selectedWorks.length * cardWidth + (selectedWorks.length - 1) * gap,
    };
  }, [selectedWorks.length]);

  const handleResize = useCallback(() => {
    const { totalWidth } = calculateDimensions();
    gsap.set(projectsContainerRef.current, { width: totalWidth });
  }, [calculateDimensions]);

  useEffect(() => {
    if (!selectedWorksRef.current || !projectsContainerRef.current) return;

    const container = selectedWorksRef.current;
    const projectsContainer = projectsContainerRef.current;
    const { totalWidth } = calculateDimensions();

    gsap.set(projectsContainer, { x: 0, width: totalWidth });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const { cardWidth, gap } = calculateDimensions();
        const currentTotalWidth =
          selectedWorks.length * cardWidth + (selectedWorks.length - 1) * gap;
        const maxScroll = currentTotalWidth - window.innerWidth;
        const x = -maxScroll * progress;

        gsap.set(projectsContainer, { x, ease: "power2.out" });
      },
    });

    // 디바운스된 리사이즈 핸들러
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize();
        scrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(resizeTimeout);
      scrollTrigger.kill();
      window.removeEventListener("resize", debouncedResize);
    };
  }, [selectedWorks.length, calculateDimensions, handleResize]);

  return {
    selectedWorksRef,
    projectsContainerRef,
  };
};
