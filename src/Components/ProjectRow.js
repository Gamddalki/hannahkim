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
  grid-template-columns: ${(props) =>
    props.$isNews ? "2fr 8fr" : "5fr 1fr 3fr"};
  align-items: ${(props) => (props.$isNews ? "start" : "center")};
  padding: 0px 20px;

  span {
    font-size: ${(props) => (props.$isNews ? "1rem" : "1.2rem")};
    color: ${(props) => props.theme.colors.text};

    @media (max-width: 768px) {
      font-size: ${(props) => (props.$isNews ? "0.9rem" : "1rem")};
    }
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
    grid-template-columns: ${(props) => {
      if (props.$isNews) return "2.5fr 7.5fr";
      if (props.$isArchive) return "1fr 120px";
      return "2.5fr 0.5fr";
    }};
    gap: ${(props) => (props.$isArchive || props.$isNews ? "15px" : "0")};
    padding: ${(props) => (props.$isArchive ? "0 5px" : "2px 5px")};
    align-items: ${(props) =>
      props.$isArchive || props.$isNews ? "flex-start" : "center"};
  }
`;

const Column = styled.span`
  padding-right: 15px;
  color: ${(props) => props.theme.colors.text};
  font-weight: 300;

  ${(props) =>
    props.$wrap
      ? `
        white-space: normal;
        word-break: keep-all;
      `
      : `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      `}

  &:last-of-type {
    padding-right: 0;
  }

  @media (max-width: 768px) {
    ${(props) => props.$hideOnMobile && "display: none;"}
const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.black};
  text-decoration: none;
  font-weight: 400;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }
`;

const IconImage = styled.img`
  height: 1.5rem;
  width: auto;
  display: inline-block;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 1.2rem;
    margin-top: 2px;
  }
`;

const TitleWithIcon = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;

  .title-text {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
  }

  @media (max-width: 768px) {
    gap: 6px;
    .title-text {
      font-size: 0.9rem;
    }
  }
`;

const ProjectRow = memo(
  ({
    title,
    category,
    keywords,
    year,
    icon,
    isNews = false,
    isArchive = false,
    clickable = false,
    onClick,
    onMouseEnter,
    onMouseLeave,
    thumbnail,
    link,
  }) => {
    const renderTitle = (text, href) => {
      if (href && text.includes("@")) {
        const parts = text.split("@");
        const before = parts[0];
        const after = parts.slice(1).join("@");
        return (
          <>
            {before}@{" "}
            <StyledLink
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {after.trim()}
            </StyledLink>
          </>
        );
      }
      return text;
    };

    return (
      <RowContainer
        $clickable={clickable}
        $isNews={isNews}
        $isArchive={isArchive}
        onClick={clickable ? onClick : undefined}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isNews ? (
          <>
            <Column $wrap>{year}</Column>
            <Column $wrap style={{ paddingRight: 0 }}>
              <TitleWithIcon>
                {icon && <IconImage src={icon} alt={category} />}
                <span className="title-text">{renderTitle(title, link)}</span>
              </TitleWithIcon>
            </Column>
          </>
        ) : (
          <>
            <LeftContent
              className="archive-left-content"
              $isArchive={isArchive}
            >
              <Column className="archive-title">{title}</Column>
              <MetaWrapper>
                <Column className="archive-category">
                  {icon && <IconImage src={icon} alt={category} />}
                </Column>
                <Column className="archive-keywords">{keywords}</Column>
              </MetaWrapper>
            </LeftContent>

            {clickable && thumbnail && (
              <ThumbnailPreview className="row-preview">
                <img src={thumbnail} alt={title} />
              </ThumbnailPreview>
            )}

            {isArchive && thumbnail && (
              <MobileThumbnail className="row-mobile-thumbnail">
                <img src={thumbnail} alt={title} />
              </MobileThumbnail>
            )}
          </>
        )}
      </RowContainer>
    );
  },
);

ProjectRow.displayName = "ProjectRow";

export default ProjectRow;
