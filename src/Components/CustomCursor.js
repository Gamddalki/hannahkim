import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Cursor = styled.div`
  position: fixed;
  width: 10px;
  height: 10px;
  background: #ff2020;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.15s ease, height 0.15s ease;
  opacity: 0.7;
  mix-blend-mode: difference;
  z-index: 9999;
  will-change: transform, width, height;
`;

const CursorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 11px;
  font-weight: 700;
  font-family: "PlusJakartaSans", -apple-system, sans-serif;
  opacity: 1;
  pointer-events: none;
  letter-spacing: 0.5px;
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // check mobile device and activate custom cursor only on desktop
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileDevice);
    };

    checkMobile();

    if (isMobile) {
      return;
    }

    const updateCursorPosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const shouldShowMore = (target) => {
      // if data-no-hover is present, do not show MORE
      if (target.closest("[data-no-hover]")) {
        return false;
      }

      // if data-more-hover is present, show MORE
      if (target.closest("[data-more-hover]")) {
        return true;
      }

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer" ||
        target.closest('[style*="cursor: pointer"]') ||
        target.onclick ||
        target.closest("[onclick]") ||
        target.getAttribute("role") === "button" ||
        target.closest('[role="button"]') ||
        target.classList.contains("clickable") ||
        target.classList.contains("hoverable");

      return isClickable;
    };

    const handleMouseOver = (e) => {
      const shouldShow = shouldShowMore(e.target);
      setIsHovering(shouldShow);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  // if mobile, do not render anything
  if (isMobile || !isVisible) return null;

  return (
    <Cursor
      style={{
        left: position.x,
        top: position.y,
        width: isHovering ? "65px" : "15px",
        height: isHovering ? "65px" : "15px",
      }}
    >
      {isHovering && <CursorText>MORE</CursorText>}
    </Cursor>
  );
};

export default CustomCursor;
