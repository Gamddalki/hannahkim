import React from "react";
import styled from "styled-components";

const Icon = styled.a`
  color: ${(props) =>
    props.theme.colors[props.$iconColor] || props.theme.colors.black};
  font-size: 1.5rem;
  transition: color 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IconLink = ({ href, children, iconColor, ...props }) => {
  return (
    <Icon
      href={href}
      $iconColor={iconColor}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </Icon>
  );
};

export default IconLink;
