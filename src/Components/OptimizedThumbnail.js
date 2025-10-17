import React, { memo, useState, useRef, useEffect, useCallback } from "react";
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
    ...props
  }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      if (priority) {
        // Preload critical images
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);

        return () => {
          document.head.removeChild(link);
        };
      }
    }, [src, priority]);

    const handleLoad = useCallback(() => {
      setLoaded(true);
    }, []);

    const handleError = useCallback(() => {
      setLoaded(true);
    }, []);

    return (
      <ThumbnailContainer
        className={className}
        loaded={loaded}
        showOverlay={showOverlay}
        {...props}
      >
        <Placeholder loaded={loaded} />
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={handleLoad}
          onError={handleError}
        />
      </ThumbnailContainer>
    );
  }
);

OptimizedThumbnail.displayName = "OptimizedThumbnail";

export default OptimizedThumbnail;
