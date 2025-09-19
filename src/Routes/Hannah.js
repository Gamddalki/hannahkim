import React from "react";
import styled from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Linkedin02Icon,
  Mail01Icon,
  YoutubeIcon,
  SoundcloudIcon,
} from "@hugeicons/core-free-icons";
import PageContainer from "../Components/PageContainer";
import journeyData from "../data/journey.json";

const CVIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.33639 18.1333C6.23639 18.1333 5.23639 17.8778 4.33639 17.3667C3.4475 16.8444 2.7475 16.1333 2.23639 15.2333C1.73639 14.3222 1.48639 13.3 1.48639 12.1667C1.48639 11.0333 1.74195 10.0167 2.25306 9.11667C2.76417 8.20556 3.46417 7.49444 4.35306 6.98333C5.24195 6.46111 6.24195 6.2 7.35306 6.2C8.20862 6.2 8.9975 6.35556 9.71973 6.66667C10.4419 6.96667 11.0531 7.41111 11.5531 8L10.5697 8.98333C9.72528 8.06111 8.67528 7.6 7.41973 7.6C6.58639 7.6 5.83639 7.8 5.16973 8.2C4.51417 8.58889 3.9975 9.13333 3.61973 9.83333C3.24195 10.5222 3.05306 11.3 3.05306 12.1667C3.05306 13.0222 3.24195 13.8 3.61973 14.5C3.9975 15.1889 4.51973 15.7333 5.18639 16.1333C5.85306 16.5222 6.5975 16.7167 7.41973 16.7167C8.68639 16.7167 9.73639 16.25 10.5697 15.3167L11.5531 16.3C11.0531 16.9 10.4419 17.3556 9.71973 17.6667C8.9975 17.9778 8.20306 18.1333 7.33639 18.1333ZM18.4137 18H16.8803L12.0137 6.33333H13.697L17.7137 15.9667L21.7303 6.33333H23.297L18.4137 18Z"
      fill="currentColor"
    />
  </svg>
);

const ProfileSection = styled.div`
  display: flex;
  gap: 60px;
  margin-top: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  flex-shrink: 0;
`;

const ProfileImage = styled.div`
  width: 25vw;
  height: calc(25vw * 4 / 3);
  max-height: calc(400px * 4 / 3);
  min-height: calc(250px * 4 / 3);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: calc(100vw * 3 / 4);
  }
`;

const SocialIcons = styled.div`
  margin-top: 0;
  width: 100%;
  max-width: 400px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 10px;
`;

const IconLink = styled.a`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const ProfileInfo = styled.div`
  text-align: left;
  flex: 1;

  h2 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    color: ${(props) => props.theme.colors.primary};
    line-height: 1;
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  span {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 15px;
    color: ${(props) => props.theme.colors.text};
    display: block;
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const HighlightLink = styled.a`
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const InterestsSection = styled.div`
  margin-top: 30px;
`;

const InterestsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.primary};
  text-align: left;
`;

const InterestsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const InterestTag = styled.span`
  color: ${(props) => props.theme.colors.hashText};
  border: 1px solid ${(props) => props.theme.colors.hashText};
  padding: 4px 8px;
  font-size: 0.9rem !important;
  font-weight: 500;
  border-radius: 999px;
  transition: all 0.2s ease;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 2px 7px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const JourneySection = styled.div`
  margin-top: 70px;
  padding: 0;
  width: 100%;
`;

const JourneyTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.primary};
  text-align: left;
`;

const JourneyList = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 90px;
    top: 0;
    bottom: 0;
    width: 0.5px;
    background: ${(props) => props.theme.colors.footerText};
    opacity: 0.3;

    @media (max-width: 1024px) {
      left: 75px;
    }
  }
`;

const JourneyItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  gap: 20px;
  position: relative;
  padding-left: 0;

  @media (max-width: 1024px) {
    gap: 15px;
  }
`;

const Year = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  width: 75px;
  flex-shrink: 0;
  text-align: left;
  padding: 0;
  margin: 0;

  @media (max-width: 1024px) {
    width: 65px;
    font-size: 0.8rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 20px;

  @media (max-width: 1024px) {
    margin-left: 15px;
  }
`;

const ItemType = styled.span`
  font-size: 0.8rem;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.subText};
  font-weight: normal;
  line-height: 1.2;
  opacity: 0.7;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 3px;
  }
`;

const ItemTitle = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.text};
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const MoreButton = styled.button`
  color: ${(props) => props.theme.colors.hashText};
  border: 1px solid ${(props) => props.theme.colors.hashText};
  padding: 10px 20px;
  font-size: 0.7rem;
  font-weight: 500;
  border-radius: 20px;
  transition: all 0.2s ease;
  cursor: pointer;
  background: none;
  margin: 20px auto 0;
  display: block;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 1024px) {
    font-size: 0.6rem;
    padding: 6px 12px;
  }
