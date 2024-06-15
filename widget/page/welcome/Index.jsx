const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 24px;
  .top {
    width: 442px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    .heading {
      color: var(--Gray-12, #171717);
      text-align: center;

      /* Heading/L - 32px/Medium */
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: -1.28px;
      margin: 0px;
    }
    .sub-heading {
      color: var(--Gray-11, #6f6f6f);
      text-align: center;
      align-self: stretch;
      /* Text/M - 16px/Regular */
      font-family: "Poppins";
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 24px */
      letter-spacing: -0.16px;
      margin: 0px;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 442px;
    Button {
      padding: 8px 20px;
      height: 36px;
      color: var(--BG-Main, #fff);

      /* Text/M - 16px/Medium */
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 24px */
      letter-spacing: -0.16px;
    }
  }
`;

const Index = () => (
  <Container>
    <div className="top">
      <h1 className="heading">Welcome, builder!</h1>
      <p className="sub-heading">
        We're happy to have you in our community. Let's build together!
      </p>
    </div>
    <div className="bottom">
      <Button style={{ width: "100%" }}>continue</Button>
    </div>
  </Container>
);

return <Index />;
