import React, { memo } from "react";
import styled from "styled-components";

const LinkItem = styled.a`
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.subText};
  text-decoration: none;
s  transition: color 0.2s ease;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const LinkButtons = memo(({ links, accentColor }) => {
  if (!links || !Array.isArray(links) || links.length === 0) return null;

  return (
    <>
      {links.map((link, index) => {
        return (
          <LinkItem
            key={index}
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.type}
          </LinkItem>
        );
      })}
    </>
  );
});

LinkButtons.displayName = "LinkButtons";

export default LinkButtons;
