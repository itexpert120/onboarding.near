const { Refresh } = VM.require("${config_account}/widget/icons") || {
  Refresh: () => <></>,
};

const { Button } = VM.require("${config_account}/widget/components.Button") || {
  Button: () => <></>,
};

const { Avatar } = VM.require("${config_account}/widget/components.Avatar") || {
  Avatar: () => <></>,
};

const image = props.image;
const onChange = props.onChange;

const Tab = {
  Upload: "Upload",
  NFT: "NFT",
  URL: "URL",
};

const origTab = () =>
  image.nft.contractId || image.nft.tokenId
    ? Tab.NFT
    : !image.ipfs_cid && image.url
    ? Tab.URL
    : Tab.Upload;

State.init({
  origImage: image,
  tab: origTab(),
  url: image.url,
  nft: image.nft ?? {},
  img: { cid: image.ipfs_cid },
});

const setTab = (tab) => State.update({ tab });

if (JSON.stringify(image) !== JSON.stringify(state.origImage)) {
  State.update({
    origImage: image,
  });
}

let localImage = {};

if (state.origImage.nft.contractId || state.origImage.nft.tokenId) {
  localImage.nft = {};
  if (state.origImage.nft.contractId) {
    localImage.nft.contractId = null;
  }
  if (state.origImage.nft.tokenId) {
    localImage.nft.tokenId = null;
  }
}
if (state.origImage.ipfs_cid) {
  localImage.ipfs_cid = null;
}
if (state.origImage.url) {
  localImage.url = null;
}

if (state.tab === Tab.NFT && (state.nft.contractId || state.nft.tokenId)) {
  localImage.nft = {
    contractId: state.nft.contractId || "",
    tokenId: state.nft.tokenId || "",
  };
} else if (state.tab === Tab.Upload && state.img.ipfs_cid) {
  localImage.ipfs_cid = state.img.ipfs_cid;
}
if (state.tab === Tab.URL && state.url) {
  localImage.url = state.url;
}

if (onChange && JSON.stringify(image) !== JSON.stringify(localImage)) {
  onChange(localImage);
}

const NavTabs = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  padding-bottom: 0;
  border: 1px solid #e2e2e2;
  border-radius: 12px 12px 0 0;
  margin: 0;

  li {
    list-style: none;
    padding-bottom: 4px;
    border-bottom: 1.5px solid #fff;
    padding-left: 8px;
    padding-right: 8px;
  }

  .nav-link {
    color: #6f6f6f;
    font-family: Poppins, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 19.6px */
    letter-spacing: -0.14px;
  }

  li:has(.active) {
    border-bottom: 1.5px solid #171717;
    .nav-link {
      color: #171717;
    }
  }
`;

const MutedText = styled.span`
  color: #6f6f6f;
  font-family: Poppins, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 16.8px */
  letter-spacing: -0.12px;
`;

const AvatarUploader = ({ setImage }) => {
  const [img, setImg] = useState(null);
  const [msg, setMsg] = useState(
    <>
      <i className="bi bi-upload"></i> upload
    </>
  );

  const uploadFile = (files) => {
    setMsg("Uploading...");

    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: files[0],
    })
      .catch((e) => {
        console.error(e);
        setMsg("Failed to upload");
      })
      .then((res) => {
        setImg(res.body.cid);
        setMsg(
          <>
            <Refresh /> replace
          </>
        );
        State.update({
          ...state,
          img: {
            ipfs_cid: res.body.cid,
          },
        });
      });
  };

  return (
    <div className="d-flex gap-3">
      {img ? (
        <img
          src={`https://ipfs.near.social/ipfs/${img}`}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Avatar />
      )}
      <div className="d-flex flex-column gap-2">
        <MutedText>
          PNG or JPEG files at least 400x400px, less than 100MB
        </MutedText>
        <div className="d-flex gap-2">
          <Files
            multiple={false}
            accepts={["image/*"]}
            clickable
            style={{ cursor: "pointer" }}
            onChange={(f) => uploadFile(f)}
          >
            <Button
              variant={img ? "secondary" : "primary"}
              size="small"
              className="px-3"
            >
              {msg}
            </Button>
          </Files>
          {img && (
            <Button
              type="danger"
              size="small"
              className="px-3"
              onClick={() => {
                setImg(null);
                setImage({});
              }}
            >
              <i className="bi bi-trash"></i>remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

return (
  <div>
    <NavTabs>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.Upload ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Upload)}
        >
          Upload
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.NFT ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.NFT)}
        >
          NFT
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.URL ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.URL)}
        >
          URL
        </button>
      </li>
    </NavTabs>
    <div
      className="p-2"
      style={{
        background: "#fff",
        border: "solid 1px #e2e2e2",
        borderTop: 0,
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        minHeight: "9em",
      }}
    >
      <div className={`${state.tab === Tab.Upload ? "" : "visually-hidden"}`}>
        <AvatarUploader />
      </div>
      <div className={`${state.tab === Tab.NFT ? "" : "visually-hidden"}`}>
        NFT contract
        <input
          type="text"
          value={state.nft.contractId}
          onChange={(e) =>
            State.update({ nft: { ...state.nft, contractId: e.target.value } })
          }
        />
        NFT token id
        <input
          type="text"
          value={state.nft.tokenId}
          onChange={(e) =>
            State.update({ nft: { ...state.nft, tokenId: e.target.value } })
          }
        />
      </div>
      <div className={`${state.tab === Tab.URL ? "" : "visually-hidden"}`}>
        Image URL
        <input
          type="text"
          value={state.url}
          onChange={(e) => State.update({ url: e.target.value })}
        />
      </div>
    </div>
  </div>
);
