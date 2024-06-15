const currentPage = props.page;
const pages = props.pages;

const getPageKey = (page) => {
  const componentKey = page.split("/").pop();
  const pageKey = componentKey.split(".").pop();

  return pageKey;
};

const PageIndicator = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-radius: 4px;
  margin-top: 16px;

  .item {
    padding: 0 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 48px;
    color: #333;
    cursor: pointer;
    user-select: none;
    transition: all 0.2s ease-in-out;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translate(-50%, 50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #e2e2e2;
    }

    &.active {
      &::after {
        background-color: #000;
      }

      &::before {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translate(-50%, 50%);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: #e2e2e2;
      }
    }
  }
`;

const IndicatorLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 128px);
  height: 1px;
  background-color: #e2e2e2;
`;

return (
  <PageIndicator>
    <IndicatorLine />
    {pages.map((page) => {
      const pageKey = getPageKey(page);
      const isActive = pageKey === getPageKey(currentPage);
      return (
        <div
          key={pageKey}
          className={`item ${isActive ? "active" : ""}`}
          onClick={() => props.setCurrentPage(page)}
        >
          {pageKey}
        </div>
      );
    })}
  </PageIndicator>
);
