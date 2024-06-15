const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};

const { ChevronDown, ChevronUp, Logout } = VM.require(
  "${config_account}/widget/icons"
) || {
  ChevronDown: () => <></>,
  ChevronUp: () => <></>,
  Logout: () => <></>,
};

const accountId = context.accountId;

if (!accountId) {
  return <Button variant="secondary">Connect</Button>;
}

const profile = Social.getr(`${accountId}/profile`);

const [dropdown, setDropdown] = useState(false);
const toggleDropdown = useCallback(() => setDropdown((prev) => !prev), []);

const MemoizedAvatar = useMemo(
  () => <Avatar accountId={accountId} size="24px" />,
  [accountId]
);

const DropdownContent = styled.div`
  position: absolute;
  margin-top: 8px;
  top: 100%;
  right: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: var(--bg-color, #ffffff);
  border: 1px solid var(--border-color, #e2e2e2);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  min-width: 100%;
  height: auto;
`;

return (
  <div className="position-relative">
    <Button variant="secondary" onClick={toggleDropdown} className="px-2">
      {MemoizedAvatar}
      {profile.name ?? accountId}
      {dropdown ? <ChevronUp /> : <ChevronDown />}
    </Button>
    {dropdown && (
      <DropdownContent>
        <Button
          variant="tertiary"
          type="danger"
          className="justify-content-start"
          onClick={toggleDropdown}
        >
          <Logout />
          Logout
        </Button>
      </DropdownContent>
    )}
  </div>
);
