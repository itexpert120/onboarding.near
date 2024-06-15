const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .left-circle {
    width: 24px;
    height: 24px;
    background-color: #000;
    border-radius: 50%;
  }

  .right-text {
    color: #0d0d0d;
    font-family: Poppins, sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 18px */
    text-transform: lowercase;
  }
`;

const Logo = () => {
  return (
    <StyledLogo>
      <div className="left-circle"></div>
      <div className="right-text">everything</div>
    </StyledLogo>
  );
};

return { Logo };
