import React, { memo, useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.theme.colors.background};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
    opacity: ${(props) => (props.loaded ? 1 : 0)};
    will-change: opacity;
    transform: translateZ(0); /* Activate GPU acceleration */
  }

  ${(props) =>
    props.showOverlay !== false &&
    `
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  `}
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: ${(props) => (props.loaded ? 0 : 1)};
  transition: opacity 0.15s ease;
`;

const OptimizedThumbnail = memo(
  ({
    src,
    alt,
    className = "",
    priority = false,
    showOverlay = true,
    useFilter = false,
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const imgRef = useRef(null);

    // 필터된 이미지 URL 생성
    const getFilteredSrc = (originalSrc) => {
      if (!useFilter) return originalSrc;

      const lastDotIndex = originalSrc.lastIndexOf(".");
      if (lastDotIndex === -1) return originalSrc;

      const nameWithoutExt = originalSrc.substring(0, lastDotIndex);
      const extension = originalSrc.substring(lastDotIndex);

      return `${nameWithoutExt}_filtered${extension}`;
    };

    const filteredSrc = getFilteredSrc(src);

    useEffect(() => {
      if (priority) {
        // Preload critical images (both original and filtered)
        const preloadImage = (imageSrc) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = imageSrc;
          document.head.appendChild(link);
          return link;
        };

        const originalLink = preloadImage(src);
        const filteredLink = useFilter ? preloadImage(filteredSrc) : null;

        return () => {
          document.head.removeChild(originalLink);
          if (filteredLink) {
            document.head.removeChild(filteredLink);
          }
        };
      }
    }, [src, filteredSrc, priority, useFilter]);

    const handleLoad = () => {
      setLoaded(true);
    };

    const handleError = () => {
      setLoaded(true);
    };

    const handleMouseEnter = () => {
      if (useFilter) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      if (useFilter) {
        setIsHovered(false);
      }
    };

    return (
      <ThumbnailContainer
        className={className}
        loaded={loaded}
        showOverlay={showOverlay}
        useFilter={useFilter}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <Placeholder loaded={loaded} />
        <img
          ref={imgRef}
          src={isHovered && useFilter ? filteredSrc : src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </ThumbnailContainer>
    );
  }
);

OptimizedThumbnail.displayName = "OptimizedThumbnail";

export default OptimizedThumbnail;
