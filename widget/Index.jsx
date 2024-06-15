const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => <Widget src="${config_account}/widget/components.Header" />,
    Footer: () => <></>,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/page.home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
    },
  },
};
return (
  <div>
    <Widget
      src="${config_account}/widget/app.View"
      props={{ config, ...props }}
    />
  </div>
);
