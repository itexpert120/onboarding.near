const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const pages = [
  "${config_account}/widget/page.profileInfo.Profile",
  "${config_account}/widget/page.profileInfo.Avatar",
  "${config_account}/widget/page.profileInfo.Theme",
  "${config_account}/widget/page.profileInfo.Deploy",
  "${config_account}/widget/page.profileInfo.Post",
];

const [currentPage, setCurrentPage] = useState(pages[1]);
const toggleNextPage = useCallback(() => {
  const nextPage = pages[pages.indexOf(currentPage) + 1];
  if (nextPage) {
    setCurrentPage(nextPage);
  }
}, [currentPage]);
const togglePreviousPage = useCallback(() => {
  const nextPage = pages[pages.indexOf(currentPage) - 1];
  if (nextPage) {
    setCurrentPage(nextPage);
  }
}, [currentPage]);

const Container = styled.div`
  max-width: 442px;
  margin: 24px auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
`;

return (
  <Container>
    <Widget
      src="${config_account}/widget/components.profileInfo.PageIndicator"
      loading=""
      props={{
        page: currentPage,
        pages: pages,
        setCurrentPage,
      }}
    />
    <Widget
      src={currentPage}
      loading=""
      props={{
        toggleNextPage,
      }}
    />
    {currentPage !== pages[0] && (
      <Button variant="tertiary" onClick={togglePreviousPage}>
        <i className="bi bi-arrow-left"></i>back
      </Button>
    )}
  </Container>
);
