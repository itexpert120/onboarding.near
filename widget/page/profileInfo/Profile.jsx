if (!context.accountId) {
  return <div>Please connect your wallet</div>;
}

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
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 16px;

  .form-group {
    gap: 6px;
    display: flex;
    flex-direction: column;

    label {
      color: var(--Gray-12, #171717);

      /* Text/S - 14px/Medium */

      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 19.6px */
      letter-spacing: -0.14px;
    }
    input,
    textarea {
      border-radius: 12px !important;
      border: 1px solid var(--Gray-6, #e2e2e2) !important;
      background: var(--BG-Main, #fff) !important;
    }
  }

  .rbt-input-multi.form-control {
    border-radius: 12px !important;
    border: 1px solid var(--Gray-6, #e2e2e2) !important;
    background: var(--BG-Main, #fff) !important;
    padding: 8px;
  }
`;

const [formState, setFormState] = useState({});

const profile = Social.getr(`${context.accountId}/profile`);

if (profile) {
  setFormState({
    name: formState.name ?? profile.name,
    about: formState.about ?? profile.description,
    tags: formState.tags ?? Object.keys(profile.tags),
    ...(Object.keys(profile.linktree).length > 0 && {
      twitter: formState.twitter ?? profile.linktree.twitter,
      github: formState.github ?? profile.linktree.github,
      telegram: formState.telegram ?? profile.linktree.telegram,
      website: formState.website ?? profile.linktree.website,
    }),
  });
}

const onInputChange = (e) => {
  setFormState((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
  }));
};

const onSubmit = () => {
  const hasRequiredInfo = formState.name || formState.about || formState.tags;
  const hasLinktreeInfo = ["twitter", "github", "telegram", "website"].some(
    (key) => formState[key]
  );

  if (!hasRequiredInfo && !hasLinktreeInfo) {
    props.toggleNextPage();
  } else {
    const tagsWithEmpty = (formState.tags ?? []).reduce((acc, current) => {
      acc[current] = "";
      return acc;
    }, {});

    const linktree = ["twitter", "github", "telegram", "website"].reduce(
      (acc, key) => {
        if (formState[key]) {
          acc[key] = formState[key];
        }
        return acc;
      },
      {}
    );

    console.log(tagsWithEmpty);

    const profile = {
      ...(formState.name && { name: formState.name }),
      ...(formState.about && { description: formState.about }),
      ...(Object.keys(linktree).length > 0 && { linktree }),
      ...(Object.keys(tagsWithEmpty).length > 0 && { tags: tagsWithEmpty }),
    };

    Social.set(
      { profile },
      {
        onCommit: () => {
          props.toggleNextPage();
        },
      }
    );
  }
};

console.log(formState);

return (
  <Container>
    <h1 className="heading">Tell us about yourself</h1>
    <FormGroup>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="name"
          value={formState.name}
          onChange={onInputChange}
          placeholder="Your preferred name"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="name">About</label>
        <small id="emailHelp" class="form-text text-muted">
          Supports Markdown
        </small>
        <textarea
          type="text"
          class="form-control"
          id="about"
          value={formState.about}
          onChange={onInputChange}
          placeholder="Your preferred name"
          style={{ minHeight: "125px" }}
        ></textarea>
        <small
          id="emailHelp"
          class={`form-text ${
            formState.about.length > 1000 ? "text-danger" : "text-muted"
          }`}
        >
          {formState.about.length || 0} / 1000
        </small>
      </div>
      <div>
        <div className="form-group mb-2">
          <label htmlFor="name">Tags</label>
        </div>
        <Typeahead
          options={["bos", "near", "dev", "builders"]}
          placeholder="Select one or many"
          multiple
          selected={formState.tags}
          onChange={(e) => {
            setFormState((prev) => ({
              ...prev,
              tags: e.map((tag) => (tag.customOption ? tag.label : tag)),
            }));
          }}
          allowNew={true}
          style={{ width: "100%" }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Twitter</label>
        <input
          type="text"
          class="form-control"
          id="twitter"
          value={formState.twitter}
          onChange={onInputChange}
          placeholder="username"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="name">Github</label>
        <input
          type="text"
          id="github"
          onChange={onInputChange}
          value={formState.github}
          class="form-control"
          placeholder="username"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="name">Telegram</label>
        <input
          type="text"
          id="telegram"
          onChange={onInputChange}
          value={formState.telegram}
          class="form-control"
          placeholder="username"
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="name">Website</label>
        <input
          type="text"
          id="website"
          onChange={onInputChange}
          value={formState.website}
          class="form-control"
          placeholder="https:// website"
        ></input>
      </div>
    </FormGroup>
    <Button
      variant="primary"
      disabled={formState.about.length > 1000}
      onClick={onSubmit}
    >
      continue
    </Button>
  </Container>
);
