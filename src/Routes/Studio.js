import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../Components/PageContainer";
import MusicData from "../data/music.json";
import PerformanceData from "../data/performance.json";
import visualData from "../data/visual.json";
import OptimizedThumbnail from "../Components/OptimizedThumbnail";
import { HugeiconsIcon } from "@hugeicons/react";
import { SoundcloudIcon, YoutubeIcon } from "@hugeicons/core-free-icons";

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 340px;
  gap: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
`;

const BentoBlock = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const AudioBlock = styled(BentoBlock)`
  grid-column: span 3;
  grid-row: span 1;
  @media (max-width: 1200px) {
    grid-column: span 2;
    grid-row: span 1;
  }
  @media (max-width: 768px) {
    grid-column: span 1;
    grid-row: auto;
  }
`;

const VisualBlock = styled(BentoBlock)`
  grid-column: span 2;
  grid-row: span 2;
  @media (max-width: 1200px) {
    grid-column: span 2;
    grid-row: span 2;
  }
  @media (max-width: 768px) {
    grid-column: span 1;
    grid-row: auto;
  }
`;

const LiveBlock = styled(BentoBlock)`
  grid-column: span 1;
  grid-row: span 2;
  @media (max-width: 1200px) {
    grid-column: span 2;
    grid-row: span 1;
  }
  @media (max-width: 768px) {
    grid-column: span 1;
    grid-row: auto;
  }
`;

const BlockHeader = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.text};
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const HideScrollbar = `
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const VerticalScroll = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  ${HideScrollbar}
`;

const HorizontalScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 10px;
  ${HideScrollbar}

  > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }
`;

const ItemDiv = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    h3 {
      color: ${(props) => props.theme.colors.primary};
    }
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
`;

const MusicItem = styled(ItemDiv)`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    width: 180px;
  }

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const LiveItem = styled(ItemDiv)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Perfposter = styled.div`
  img {
    width: 70px;
    aspect-ratio: 3 / 4;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

const PerfInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const VisualItem = styled(ItemDiv)`
  width: 320px;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    width: 260px;
  }
`;

const ItemThumb = styled.div`
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 7px;
  color: ${(props) => props.theme.colors.black};

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
`;

const ItemSubtitle = styled.h4`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.subText};
  font-weight: normal;
  opacity: 0.8;
`;

const CoverWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

const sortByDateDesc = (a, b) => {
  const dateA = new Date(a.startDate || 0);
  const dateB = new Date(b.startDate || 0);
  return dateB - dateA;
};

const Studio = memo(() => {
  const music = [...MusicData].sort(sortByDateDesc);
  const performances = [...PerformanceData].sort(sortByDateDesc);
  const visuals = [...visualData].sort(sortByDateDesc);

  return (
    <PageContainer title="STUDIO">
      <BentoGrid>
        <AudioBlock>
          <BlockHeader>Music</BlockHeader>
          <HorizontalScroll>
            {music.map((track) => (
              <MusicItem key={track.id}>
                <CoverWrapper>
                  <OptimizedThumbnail
                    src={track.thumbnail}
                    alt={track.title}
                    showOverlay={false}
                  />
                  <Overlay>
                    {track.soundcloud && (
                      <IconLink
                        href={track.soundcloud}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <HugeiconsIcon icon={SoundcloudIcon} />
                      </IconLink>
                    )}
                    {track.video && (
                      <IconLink
                        href={track.video}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <HugeiconsIcon icon={YoutubeIcon} />
                      </IconLink>
                    )}
                  </Overlay>
                </CoverWrapper>
                <ItemTitle>{track.title}</ItemTitle>
                <ItemSubtitle>{track.artist}</ItemSubtitle>
              </MusicItem>
            ))}
          </HorizontalScroll>
        </AudioBlock>

        <LiveBlock>
          <BlockHeader>Performance</BlockHeader>
          <VerticalScroll>
            {performances.map((perf) => (
              <LiveItem key={perf.id} onClick={() => setSelectedItem(perf)}>
                <Perfposter>
                  <OptimizedThumbnail
                    src={perf.thumbnail}
                    alt={perf.title}
                    showOverlay={false}
                  />
                </Perfposter>
                <PerfInfo>
                  <ItemTitle>{perf.title}</ItemTitle>
                  <ItemSubtitle>{perf.date || perf.startDate}</ItemSubtitle>
                  <ItemSubtitle>{perf.where}</ItemSubtitle>
                </PerfInfo>
              </LiveItem>
            ))}
          </VerticalScroll>
        </LiveBlock>

        <VisualBlock>
          <BlockHeader>Visual</BlockHeader>
          <HorizontalScroll>
            {visuals.map((vis) => (
              <VisualItem key={vis.id} onClick={() => setSelectedItem(vis)}>
                <ItemThumb>
                  <OptimizedThumbnail
                    src={vis.bignail}
                    alt={vis.title}
                    showOverlay={false}
                  />
                </ItemThumb>
                <ItemTitle>{vis.title}</ItemTitle>
                <ItemSubtitle>{vis.subtitle}</ItemSubtitle>
              </VisualItem>
            ))}
          </HorizontalScroll>
        </VisualBlock>
      </BentoGrid>
    </PageContainer>
  );
});

Studio.displayName = "Studio";

export default Studio;
