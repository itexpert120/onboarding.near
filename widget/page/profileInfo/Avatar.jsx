const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 32px;

  .heading {
    color: var(--profile-heading-color, #171717);
    text-align: center;
    font-size: 28px;
    letter-spacing: -1.12px;
    margin: 0px;
  }

  label {
    color: var(--Gray-12, #171717);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
    letter-spacing: -0.14px;
    margin-bottom: 8px;
  }
`;

const [images, setImages] = useState({});

const onSubmit = () => {
  if (
    Object.keys(images.image ?? {}).length === 0 &&
    Object.keys(images.backgroundImage ?? {}).length === 0
  ) {
    props.toggleNextPage();
  } else {
    const data = {
      ...(Object.keys(images.image ?? {}).length && { image: images.image }),
      ...(Object.keys(images.backgroundImage ?? {}).length && {
        backgroundImage: images.backgroundImage,
      }),
    };

    Social.set(
      { profile: data },
      {
        onCommit: () => {
          props.toggleNextPage();
        },
      }
    );
  }
};

return (
  <Container>
    <h1 className="heading">Upload Photo</h1>
    <div>
      <label>Profile picture</label>
      <Widget
        src="${config_account}/widget/components.profileInfo.AvatarUploader"
        props={{
          onChange: (e) =>
            setImages({
              ...images,
              image: e,
            }),
        }}
      />
    </div>
    <div>
      <label>Cover image</label>
      <Widget
        src="${config_account}/widget/components.profileInfo.CoverUploader"
        props={{
          onChange: (e) =>
            setImages({
              ...images,
              backgroundImage: e,
            }),
        }}
      />
    </div>
    <Button variant="primary" onClick={onSubmit}>
      continue
    </Button>
  </Container>
);
