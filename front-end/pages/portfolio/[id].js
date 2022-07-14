/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import AppLayout from "../../components/AppLayout";
import dynamic from "next/dynamic";
import { Affix, Button, Avatar, Comment, Form, Input, List } from "antd";
import { loadPortfolio } from "../../actions/portfolio";
import wrapper from "../../store";
import { useSelector } from "react-redux";
import CommentEditor from "../../components/Portfolo/CommentEditor";
import CommentList from "../../components/Portfolo/CommentList";
import useComment from "../../hooks/useComment";
const { TextArea } = Input;

const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, {
  ssr: false,
});
// const { CodeBoxOutput } = dynamic(async () => (await import("editorjs-react-renderer")).default, {
//   ssr: false,
// });

const Portfolio = () => {
  const { singlePortfolio } = useSelector((state) => state.portfolio);
  const { me } = useSelector((state) => state.user);
  console.log(singlePortfolio);
  const affixCss = css`
    .ant-affix {
      right: 200px;
    }
  `;
  const [submitting, handleChange, handleSubmit, value] = useComment({
    ...me,
    imgUrl: "https://joeschmoe.io/api/v1/random",
    _id: singlePortfolio._id,
  });

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <AppLayout>
      <Affix offsetTop={240} css={affixCss}>
        <Button type="primary" onClick={() => {}}>
          Affix top
        </Button>
      </Affix>

      <div style={{ marginBottom: "3rem" }}>{}</div>

      <div style={{ maxWidth: "800px", margin: "0 auto", height: "100%" }}>
        {isJsonString(singlePortfolio.content) ? (
          <Output data={JSON.parse(singlePortfolio.content)} />
        ) : (
          <div>{singlePortfolio.content}</div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        {singlePortfolio.comments.length > 0 && <CommentList comments={singlePortfolio.comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <CommentEditor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    </AppLayout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  // const cookie = context.req ? context.req.headers.cookie : "";
  // axios.defaults.headers.Cookie = "";
  // // 쿠키가 브라우저에 있는경우만 넣어서 실행
  // // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
  // if (context.req && cookie) {
  //   axios.defaults.headers.Cookie = cookie;
  // }
  await store.dispatch(loadPortfolio({ portfolioId: params.id }));
  //await store.dispatch(loadMyInfo());

  return {
    props: {},
  };
});

export default Portfolio;
