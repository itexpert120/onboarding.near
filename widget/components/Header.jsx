const { Logo } = VM.require("${config_account}/widget/components.Logo") || {
  Logo: () => <></>,
};

const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const Navbar = styled.div`
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #e2e2e2;
`;

return (
  <Navbar>
    <Logo />
    <div>
      <Widget
        src="${config_account}/widget/components.buttons.UserDropdown"
        loadin=""
      />
    </div>
  </Navbar>
);
