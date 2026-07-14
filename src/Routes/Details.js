import React, { useEffect, useMemo, useState, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import workData from "../data/works.json";
import publicationData from "../data/publications.json";
import visualData from "../data/visual.json";
import musicData from "../data/music.json";
import performanceData from "../data/performance.json";
import ReactMarkdown from "react-markdown";
import LinkButtons from "../Components/LinkButtons";
import OptimizedThumbnail from "../Components/OptimizedThumbnail";

const DATA_SOURCES = [
  { name: "works", data: workData },
  { name: "publications", data: publicationData },
  { name: "visual", data: visualData },
  { name: "music", data: musicData },
  { name: "performance", data: performanceData },
];

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 80px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 120px 40px 100px 40px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  @media (max-width: 1024px) {
    gap: 40px;
    padding: 120px 30px 80px 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    padding: 100px 20px 60px 20px;
  }
`;

const LeftSidebar = styled.div`
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 120px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    height: auto;
    padding: 15px;
  }
`;

const RightContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.colors.subText};
  background: transparent;
  border: none;
  padding: 8px 0;
  cursor: pointer;
  transition: color 0.2s ease;
  width: fit-content;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    gap: 5px;
  }
`;

const MetaHeader = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;

  span {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.subText};
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 6px;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0 0 25px 0;
  color: ${(props) => props.theme.colors.black};
  text-align: left;
  line-height: 1.15;

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
`;

const SubTitle = styled.span`
  margin: 0 0 25px 0;
  color: ${(props) => props.theme.colors.black};
  text-align: left;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const InfoList = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  padding: 5px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 5px 0;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${(props) => props.theme.colors.text};
`;

const InfoValue = styled.span`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.text};
  text-align: right;
`;

const SidebarLinkSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 40px;

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const OutcomesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

const PDFSection = styled.div`
  flex: 1;
  width: 100%;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 50vh;

  @media (max-width: 1024px) {
    height: 35vh;
  }
`;

const VideoSection = styled.div`
  flex: 1;
  width: 100%;
