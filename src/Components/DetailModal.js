import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import OptimizedThumbnail from "./OptimizedThumbnail";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to { 
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => props.theme.colors.overlay};
  backdrop-filter: blur(3px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;

  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const ModalBox = styled.div`
  background: ${(props) => props.theme.colors.background};
  width: 100%;
  max-width: 960px;
  max-height: 85vh;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;

  animation: ${scaleUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (max-width: 768px) {
    overflow-y: auto;
  }
`;

const CloseButton = styled.div`
  align-self: flex-end;
  width: 24px;
  height: 24px;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ModalContents = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const LeftMedia = styled.div`
  flex: 1;
  width: 100%;
  height: fit-content;
  padding-top: 20px;

  iframe,
  img {
    width: 100%;
    height: 100%;
    border: none;
    object-fit: contain;
  }

  iframe {
    aspect-ratio: 16 / 9;
  }

  @media (max-width: 768px) {
    flex: none;
  }
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    overflow-y: visible;
    padding: 20px 0px;
  }

  h2 {
    font-size: 1.7rem;
    margin-bottom: 10px;
    color: ${(props) => props.theme.colors.text};
    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  span {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
    text-align: left;
    opacity: 0.7;
    line-height: 1.4;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }

  p {
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
  }
`;

const RightImg = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-bottom: 10px;
    display: block;
  }
`;

const DetailModal = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "unset";
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [item]);

  if (!item) return null;

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <HugeiconsIcon icon={Cancel01Icon} />
        </CloseButton>

        <ModalContents>
          {/* [왼쪽] 메인 미디어 (비디오 or 포스터) */}
          <LeftMedia>
            {item.video ? (
              <iframe
                src={item.video.replace("watch?v=", "embed/")}
                title={item.title}
                allowFullScreen
              />
            ) : (
              <OptimizedThumbnail
                src={item.thumbnail}
                alt={item.title}
                showOverlay={false}
              />
            )}
          </LeftMedia>

          {/* [오른쪽] 상세 정보 & 추가 갤러리 */}
          <RightContent>
            <h2>{item.title}</h2>

            <span>
              {item.date}, {item.where}
            </span>

            {item.overview && item.overview.length > 0 && (
              <div>
                {item.overview.map((block, index) => {
                  if (block.type === "text") {
                    return <p key={index}>{block.value}</p>;
                  }
                  if (block.type === "image") {
                    return (
                      <RightImg>
                        <OptimizedThumbnail
                          key={index}
                          src={block.value}
                          alt={`${item.title} detail ${index}`}
                          showOverlay={false}
                        />
                      </RightImg>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </RightContent>
        </ModalContents>
      </ModalBox>
    </Backdrop>
  );
};

export default DetailModal;
