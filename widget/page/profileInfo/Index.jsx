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

return (
  <div>
    <Widget src={currentPage} loading="" />
    <Button onClick={toggleNextPage}>continue</Button>
  </div>
);
