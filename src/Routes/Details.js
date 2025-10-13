import React, { useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "../data/projects.json";
import publicationData from "../data/publications.json";
import artsData from "../data/arts.json";
import ReactMarkdown from "react-markdown";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notebook02Icon,
  GithubIcon,
  YoutubeIcon,
  File02Icon,
  SoundcloudIcon,
  FileMusicIcon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import RelatedProjects from "../Components/RelatedProjects";

gsap.registerPlugin(ScrollTrigger);

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
  max-width: 800px;
  height: 35vh;
  margin: 0 auto 30px auto;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    height: 20vh;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 16/9;
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
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
`;

const ApproachSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
`;

const OutcomesSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }
`;

const ReflectionSection = styled(Section)`
  align-items: flex-start;
  padding-bottom: 70px;

  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 10px;
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
  font-weight: 500;
  width: fit-content;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 3;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 8px 0;
  color: ${(props) => props.theme.colors.text};
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 0 6px 0;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 30px 0;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 0 0 20px 0;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 20px auto;
  max-width: 800px;
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
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  opacity: 0.7;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Date = styled.div`
  font-size: 0.9rem;
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
  max-width: 800px;
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
    font-size: 1.1rem;
    font-weight: 600;

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
    font-size: 0.9rem;
    word-wrap: break-word;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const InsightImage = styled.img`
  max-width: 500px;
  width: 100%;
  height: auto;
  margin: 20px 0;
  display: block;
`;

const InsightTitle = styled.h1`
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  font-size: 4rem;
  line-height: 1;
  white-space: pre-line;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }
  @media (max-width: 768px) {
    font-size: 2rem;
    line-height: 2.3rem;
  }

  strong {
    color: ${(props) => props.theme.colors.text};
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    position: relative;
  }
`;

const StyledParagraph = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text};

  font-size: 1rem;
  line-height: 1.6rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-line;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  strong {
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
    position: relative;
    display: inline;
    padding: 0.1em 0.2em;
    margin: 0 -0.2em;
    background-image: linear-gradient(
      to right,
      ${(props) => (props.accentColor || props.theme.colors.primary) + "66"} 0%,
      ${(props) => (props.accentColor || props.theme.colors.primary) + "66"}
        100%
    );
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: var(--highlight-width, 0%) 40%;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`;

const InsightText = styled(StyledParagraph)`
  margin-top: 20px;
  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

const OverviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  display: block;
`;

const OutcomesContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 10px;
  }
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
  flex: 0 0 500px;
  max-width: 500px;

  @media (max-width: 1024px) {
    flex: 1;
    width: 100%;
  }
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
    margin: 0 auto 20px auto;
  }
`;

const VideoSection = styled.div`
  flex: 0 0 500px;
  max-width: 500px;

  @media (max-width: 1024px) {
    flex: 1;
    width: 100%;
  }
