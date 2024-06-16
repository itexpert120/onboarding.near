const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};
const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};
const MemoizedAvatar = useMemo(
  () => <Avatar accountId={accountId} size="40px" />,
  [accountId]
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  align-items: stretch;
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: none;
    .heading {
      color: var(--Gray-12, #171717);
      text-align: center;
      font-size: 28px;
      font-weight: 500;
      letter-spacing: -1.12px;
    }
    .subheading {
      color: var(--Gray-11, #6f6f6f);
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 140%;
      letter-spacing: -0.14px;
    }
  }
  .content {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 16px;
    align-items: stretch;
    border: 1px solid var(--Gray-6, #e2e2e2);
    .avatar {
    }
    .input {
      align-items: stretch;
      flex: 1;
    }
  }
`;

return (
  <Container>
    <div className="header">
      <h1 className="heading">Write your first post</h1>
      <p className="subheading">
        Writing that first post is always tough, but don't worry, we've all been
        there! Share your thoughts and connect with fellow DAO enthusiasts. Your
        ideas could spark something great.{" "}
      </p>
    </div>
    <div className="content">
      <div className="avatar">
        {/* <Avatar accountId={accountId} size={40} /> */}
        {MemoizedAvatar}
      </div>
      <div className="input">
        <textarea
          type="text"
          class="form-control"
          id="post"
          placeholder="introduce yourself or share something about your latest project"
          style={{
            minHeight: "192px",
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "0px",
            paddingRight: "0px",
            border: "none",
          }}
        ></textarea>
      </div>
    </div>
    <Button variant="primary" onClick={onSubmit}>
      post
    </Button>
  </Container>
);
