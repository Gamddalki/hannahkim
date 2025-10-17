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
  const [isInMoreHover, setIsInMoreHover] = useState(false);
  const [isInNoHover, setIsInNoHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile device and activate custom cursor only on desktop
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

    const handleMouseOver = (e) => {
      const isInMore = e.target.closest("[data-more-hover]");
      const isInNo = e.target.closest("[data-no-hover]");

      setIsInMoreHover(!!isInMore);
      setIsInNoHover(!!isInNo);
    };

    const handleMouseOut = () => {
      setIsInMoreHover(false);
      setIsInNoHover(false);
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

  // Only show custom cursor in data-more-hover areas
  if (isMobile || !isVisible || !isInMoreHover) return null;

  // Determine cursor size and text
  const getCursorSize = () => {
    if (isInNoHover) return "15px"; // Small circle for data-no-hover within data-more-hover
    return "65px"; // Large circle for data-more-hover
  };

  const shouldShowText = () => {
    return !isInNoHover; // Show "MORE" text only when not in data-no-hover
  };

  return (
    <Cursor
      style={{
        left: position.x,
        top: position.y,
        width: getCursorSize(),
        height: getCursorSize(),
      }}
    >
      {shouldShowText() && <CursorText>MORE</CursorText>}
    </Cursor>
  );
};

export default CustomCursor;