`;

const VideoViewer = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin: 0 auto 20px auto;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: flex-start;
`;

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

  &:hover {
    color: ${(props) => props.accentColor || props.theme.colors.primary};
    border: 1px solid
      ${(props) => props.accentColor || props.theme.colors.primary};
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

  @media (max-width: 768px) {
    height: 1.2rem;
  }
`;

const Details = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const insightTitleRefs = useRef([]);

  const data = useMemo(() => {
    const dataMap = {
      projects: projectData,
      publications: publicationData,
      arts: artsData,
    };
    return dataMap[category] || null;
  }, [category]);

  const item = useMemo(() => {
    return data ? data.find((i) => i.id.toString() === id) : null;
  }, [data, id]);

  const accentColor = item?.accentColor;

  const renderMarkdownWithParagraph = useCallback(
    (content) => (
      <ReactMarkdown
        components={{
          p: (props) => (
            <StyledParagraph {...props} accentColor={accentColor} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    ),
    [accentColor]
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
    []
  );

  const getLinkIcon = useCallback((type) => {
    const iconMap = {
      reflection: Notebook02Icon,
      github: GithubIcon,
      video: YoutubeIcon,
      document: File02Icon,
      score: FileMusicIcon,
      soundcloud: SoundcloudIcon,
    };
    const Icon = iconMap[type];
    return Icon ? <HugeiconsIcon icon={Icon} /> : null;
  }, []);

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
                src={`${process.env.PUBLIC_URL}${item.value}`}
                alt={altText}
              />
            );
          }
          return null;
        });
      }
      return renderMarkdownWithParagraph(content);
    },
    [renderMarkdownWithParagraph]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    if (insightTitleRefs.current.length > 0) {
      insightTitleRefs.current.forEach((ref, index) => {
        if (ref) {
          const strongElements = ref.querySelectorAll("strong");

          strongElements.forEach((strong) => {
            gsap.set(strong, {
              color: "transparent",
              WebkitTextStroke: `1px ${item?.accentColor || "#FF2020"}`,
              textStroke: `1px ${item?.accentColor || "#FF2020"}`,
            });

            gsap.to(strong, {
              color: item?.accentColor || "#FF2020",
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                end: "bottom 30%",
                scrub: 1,
                toggleActions: "play none none reverse",
              },
            });
          });
        }
      });
    }

    const createHighlightAnimation = (selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((strong) => {
        gsap.set(strong, {
          "--highlight-width": "0%",
        });

        gsap.to(strong, {
          "--highlight-width": "100%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: strong,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1.5,
            toggleActions: "play none none reverse",
          },
        });
      });
    };

    createHighlightAnimation(".keyinsights-section strong");
    createHighlightAnimation(".motivation-section strong");
    createHighlightAnimation(".approach-section strong");
    createHighlightAnimation(".overview-section strong");
    createHighlightAnimation(".outcomes-section strong");
    createHighlightAnimation(".reflection-section strong");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [category, id, item?.accentColor]);

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
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>

          <ThumbnailContainer>
            <ThumbnailImage
              src={`${process.env.PUBLIC_URL}${item.thumbnail}`}
              alt={item.title}
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

          <InfoGrid>
            {category === "publications"
              ? renderInfoList("Index Terms", item.indexTerms)
              : renderInfoList("Category", item.category)}
            {renderInfoList("Roles", item.myRole)}
            {item.tools
              ? renderInfoList("Tools", item.tools)
              : renderInfoList("Framework", item.framework)}
            {renderInfoList("Credits", item.credits)}
          </InfoGrid>
        </ContentWrapper>
      </InformationSection>

      <KeyInsightsSection className="keyinsights-section">
        <ContentWrapper>
          {Array.isArray(item.keyInsights) ? (
            item.keyInsights.map((insight, index) => {
              if (insight.type === "title") {
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) {
                        insightTitleRefs.current[index] = el;
                      }
                    }}
                  >
                    <ReactMarkdown
                      components={{
                        h1: InsightTitle,
                      }}
                    >
                      {insight.value}
                    </ReactMarkdown>
                  </div>
                );
              } else if (insight.type === "image") {
                // 다음 인덱스의 text와 함께 그룹으로 렌더링
                const nextInsight = item.keyInsights[index + 1];
                if (nextInsight && nextInsight.type === "text") {
                  return (
                    <InsightContainer key={`group-${index}`}>
                      <InsightImageContainer>
                        <InsightImage
                          src={`${process.env.PUBLIC_URL}${insight.value}`}
                          alt="Key insight"
                        />
                      </InsightImageContainer>
                      <InsightTextContainer>
                        <ReactMarkdown
                          components={{
                            p: (props) => (
                              <InsightText
                                {...props}
                                accentColor={accentColor}
                              />
                            ),
                          }}
                        >
                          {nextInsight.value}
                        </ReactMarkdown>
                      </InsightTextContainer>
                    </InsightContainer>
                  );
                }
                // text가 없으면 이미지만 렌더링
                return (
                  <InsightImage
                    key={index}
                    src={`${process.env.PUBLIC_URL}${insight.value}`}
                    alt="Key insight"
                  />
                );
              } else if (insight.type === "text") {
                // 이미지 다음에 오는 text는 이미 위에서 처리됨
                return null;
              }
              return null;
            })
          ) : (
            <ReactMarkdown
              components={{
                p: StyledParagraph,
              }}
            >
              {item.keyInsights}
            </ReactMarkdown>
          )}
        </ContentWrapper>
      </KeyInsightsSection>

      {(item.motivation || item.abstract) && (
        <MotivationSection className="motivation-section">
          <ContentWrapper>
            <h2>{category === "publications" ? "Abstract" : "Motivation"}</h2>
            {renderSectionContent(
              item.motivation || item.abstract,
              category === "publications"
                ? "Abstract image"
                : "Motivation image"
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

      {/* 기존 overview 필드가 있는 경우를 위한 fallback */}
      {!item.motivation && !item.approach && item.overview && (
        <MotivationSection className="overview-section">
          <ContentWrapper>
            <h2>Overview</h2>
            {renderSectionContent(item.overview, "Overview image")}
          </ContentWrapper>
        </MotivationSection>
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
                        {item.links.map((link, index) => (
                          <LinkItem
                            key={index}
                            href={link.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            accentColor={item?.accentColor}
                            data-no-hover
                          >
                            <LinkIcon>{getLinkIcon(link.type)}</LinkIcon>
                            {category === "publications" &&
                            link.type === "document"
                              ? "full paper"
                              : link.type}
                          </LinkItem>
                        ))}
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
          <BackButton onClick={() => navigate(-1)} data-no-hover>
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
            Back
          </BackButton>
        </ContentWrapper>
      </RelatedProjectsSection>
    </div>
  );
};

export default Details;
