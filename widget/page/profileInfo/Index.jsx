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

const [currentPage, setCurrentPage] = useState(pages[0]);
const toggleNextPage = useCallback(() => {
  const nextPage = pages[pages.indexOf(currentPage) + 1];
  if (nextPage) {
    setCurrentPage(nextPage);
  }
}, [currentPage]);

const Container = styled.div`
  max-width: 442px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <Widget src={currentPage} loading="" />
    <Button onClick={toggleNextPage}>continue</Button>
  </Container>
);
