import React, { memo } from "react";
import styled from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notebook02Icon,
  GithubIcon,
  YoutubeIcon,
  File02Icon,
  SoundcloudIcon,
  FileMusicIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";

const ICON_MAP = {
  devlog: Notebook02Icon,
  github: GithubIcon,
  video: YoutubeIcon,
  demo: YoutubeIcon,
  fullpaper: File02Icon,
  score: FileMusicIcon,
  soundcloud: SoundcloudIcon,
  scenario: File02Icon,
  storyboard: Video01Icon,
};

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  padding: 6px 12px;
  gap: 6px;
  border: 1px solid ${(props) => props.theme.colors.text};
  border-radius: 999px;
  transition: all 0.3s ease;
  font-weight: 350;

  &:hover {
    color: ${(props) => props.$accentColor || props.theme.colors.primary};
    border: 1px solid
      ${(props) => props.$accentColor || props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    gap: 3px;
  }
`;

const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    height: 1.2rem;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const LinkButtons = memo(({ links, accentColor }) => {
  if (!links || !Array.isArray(links) || links.length === 0) return null;

  return (
    <>
      {links.map((link, index) => {
        const Icon = ICON_MAP[link.type];
        return (
          <LinkItem
            key={index}
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
            $accentColor={accentColor}
          >
            {Icon && (
              <LinkIcon>
                <HugeiconsIcon icon={Icon} />
              </LinkIcon>
            )}
            {link.type === "fullpaper" ? "full paper" : link.type}
          </LinkItem>
        );
      })}
    </>
  );
});

LinkButtons.displayName = "LinkButtons";

export default LinkButtons;
