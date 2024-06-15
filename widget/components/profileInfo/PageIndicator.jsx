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

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #e2e2e2;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #e2e2e2;
      transform: translate(-50%, 50%);
      transition: all 0.2s ease-in-out;
      z-index: 2;
    }

    &.active {
      &::after {
        background-color: #000;
        width: 18px;
        height: 18px;
        border: 4px solid #e2e2e2;
      }
    }

    &.completed {
      &::after {
        background-color: #299764;
        width: 16px;
        height: 16px;
        border: 2px solid #299764;
      }

      &::before {
        background-color: #299764;
        z-index: 1;
        transform: translateX(calc(100% - 45px));
      }
    }
  }

  .item:first-child {
    &::before {
      transform: translateX(50%);
    }
  }

  .item:last-child {
    &::before {
      transform: translateX(-50%);
    }
  }
`;

return (
  <PageIndicator>
    {pages.map((page) => {
      const pageKey = getPageKey(page);
      const isActive = pageKey === getPageKey(currentPage);
      return (
        <div
          key={pageKey}
          className={`item ${isActive ? "active" : null} ${
            pages.indexOf(page) < pages.indexOf(currentPage)
              ? "completed"
              : null
          }`}
          onClick={() => props.setCurrentPage(page)}
        >
          {pageKey}
        </div>
      );
    })}
  </PageIndicator>
);
