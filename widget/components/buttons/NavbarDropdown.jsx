const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const { Menu } = VM.require("${config_account}/widget/icons") || {
  Menu: () => <></>,
};

const [dropdown, setDropdown] = useState(false);
const toggleDropdown = useCallback(() => setDropdown((prev) => !prev), []);

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
    <Button variant="secondary" icon onClick={toggleDropdown} className="px-2">
      <Menu />
    </Button>
    {dropdown && <DropdownContent>Content Here</DropdownContent>}
  </div>
);
