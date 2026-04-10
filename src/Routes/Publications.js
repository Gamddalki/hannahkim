import React, { useState, useCallback, memo } from "react";
import styled from "styled-components";
import publicationData from "../data/publications.json";
import PageContainer from "../Components/PageContainer";
import LinkButtons from "../Components/LinkButtons";

const PAGE_TITLE = "PUBLICATIONS";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const PublicationItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.footerText};
  padding: 2rem 0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemHeader = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    h3 {
      color: ${({ theme }) => theme.colors.primary};
    }
    span {
      opacity: 1;
    }
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme, $isExpanded }) =>
    $isExpanded ? theme.colors.primary : theme.colors.text};
  margin: 0;
  transition: color 0.3s ease;

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const MetaText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.subText};
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0.7)};
  margin: 0;
  transition: opacity 0.3s ease;
`;

// --- Accordion Animations ---

const AccordionWrapper = styled.div`
  display: grid;
  grid-template-rows: ${({ $isExpanded }) => ($isExpanded ? "1fr" : "0fr")};
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const AccordionInner = styled.div`
  overflow: hidden;
  min-height: 0;
`;

const ExpandedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 1.5rem;

  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  transition: opacity 0.3s ease-out;
  transition-delay: ${({ $isExpanded }) => ($isExpanded ? "0.15s" : "0s")};
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ $count }) => `repeat(${$count}, 1fr)`};
  gap: 1rem;
  width: 100%;
  align-items: start;
`;

const PublicationImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: ${({ $isSingle }) => ($isSingle ? "300px" : "auto")};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5rem;
`;

const Abstract = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0;
`;

const LinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
`;

const Publications = memo(() => {
  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  }, []);

  return (
    <PageContainer title={PAGE_TITLE}>
      <ListContainer>
        {publicationData.map((pub) => {
          const isExpanded = expandedId === pub.id;

          return (
            <PublicationItem key={pub.id}>
              <ItemHeader onClick={() => handleToggle(pub.id)}>
                <Title $isExpanded={isExpanded}>{pub.title}</Title>
                <MetaText $isExpanded={isExpanded}>{pub.authors}</MetaText>
                <MetaText $isExpanded={isExpanded}>{pub.where}</MetaText>
              </ItemHeader>

              <AccordionWrapper $isExpanded={isExpanded}>
                <AccordionInner>
                  <ExpandedContent $isExpanded={isExpanded}>
                    {pub.images &&
                      Array.isArray(pub.images) &&
                      pub.images.length > 0 && (
                        <ImageGrid $count={pub.images.length}>
                          {pub.images.map((imgSrc, index) => (
                            <PublicationImage
                              key={index}
                              src={imgSrc}
                              alt={`${pub.title} - image ${index + 1}`}
                              $isSingle={pub.images.length === 1}
                            />
                          ))}
                        </ImageGrid>
                      )}

                    <Details>
                      <Abstract>{pub.abstract}</Abstract>
                      {pub.links &&
                        Array.isArray(pub.links) &&
                        pub.links.length > 0 && (
                          <LinkSection>
                            <LinkButtons
                              links={pub.links}
                              accentColor={pub?.accentColor}
                            />
                          </LinkSection>
                        )}
                    </Details>
                  </ExpandedContent>
                </AccordionInner>
              </AccordionWrapper>
            </PublicationItem>
          );
        })}
      </ListContainer>
    </PageContainer>
  );
});

Publications.displayName = "Publications";

export default Publications;
