import { useEffect, memo, useCallback } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = memo(() => {
  const { pathname } = useLocation();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;
