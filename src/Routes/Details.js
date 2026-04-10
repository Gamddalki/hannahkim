import React, { useEffect, useMemo, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import projectData from "../data/projects.json";
import publicationData from "../data/publications.json";
import artsData from "../data/arts.json";
import ReactMarkdown from "react-markdown";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import LinkButtons from "../Components/LinkButtons";
import RelatedProjects from "../Components/RelatedProjects";
import OptimizedThumbnail from "../Components/OptimizedThumbnail";

const DATA_MAP = {
  projects: projectData,
  publications: publicationData,
  arts: artsData,
};

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 70px 70px 70px;
  box-sizing: border-box;
  position: relative;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 768px) {
    padding: 0px 30px 30px 30px;
  }
`;

const InformationSection = styled(Section)`
  box-sizing: border-box;
  padding-top: 200px;
  background-color: ${(props) => props.theme.colors.background};
  align-items: flex-start;

  @media (max-width: 768px) {
    padding-top: 140px;
    padding-bottom: 40px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  margin: 0 auto 30px auto;
  overflow: hidden;
  aspect-ratio: 16/9;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const KeyInsightsSection = styled(Section)`
  align-items: flex-start;
  padding-top: 10px;
`;

const InsightContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const InsightImageContainer = styled.div`
  flex: 0 0 500px;
  max-width: 500px;

  @media (max-width: 1024px) {
    flex: 1;
    width: 100%;
  }
`;

const InsightTextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;

const MotivationSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 1.7rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const ApproachSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 1.7rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const OutcomesSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 1.7rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const ReflectionSection = styled(Section)`
  align-items: flex-start;
  padding-bottom: 40px;

  h2 {
    font-size: 1.7rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;

const RelatedProjectsSection = styled(Section)`
  align-items: flex-start;
  padding-top: 70px;
  padding-bottom: 150px;

  @media (max-width: 768px) {
    padding-bottom: 150px;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: none;
  padding: 8px 0;
  margin-top: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 350;
  width: fit-content;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 5px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 3;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin: 0 0 20px 0;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 0 6px 0;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 20px auto;
  width: 100%;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  @media (max-width: 768px) {
    gap: 5px;
    align-items: flex-end;
  }
`;

const Where = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  opacity: 0.7;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Date = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  text-align: right;
  opacity: 0.7;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    text-align: left;
  }
`;

const InfoGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(10px, 5vw, 100px);
  justify-items: stretch;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }
`;

const InfoBlock = styled.div`
  text-align: left;

  h4 {
    margin: 0 0 10px 0;
    font-size: 1rem;
    font-weight: 600;
    opacity: 0.7;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 5px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 8px;
    font-size: 1rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-weight: 350;
    opacity: 0.7;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const InsightImage = styled(OptimizedThumbnail)`
  max-width: 500px;
  width: 100%;
  height: auto;
  margin: 20px 0;
  display: block;
`;

const InsightTitle = styled.h1`
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  font-size: 2.2rem;
  line-height: 1;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2.3rem;
  }

  strong {
    color: ${(props) => props.accentColor || props.theme.colors.primary};
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`;

const StyledParagraph = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text};

  font-size: 1rem;
  line-height: 1.5rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-line;
  margin-bottom: 10px;
  font-weight: 350;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  strong {
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
  }
`;

const InsightText = styled(StyledParagraph)`
  margin-top: 20px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const OverviewImage = styled(OptimizedThumbnail)`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  display: block;
`;

const OutcomesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const OutcomesList = styled.div`
  flex: 1;
  min-width: 0;
`;

const OutcomeItem = styled.div`
  display: flex;
  align-items: flex-start;
`;

const OutcomeBullet = styled.span`
  margin-right: 10px;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.2rem;
`;

const OutcomeContent = styled.div`
  flex: 1;
`;

const PDFSection = styled.div`
  flex: 1;
  width: 100%;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 50vh;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 50vw;
    height: 30vh;
    margin: 0 auto 20px auto;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto 10px auto;
  }
`;

const VideoSection = styled.div`
  flex: 1;
  width: 100%;
`;

const VideoViewer = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin: 0 auto 20px auto;
  }
  @media (max-width: 768px) {
    margin: 0 auto 10px auto;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: flex-start;
`;

const Details = memo(() => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const data = useMemo(() => {
    return DATA_MAP[category] || null;
  }, [category]);

  const item = useMemo(() => {
    return data ? data.find((i) => i.id.toString() === id) : null;
  }, [data, id]);

  const accentColor = item?.accentColor;

  // ReactMarkdown 컴포넌트를 메모이제이션
  const markdownComponents = useMemo(
    () => ({
      p: (props) => <StyledParagraph {...props} accentColor={accentColor} />,
    }),
    [accentColor],
  );

  const renderMarkdownWithParagraph = useCallback(
    (content) => (
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    ),
    [markdownComponents],
  );

  const renderInfoList = useCallback(
    (title, list) => (
      <InfoBlock>
        <h4>{title}</h4>
        <ul>
          {(list || []).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </InfoBlock>
    ),
    [],
  );

  // ReactMarkdown 컴포넌트들을 메모이제이션
  const insightTitleComponents = useMemo(
    () => ({
      h1: (props) => <InsightTitle {...props} accentColor={accentColor} />,
    }),
    [accentColor],
  );

  const insightTextComponents = useMemo(
    () => ({
      p: (props) => <InsightText {...props} accentColor={accentColor} />,
    }),
    [accentColor],
  );

  const fallbackMarkdownComponents = useMemo(
    () => ({
      p: StyledParagraph,
    }),
    [],
  );

  // keyInsights를 메모이제이션으로 최적화
  const processedKeyInsights = useMemo(() => {
    if (!Array.isArray(item.keyInsights))
      return { title: null, image: null, text: null };

    const result = { title: null, image: null, text: null };
    item.keyInsights.forEach((insight) => {
      if (insight.type === "title") result.title = insight.value;
      else if (insight.type === "image") result.image = insight.value;
      else if (insight.type === "text") result.text = insight.value;
    });
    return result;
  }, [item.keyInsights]);

  const renderSectionContent = useCallback(
    (content, altText) => {
      if (Array.isArray(content)) {
        return content.map((item, index) => {
          if (typeof item === "string") {
            return <div key={index}>{renderMarkdownWithParagraph(item)}</div>;
          } else if (item.type === "text") {
            return (
              <div key={index}>{renderMarkdownWithParagraph(item.value)}</div>
            );
          } else if (item.type === "image") {
            return (
              <OverviewImage
                key={index}
                src={item.value}
                alt={altText}
                showOverlay={false}
              />
            );
          }
          return null;
        });
      }
      return renderMarkdownWithParagraph(content);
    },
    [renderMarkdownWithParagraph],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, id]);

  if (!item) {
    return (
      <Section>
        <ContentWrapper>Can't find the details.</ContentWrapper>
      </Section>
    );
  }

  return (
    <div>
      <InformationSection>
        <ContentWrapper>
          <ThumbnailContainer>
            <OptimizedThumbnail
              src={item.bignail}
              alt={item.title}
              priority={true}
              showOverlay={false}
            />
          </ThumbnailContainer>

          <MetaInfo>
            <Where>{item.where}</Where>
            <Date>
              {item.date
                ? `${item.date}`
                : `${item.startDate} ~ ${item.endDate}`}
            </Date>
          </MetaInfo>

          <Title>{item.title}</Title>

          <InfoGrid>
            {category === "publications"
              ? renderInfoList("Index Terms", item.indexTerms)
              : renderInfoList("Category", item.category)}
            {renderInfoList("Roles", item.myRole)}
            {item.tools
              ? renderInfoList("Tools", item.tools)
              : renderInfoList("Framework", item.framework)}
            {category === "publications"
              ? renderInfoList("Authors", item.authors)
              : renderInfoList("Credits", item.credits)}
          </InfoGrid>
        </ContentWrapper>
      </InformationSection>

      <KeyInsightsSection className="keyinsights-section">
        <ContentWrapper>
          {Array.isArray(item.keyInsights) ? (
            <>
              {processedKeyInsights.title && (
                <div>
                  <ReactMarkdown components={insightTitleComponents}>
                    {processedKeyInsights.title}
                  </ReactMarkdown>
                </div>
              )}

              {processedKeyInsights.image && (
                <InsightContainer>
                  <InsightImageContainer>
                    <InsightImage
                      src={processedKeyInsights.image}
                      alt="Key insight"
                      showOverlay={false}
                    />
                  </InsightImageContainer>
                  {processedKeyInsights.text && (
                    <InsightTextContainer>
                      <ReactMarkdown components={insightTextComponents}>
                        {processedKeyInsights.text}
                      </ReactMarkdown>
                    </InsightTextContainer>
                  )}
                </InsightContainer>
              )}
            </>
          ) : (
            <ReactMarkdown components={fallbackMarkdownComponents}>
              {item.keyInsights}
            </ReactMarkdown>
          )}
        </ContentWrapper>
      </KeyInsightsSection>

      {item.overview && (
        <MotivationSection className="overview-section">
          <ContentWrapper>
            <h2>Overview</h2>
            {renderSectionContent(item.overview, "Overview image")}
          </ContentWrapper>
        </MotivationSection>
      )}

      {(item.motivation || item.abstract) && (
        <MotivationSection className="motivation-section">
          <ContentWrapper>
            <h2>{category === "publications" ? "Abstract" : "Motivation"}</h2>
            {renderSectionContent(
              item.motivation || item.abstract,
              category === "publications"
                ? "Abstract image"
                : "Motivation image",
            )}
          </ContentWrapper>
        </MotivationSection>
      )}

      {item.approach && (
        <ApproachSection className="approach-section">
          <ContentWrapper>
            <h2>Approach</h2>
            {renderSectionContent(item.approach, "Approach image")}
          </ContentWrapper>
        </ApproachSection>
      )}

      {((item.outcomes &&
        Array.isArray(item.outcomes) &&
        item.outcomes.length > 0) ||
        (item.contributions && Array.isArray(item.contributions)) ||
        item.presentation ||
        item.video ||
        (item.links && Array.isArray(item.links) && item.links.length > 0)) && (
        <OutcomesSection className="outcomes-section">
          <ContentWrapper>
            <h2>
              {category === "publications" ? "Contributions" : "Outcomes"}
            </h2>

            <OutcomesContainer>
              {item.presentation && (
                <PDFSection>
                  <PDFViewer
                    src={`${item.presentation}`}
                    title="PDF Document"
                  />
                </PDFSection>
              )}

              {item.video && (
                <VideoSection>
                  <VideoViewer
                    src={`${item.video}?autoplay=1&mute=1`}
                    title="Video"
                    frameBorder="0"
                    allow="muted; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </VideoSection>
              )}

              {((item.outcomes &&
                Array.isArray(item.outcomes) &&
                item.outcomes.length > 0) ||
                (item.contributions && Array.isArray(item.contributions))) && (
                <OutcomesList>
                  {item.links &&
                    Array.isArray(item.links) &&
                    item.links.length > 0 && (
                      <LinkSection>
                        <LinkButtons
                          links={item.links}
                          accentColor={item?.accentColor}
                        />
                      </LinkSection>
                    )}

                  {(category === "publications"
                    ? item.contributions
                    : item.outcomes
                  )?.map((content, index) => (
                    <OutcomeItem key={index}>
                      <OutcomeBullet>•</OutcomeBullet>
                      <OutcomeContent>
                        {renderMarkdownWithParagraph(content)}
                      </OutcomeContent>
                    </OutcomeItem>
                  ))}
                </OutcomesList>
              )}
            </OutcomesContainer>
          </ContentWrapper>
        </OutcomesSection>
      )}

      {item.reflection && (
        <ReflectionSection className="reflection-section">
          <ContentWrapper>
            <h2>Reflection</h2>
            {renderMarkdownWithParagraph(item.reflection)}
          </ContentWrapper>
        </ReflectionSection>
      )}

      <RelatedProjectsSection>
        <ContentWrapper>
          <RelatedProjects
            currentItem={item}
            allData={data}
            category={category}
            maxItems={3}
          />
          <BackButton onClick={() => navigate(-1)}>
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Back
          </BackButton>
        </ContentWrapper>
      </RelatedProjectsSection>
    </div>
  );
});

Details.displayName = "Details";

export default Details;
