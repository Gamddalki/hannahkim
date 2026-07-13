import React, { memo } from "react";
import styled from "styled-components";

const ThumbnailPreview = styled.div`
  position: absolute;
  top: 100%;
  grid-column: 2;
  left: 0;
  transform: translate(-110%, -50%);
  height: 100px;
  width: auto;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
  opacity: 0;

  img {
    height: 100%;
    width: auto;
    display: block;
  }

  @media (max-width: 1200px) {
    grid-column: 2;
    left: 0%;
    transform: translate(0%, -50%);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RowContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 5fr 1fr 3fr;
  align-items: center;
  padding: 3px 20px;

  span {
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.text};
  }

  transition: color 0.2s ease;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:hover {
    ${(props) =>
      props.$clickable &&
      `border-bottom: 2px solid ${props.theme.colors.primary};`}

    .row-preview {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 2.5fr 0.5fr;
    padding: 2px 5px;
    span {
      font-size: 1rem;
    }
  }
`;

const Column = styled.span`
  padding-right: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme.colors.text};
  font-weight: 300;

  &:last-of-type {
    padding-right: 0;
  }

  @media (max-width: 768px) {
    ${(props) => props.$hideOnMobile && "display: none;"}
  }
`;

const ProjectRow = memo(
  ({
    title,
    category,
    keywords,
    clickable = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    thumbnail,
  }) => {
    return (
      <RowContainer
        $clickable={clickable}
        onClick={clickable ? onClick : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Column>{title}</Column>
        <Column>{category}</Column>
        <Column $hideOnMobile>{keywords}</Column>

        {clickable && thumbnail && (
          <ThumbnailPreview className="row-preview">
            <img src={thumbnail} alt={title} />
          </ThumbnailPreview>
        )}
      </RowContainer>
    );
  },
);

ProjectRow.displayName = "ProjectRow";

export default ProjectRow;