`;

const VideoViewer = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const MarkdownContainer = styled.div`
  color: ${(props) => props.theme.colors.text};
  text-align: left;
  width: 100%;

  h1,
  h2,
  h3,
  h4 {
    font-family: "Figtree", sans-serif;
    color: ${(props) => props.theme.colors.black};
    margin-top: 45px;
    margin-bottom: 20px;
    font-weight: 300;
    line-height: 1.3;

    @media (max-width: 768px) {
      margin-top: 35px;
      margin-bottom: 15px;
    }
  }

  h1 {
    font-size: 2.2rem;

    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }

  h2 {
    font-size: 1.6rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    padding-bottom: 8px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  h3 {
    font-size: 1.3rem;
    margin-top: 30px;
    font-weight: 400;

    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-top: 25px;
    }
  }

  p {
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.text};

    strong {
      font-weight: 400;
      color: ${(props) => props.theme.colors.black};
    }

    i {
      font-style: italic;
    }

    @media (max-width: 768px) {
      margin-bottom: 5px;
    }
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      margin-bottom: 5px;
    }

    li {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;

      @media (max-width: 768px) {
        margin-bottom: 5px;
      }

      &::before {
        content: "✦";
        position: absolute;
        left: 0;
        top: 0.05em;
      }

      color: ${(props) => props.theme.colors.text};

      strong {
        font-weight: 400;
        color: ${(props) => props.theme.colors.black};
      }
    }
  }

  ol {
    list-style-type: decimal;
    padding-left: 20px;
    margin-bottom: 25px;

    @media (max-width: 768px) {
      margin-bottom: 15px;
    }

    li {
      display: list-item;
      margin-bottom: 10px;
      padding-left: 5px;

      @media (max-width: 768px) {
        margin-bottom: 5px;
      }

      &::marker {
        color: ${(props) => props.theme.colors.black};
      }

      color: ${(props) => props.theme.colors.text};

      strong {
        font-weight: 400;
        color: ${(props) => props.theme.colors.black};
      }
    }
  }

  a {
    color: ${(props) => props.theme.colors.text};
    transition: all 0.2s ease;
    font-weight: 400;

    &:hover {
      text-decoration: line-through;
      text-decoration-style: 2px solid;
      text-decoration-color: ${(props) => props.theme.colors.primary};
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    border: 1px solid ${(props) => props.theme.colors.border};

    th,
    td {
      padding: 12px 15px;
      border: 1px solid ${(props) => props.theme.colors.border};
      text-align: left;
    }

    th {
      background-color: ${(props) => props.theme.colors.border};
      font-weight: 300;
      color: ${(props) => props.theme.colors.black};
    }

    td {
      font-size: 0.95rem;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${(props) => props.theme.colors.border};
    margin: 40px 0;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 35px auto;
    display: block;

    @media (max-width: 768px) {
      margin: 15px auto;
    }
  }

  blockquote {
    border-left: 2px solid ${(props) => props.theme.colors.black};
    padding: 10px 0 10px 25px;
    margin: 35px 0;
    color: ${(props) => props.theme.colors.black};

    p {
      margin: 0;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: inherit;
      color: inherit;
    }

    @media (max-width: 768px) {
      margin-bottom: 15px;
      padding: 8px 15px;
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 35px 0;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin: 25px 0;
  }
`;

const GridColumn = styled.div`
  min-width: 0;

  img {
    margin: 0 !important;
  }

  p {
    margin-bottom: 0 !important;
  }
`;

const Details = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);

  const projectInfo = useMemo(() => {
    if (!id) return null;
    for (const source of DATA_SOURCES) {
      const foundItem = source.data.find((i) => i.id.toString() === id);
      if (foundItem) {
        return { item: foundItem, category: source.name, allData: source.data };
      }
    }
    return null;
  }, [id]);

  const item = projectInfo?.item || null;
  const category = projectInfo?.category || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id || !category) return;
    setLoading(true);
    fetch(`/content/${category}/${id}.md`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load markdown for ${id}`);
        }
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMarkdownContent("");
        setLoading(false);
      });
  }, [id, category]);

  const renderMarkdownWithGrids = (text) => {
    if (!text) return null;
    const parts = text.split(/:::/g);
    return parts.map((part, index) => {
      const trimmed = part.trim();
      if (trimmed.startsWith("col-split")) {
        const content = trimmed.slice("col-split".length).trim();
        const subParts = content.split("---").map((p) => p.trim());
        return (
          <GridContainer key={index}>
            <GridColumn>
              <ReactMarkdown>{subParts[0]}</ReactMarkdown>
            </GridColumn>
            <GridColumn>
              <ReactMarkdown>{subParts[1]}</ReactMarkdown>
            </GridColumn>
          </GridContainer>
        );
      }
      if (!trimmed) return null;
      return <ReactMarkdown key={index}>{part}</ReactMarkdown>;
    });
  };

  if (!item) {
    return (
      <PageWrapper
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>Project not found.</p>
          <BackButton
            onClick={() => navigate(-1)}
            style={{ marginTop: "20px" }}
          >
            Back
          </BackButton>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <LeftSidebar>
        <MetaHeader>
          <span>{item.date}</span>
        </MetaHeader>
        <Title>{item.title}</Title>
        <SubTitle>{item.subtitle}</SubTitle>

        <InfoList>
          {item.myRole && (
            <InfoRow>
              <InfoLabel>Role</InfoLabel>
              <InfoValue>{item.myRole.join(", ")}</InfoValue>
            </InfoRow>
          )}
          {item.tools && (
            <InfoRow>
              <InfoLabel>Tools</InfoLabel>
              <InfoValue>{item.tools.join(", ")}</InfoValue>
            </InfoRow>
          )}
          {item.credits && (
            <InfoRow>
              <InfoLabel>
                {category === "publications" ? "Authors" : "Team"}
              </InfoLabel>
              <InfoValue>{item.credits.join(", ")}</InfoValue>
            </InfoRow>
          )}
          {item.location && (
            <InfoRow>
              <InfoLabel>Location</InfoLabel>
              <InfoValue>{item.location}</InfoValue>
            </InfoRow>
          )}
        </InfoList>

        {item.links && Array.isArray(item.links) && item.links.length > 0 && (
          <SidebarLinkSection>
            <LinkButtons links={item.links} />
          </SidebarLinkSection>
        )}
      </LeftSidebar>

      <RightContent>
        {item.bignail && (
          <ThumbnailContainer>
            <OptimizedThumbnail
              src={item.bignail}
              alt={item.title}
              showOverlay={false}
            />
          </ThumbnailContainer>
        )}

        {/* Markdown Body Content Section */}
        {!loading && markdownContent && (
          <MarkdownContainer>
            {renderMarkdownWithGrids(markdownContent)}
          </MarkdownContainer>
        )}

        {loading && (
          <div style={{ padding: "40px 0", textAlign: "center" }}>
            <p>Loading project details...</p>
          </div>
        )}

        {/* PDF / Video Section */}
        {(item.presentation || item.video) && (
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
          </OutcomesContainer>
        )}

        <BackButton onClick={() => navigate(-1)} style={{ marginTop: "40px" }}>
          Back
        </BackButton>
      </RightContent>
    </PageWrapper>
  );
});

Details.displayName = "Details";

export default Details;
