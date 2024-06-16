const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: 32px;

  .heading {
    color: var(--profile-heading-color, #171717);
    text-align: center;
    font-size: 28px;
    letter-spacing: -1.12px;
    margin: 0px;
  }
`;

return (
  <div>
    <h1 className="heading">Upload Photo</h1>
  </div>
);
