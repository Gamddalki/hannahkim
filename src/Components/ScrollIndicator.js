import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  animation: ${bounce} 2s infinite;
  z-index: 10;
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    bottom: 30px;
  }

  span {
    font-size: 1rem;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const ScrollIndicator = memo(({ className = "", ...props }) => {
  return (
    <Indicator className={className} {...props}>
      <span>Scroll for more</span>
      <span>|</span>
    </Indicator>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";

export default ScrollIndicator;
