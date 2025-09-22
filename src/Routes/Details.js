import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projectData from "../data/projects.json";
import researchData from "../data/researches.json";
import ReactMarkdown from "react-markdown";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Notebook02Icon,
  GithubIcon,
  YoutubeIcon,
  File02Icon,
} from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0px 100px 100px 100px;
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
  padding-top: 180px;
  background-color: ${(props) => props.theme.colors.background};
  align-items: flex-start;

  @media (max-width: 768px) {
    padding-top: 120px;
    padding-bottom: 40px;
  }
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 35vh;
  margin: 0 auto 30px auto;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.black};

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
`;

const OverviewSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.text};
  }
`;

const OutcomesSection = styled(Section)`
  align-items: flex-start;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.text};
  }
`;

const ReflectionSection = styled(Section)`
  align-items: flex-start;
  padding-bottom: 200px;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.text};
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
  font-size: 2.8rem;
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
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0 0 30px 0;
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;
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
  margin: 0 auto 30px auto;
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin: 0 auto 20px auto;
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
  display: flex;
  gap: clamp(10px, 5vw, 100px);
  justify-content: center;
  flex-wrap: wrap;
  margin: 0;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: auto;
  }
`;

const InfoBlock = styled.div`
  text-align: left;
  flex: 0 0 auto;
  @media (max-width: 1200px) and (min-width: 768px) {
    max-width: 160px;
  }

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
    margin-bottom: 5px;
    font-size: 0.9rem;
    word-wrap: break-word;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      margin-bottom: 5px;
    }
  }
`;

const InsightImage = styled.img`
  max-width: 500px;
  width: 100%;
  height: auto;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.colors.black};
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
  }

  strong {
    color: ${(props) => props.theme.colors.text};
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    position: relative;
  }
`;

const InsightText = styled.h3`
  text-align: left;
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-top: 10px;
  }

  strong {
    font-weight: 700;
    font-family: inherit;
  }
`;

const StyledParagraph = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text};

  font-size: 1.1rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-line;
  margin-bottom: 10px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  strong {
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
    position: relative;
    display: inline;
    padding: 0 2px;
    margin: 0 -2px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 0.5em;
      width: var(--highlight-width, 0%);
      background: ${(props) => props.accentColor || props.theme.colors.primary};
      z-index: -1;
      opacity: 0.4;
    }
  }
`;

const OverviewImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.colors.black};
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
    max-width: 100%;
  }
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 60vh;
  border: 1px solid ${(props) => props.theme.colors.black};
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    width: 50vw;
    height: 30vh;
    margin: 0 auto 20px auto;
  }
  @media (max-width: 768px) {
    width: 70vw;
    height: 20vh;
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
  border: 1px solid ${(props) => props.theme.colors.black};
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

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LinkItem = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  padding: 8px 16px;
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
    padding: 6px 12px;
  }
`;

const LinkIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Details = () => {
  const { category, id } = useParams();
  const insightTitleRefs = useRef([]);
  let data;

  const getLinkIcon = (type) => {
    switch (type) {
      case "reflection":
        return <HugeiconsIcon icon={Notebook02Icon} />;
      case "github":
        return <HugeiconsIcon icon={GithubIcon} />;
      case "video":
        return <HugeiconsIcon icon={YoutubeIcon} />;
      case "document":
        return <HugeiconsIcon icon={File02Icon} />;
      default:
        return null;
    }
  };

  if (category === "projects") {
    data = projectData;
  } else if (category === "publications") {
    data = researchData;
  }

  const item = data ? data.find((i) => i.id.toString() === id) : null;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (insightTitleRefs.current.length > 0) {
      insightTitleRefs.current.forEach((ref, index) => {
        if (ref) {
          const strongElements = ref.querySelectorAll("strong");

          strongElements.forEach((strong) => {
            gsap.set(strong, {
              color: item?.accentColor || "#FF2020",
              clipPath: "inset(0 100% 0 0)",
            });

            gsap.to(strong, {
              clipPath: "inset(0 0% 0 0)",
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
              {category === "projects"
                ? `${item.startDate} ~ ${item.endDate}`
                : `${item.date}`}
            </Date>
          </MetaInfo>

          <InfoGrid>
            <InfoBlock>
              <h4>Category</h4>
              <ul>
                {item.category.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock>
              <h4>Role</h4>
              <ul>
                {item.myRole.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock>
              {category === "projects" ? (
                <>
                  <h4>Tools</h4>
                  <ul>
                    {item.tools.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h4>Index Terms</h4>
                  <ul>
                    {item.indexTerms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </>
              )}
            </InfoBlock>

            <InfoBlock>
              <h4>Credits</h4>
              <ul>
                {item.credits.map((credit, index) => (
                  <li key={index}>{credit}</li>
                ))}
              </ul>
            </InfoBlock>
          </InfoGrid>
        </ContentWrapper>
      </InformationSection>

      <KeyInsightsSection>
        <ContentWrapper>
          {Array.isArray(item.keyInsights) ? (
            item.keyInsights.map((insight, index) => {
              switch (insight.type) {
                case "title":
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
                case "text":
                  return (
                    <ReactMarkdown
                      key={index}
                      components={{
                        p: InsightText,
                      }}
                    >
                      {insight.value}
                    </ReactMarkdown>
                  );
                case "image":
                  return (
                    <InsightImage
                      key={index}
                      src={`${process.env.PUBLIC_URL}${insight.value}`}
                      alt="Key insight"
                    />
                  );
                default:
                  return null;
              }
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

      <OverviewSection className="overview-section">
        <ContentWrapper>
          <h2>Overview</h2>
          {Array.isArray(item.overview) ? (
            item.overview.map((overviewItem, index) => {
              if (typeof overviewItem === "string") {
                // for past data
                return (
                  <ReactMarkdown
                    key={index}
                    components={{
                      p: (props) => (
                        <StyledParagraph
                          {...props}
                          accentColor={item?.accentColor}
                        />
                      ),
                    }}
                  >
                    {overviewItem}
                  </ReactMarkdown>
                );
              } else if (overviewItem.type === "text") {
                return (
                  <ReactMarkdown
                    key={index}
                    components={{
                      p: (props) => (
                        <StyledParagraph
                          {...props}
                          accentColor={item?.accentColor}
                        />
                      ),
                    }}
                  >
                    {overviewItem.value}
                  </ReactMarkdown>
                );
              } else if (overviewItem.type === "image") {
                return (
                  <OverviewImage
                    key={index}
                    src={`${process.env.PUBLIC_URL}${overviewItem.value}`}
                    alt="Overview image"
                  />
                );
              }
              return null;
            })
          ) : (
            <ReactMarkdown
              components={{
                p: (props) => (
                  <StyledParagraph {...props} accentColor={item?.accentColor} />
                ),
              }}
            >
              {item.overview}
            </ReactMarkdown>
          )}
        </ContentWrapper>
      </OverviewSection>

      <OutcomesSection className="outcomes-section">
        <ContentWrapper>
          <h2>Outcomes</h2>

          <OutcomesContainer>
            {item.presentation && (
              <PDFSection>
                <PDFViewer src={`${item.presentation}`} title="PDF Document" />
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

                        >
                          {outcome}
                        </ReactMarkdown>
                      </OutcomeContent>
                    </OutcomeItem>
                  ))}
                </OutcomesList>
              )}
            </OutcomesContainer>
          )}
        </ContentWrapper>
      </OutcomesSection>

      {item.reflection && (
        <ReflectionSection className="reflection-section">
          <ContentWrapper>
            <h2>Reflection</h2>
            <ReactMarkdown
              components={{
                p: (props) => (
                  <StyledParagraph {...props} accentColor={item?.accentColor} />
                ),
              }}
            >
              {item.reflection}
            </ReactMarkdown>
          </ContentWrapper>
        </ReflectionSection>
      )}
    </div>
  );
};

export default Details;
