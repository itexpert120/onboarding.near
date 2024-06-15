const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};

const { ChevronDown } = VM.require("${config_account}/widget/icons");

const accountId = context.accountId;

if (!accountId) {
  return <Button variant="secondary">Connect</Button>;
}

const profile = Social.getr(`${accountId}/profile`);

const [dropdown, setDropdown] = useState(false);

return (
  <Button variant="secondary" className="px-2">
    <Avatar accountId={accountId} size="24px" />
    {profile.name ?? accountId}
    <ChevronDown />
  </Button>
);
