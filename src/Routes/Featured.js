import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FeaturedContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const MagazineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border};
  gap: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MagazineCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  padding: 30px;
  border-right: 1px solid ${(props) => props.theme.colors.border};
  box-sizing: border-box;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    &:last-child {
      border-bottom: none;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.subText};
`;

const CardDate = styled.span`
  text-transform: uppercase;
  font-size: 0.7rem;
  line-height: 1.2rem;
  color: ${(props) => props.theme.colors.subText};
`;

const CardPill = styled.span`
  color: ${(props) => props.theme.colors.subText};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.6rem;
  line-height: 1.2rem;
  text-transform: uppercase;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 0.2s ease;

    ${MagazineCard}:hover & {
      filter: grayscale(0%);
    }

    @media (max-width: 768px) {
      filter: none;
    }
  }
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  margin: 0 0 12px 0;
  color: ${(props) => props.theme.colors.black};
  transition: color 0.2s ease;

  ${MagazineCard}:hover & {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CardDescription = styled.span`
  color: ${(props) => props.theme.colors.text};
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.span`
  margin-top: auto;
  padding-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: ${(props) => props.theme.colors.hashText};
`;

const Featured = memo(({ items }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/${item.id}`);
  };

  return (
    <FeaturedContainer>
      <MagazineGrid>
        {items.map((item) => {
          const displayDate = item.date ? item.date.split(" - ")[0] : "";
          const pillText = item.category || "Works";

          return (
            <MagazineCard key={item.id} onClick={() => handleCardClick(item)}>
              <CardHeader>
                <CardDate>{displayDate}</CardDate>
                <CardPill>{pillText}</CardPill>
              </CardHeader>
              <ImageWrapper>
                <img src={item.thumbnail} alt={item.title} />
              </ImageWrapper>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.subtitle}</CardDescription>
              <CardFooter>
                {item.keywords ? item.keywords.join(" • ") : ""}
              </CardFooter>
            </MagazineCard>
          );
        })}
      </MagazineGrid>
    </FeaturedContainer>
  );
});

Featured.displayName = "Featured";

export default Featured;
