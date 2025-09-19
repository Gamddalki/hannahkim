import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    if (!selectedWorksRef.current || !projectsContainerRef.current) return;

    const container = selectedWorksRef.current;
    const projectsContainer = projectsContainerRef.current;
    const { totalWidth } = calculateDimensions();

    gsap.set(projectsContainer, { x: 0, width: totalWidth });

    // 성능 최적화: 변수들을 미리 계산
    const maxScroll = totalWidth - window.innerWidth;
    let lastProgress = -1;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom top",
      scrub: 1, // 더 빠른 스크럽으로 성능 향상
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;

        // 성능 최적화: progress가 크게 변하지 않으면 스킵
        if (Math.abs(progress - lastProgress) < 0.01) return;
        lastProgress = progress;

        const x = -maxScroll * progress;

        // 성능 최적화: gsap.set 대신 직접 transform 사용
        projectsContainer.style.transform = `translateX(${x}px)`;
      },
    });

    // 디바운스된 리사이즈 핸들러 (더 긴 디바운스)
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const { totalWidth: newTotalWidth } = calculateDimensions();
        gsap.set(projectsContainer, { width: newTotalWidth });
        scrollTrigger.refresh();
      }, 150); // 더 긴 디바운스로 성능 향상
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(resizeTimeout);
      scrollTrigger.kill();
      window.removeEventListener("resize", debouncedResize);
    };
  }, [selectedWorks.length, calculateDimensions]);

  return {
    selectedWorksRef,
    projectsContainerRef,
  };
};