`;

function Hannah() {
  const [showAll, setShowAll] = React.useState(false);

  const { journeyData: journeyItems, icons } = journeyData;

  const visibleItems = showAll ? journeyItems : journeyItems.slice(0, 5);

  return (
    <PageContainer>
      <ProfileSection>
        <LeftColumn>
          <ProfileImage>
            <img
              src={`${process.env.PUBLIC_URL}/img/hannah.jpg`}
              alt="Hannah Kim"
            />
          </ProfileImage>
          <SocialIcons data-no-hover>
            <IconContainer data-no-hover>
              <IconLink
                href="mailto:hannahk01@ewha.ac.kr"
                target="_blank"
                rel="noreferrer"
                data-no-hover
              >
                <HugeiconsIcon icon={Mail01Icon} />
              </IconLink>
              <IconLink
                href="https://www.linkedin.com/in/hannahk01/"
                target="_blank"
                rel="noreferrer"
                data-no-hover
              >
                <HugeiconsIcon icon={Linkedin02Icon} />
              </IconLink>
              <IconLink
                href="https://github.com/Gamddalki/"
                target="_blank"
                rel="noreferrer"
                data-no-hover
              >
                <HugeiconsIcon icon={GithubIcon} />
              </IconLink>
              <IconLink
                href="https://www.youtube.com/@dahae01"
                target="_blank"
                rel="noreferrer"
                data-no-hover
              >
                <HugeiconsIcon icon={YoutubeIcon} />
              </IconLink>
              <IconLink
                href="https://soundcloud.com/llorjjrk"
                target="_blank"
                rel="noreferrer"
                data-no-hover
              >
                <HugeiconsIcon icon={SoundcloudIcon} />
              </IconLink>
              <IconLink
                href="https://drive.google.com/file/d/1AE1wXTG0kT37ymQAC8_eZoldSjfxnBHb/view"
                target="_blank"
                rel="noreferrer"
                title="CV"
                data-no-hover
              >
                <CVIcon />
              </IconLink>
            </IconContainer>
          </SocialIcons>
        </LeftColumn>
        <ProfileInfo data-no-hover>
          <h2>Hello, I'm Hannah Kim</h2>
          <span>
            I am a <i>Creative Technologist</i> crafting narrative-driven user
            experiences.
          </span>
          <span>
            I thrive at the intersection of technology and art, designing{" "}
            <i>interactive systems</i> that merge <i>story and emotion</i>. From
            emotion-driven prompt engineering research to XR games, my work
            brings abstract ideas into tangible, interactive realities.
          </span>
          <span>
            With a &nbsp;
            <HighlightLink
              href="https://cse.ewha.ac.kr/"
              target="_blank"
              rel="noreferrer"
            >
              B.E. in Computer Science &amp; Engineering
            </HighlightLink>
            &nbsp;and a&nbsp;
            <HighlightLink
              href="http://my.ewha.ac.kr/e600195/"
              target="_blank"
              rel="noreferrer"
            >
              B.A. in Humanities, Art and Media
            </HighlightLink>
            &nbsp;from Ewha Womans University, Seoul, Korea, I take a
            multidisciplinary approach that integrates design and development.
            My experiences span from supporting VR accessibility user studies as
            a research intern at&nbsp;
            <HighlightLink
              href="https://hcil-ewha.github.io/homepage/"
              target="_blank"
              rel="noreferrer"
            >
              Human-Computer Interaction Lab at Ewha
            </HighlightLink>
            , to shaping first-time user experiences and implementing
            data-driven improvements for the Korean edu-tech startup{" "}
            <HighlightLink
              href="https://mildang.kr/"
              target="_blank"
              rel="noreferrer"
            >
              Mildang PT
            </HighlightLink>{" "}
            as an intern. Beyond that, I love to perform as a guitarist in a
            band, composing original songs, and exploring live performances as a
            medium for storytelling.
          </span>
          <span>
            My goal is to create experiences that are not only interactive but
            also emotionally resonant — where technology becomes a stage for
            human stories.
          </span>

          <InterestsSection data-no-hover>
            <InterestsTitle>Interests</InterestsTitle>
            <InterestsTags>
              <InterestTag data-no-hover>#Creative Technology</InterestTag>
              <InterestTag data-no-hover>#User Experience</InterestTag>
              <InterestTag data-no-hover>#Interactive Design</InterestTag>
              <InterestTag data-no-hover>#XR</InterestTag>
              <InterestTag data-no-hover>#Storytelling</InterestTag>
              <InterestTag data-no-hover>#Music Production</InterestTag>
              <InterestTag data-no-hover>#Live Performance</InterestTag>
              <InterestTag data-no-hover>
                #Human-Computer Interaction
              </InterestTag>
            </InterestsTags>
          </InterestsSection>
        </ProfileInfo>
      </ProfileSection>

      <JourneySection>
        <JourneyTitle>My Journey</JourneyTitle>

        <JourneyList>
          {visibleItems.map((item, index) => (
            <JourneyItem key={index}>
              <Year>{item.year}</Year>
              <Content>
                <ItemType>{item.type}</ItemType>
                <ItemTitle>
                  {icons[item.type] || item.icon || "📋"} {item.title}
                </ItemTitle>
              </Content>
            </JourneyItem>
          ))}
        </JourneyList>
        {journeyItems.length > 5 && (
          <MoreButton onClick={() => setShowAll(!showAll)} data-no-hover>
            {showAll ? "Hide" : "More"}
          </MoreButton>
        )}
      </JourneySection>
    </PageContainer>
  );
}

export default Hannah;
