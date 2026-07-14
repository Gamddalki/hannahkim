import styled from "styled-components";

const MoreButton = styled.button`
  font-size: 0.8rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 10px 0;
  transition: all 0.2s ease;
  background: none;
  margin: 35px auto 0;
  display: block;
  color: ${(props) => props.theme.colors.hashText};

  &:hover {
    text-decoration: line-through;
    text-decoration-color: ${(props) => props.theme.colors.primary};
    text-decoration-thickness: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
`;

export default MoreButton;
