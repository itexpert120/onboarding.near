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
    padding: 8px 12px;
    align-items: center;
    justify-content: space-between;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid var(--Gray-6, #e2e2e2);
    background: var(--Gray-2, #f8f8f8);
    .left {
      display: flex;
      gap: 8px;
      align-items: center;
      .input-field {
        display: flex; /* Add this line to ensure proper flex layout */
        align-items: center;
        flex: 1;

        input {
          &::placeholder {
            /* Correcting syntax to use & for nesting */
            color: var(--Blue-Light-11, var(--Blue-11, #006adc));
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
          }

          &:focus-visible {
            /* Correcting syntax to use & for nesting */
            outline: none;
            border: none;
            box-shadow: none;
          }
        }
      }
    }
  }
`;

const CopyToClipboardButton = () => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null); // Ref to store reference to input element

  const copyToClipboard = async () => {
    try {
      const inputValue = inputRef.current.value; // Fetch value from input field
      await navigator.clipboard.writeText(inputValue); // Copy input value to clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset copied state after 3 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
};

return (
  <Container>
    <div className="header">
      <h1 className="heading">Deploy to web4</h1>
      <p className="subheading">
        Your profile is looking amazing! Deploy to your .near.page to make your
        profile accessible to everyone on:
      </p>
    </div>
    <div className="content">
      <div className="left">
        <div className="avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g clip-path="url(#clip0_49_6546)">
              <path
                d="M18.3327 9.99984C18.3327 14.6022 14.6017 18.3332 9.99935 18.3332M18.3327 9.99984C18.3327 5.39746 14.6017 1.6665 9.99935 1.6665M18.3327 9.99984H1.66602M9.99935 18.3332C5.39698 18.3332 1.66602 14.6022 1.66602 9.99984M9.99935 18.3332C7.85954 16.0864 6.66602 13.1026 6.66602 9.99984C6.66602 6.89712 7.85954 3.9133 9.99935 1.6665M9.99935 18.3332C12.1392 16.0864 13.3327 13.1026 13.3327 9.99984C13.3327 6.89712 12.1392 3.9133 9.99935 1.6665M1.66602 9.99984C1.66602 5.39746 5.39698 1.6665 9.99935 1.6665"
                stroke="#5EB0EF"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_49_6546">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="input-field">
          <input
            type="text"
            class="form-group"
            id="post"
            placeholder="alexsmith.near.page"
            style={{
              border: "none",
              background: "var(--Gray-2, #f8f8f8)",
            }}
          ></input>
        </div>
      </div>
      <Button
        onClick={copyToClipboard}
        type="icon"
        variant="secondary"
        size="small"
        style={{
          width: "32px",
          height: "32px",
          padding: "0px 0px",
          borderRadius: "10px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <g clip-path="url(#clip0_92_3788)">
            <path
              d="M2.66732 10.6668C1.93398 10.6668 1.33398 10.0668 1.33398 9.3335V2.66683C1.33398 1.9335 1.93398 1.3335 2.66732 1.3335H9.33398C10.0673 1.3335 10.6673 1.9335 10.6673 2.66683M6.66732 5.3335H13.334C14.0704 5.3335 14.6673 5.93045 14.6673 6.66683V13.3335C14.6673 14.0699 14.0704 14.6668 13.334 14.6668H6.66732C5.93094 14.6668 5.33398 14.0699 5.33398 13.3335V6.66683C5.33398 5.93045 5.93094 5.3335 6.66732 5.3335Z"
              stroke="#171717"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_92_3788">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Button>
    </div>
    <Button variant="primary" onClick={onSubmit}>
      deploy
    </Button>
    <Button variant="tertiary">i'll do it later</Button>
  </Container>
);
