/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { useRouter } from "next/router";
import { Avatar, Card } from "antd";
import { ProfileCardContainer, ProfileCardContent, CardProfile } from "./styles/ProfileCardStyles";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const ProfileCard = () => {
  const [showUI, setShowUI] = useState(false);
  const { userinfo, count } = useSelector((state) => state.user.userInfo);
  const isresponsive = useMediaQuery({
    query: "(max-width:768px)",
  });
  useEffect(() => {
    if (isresponsive) {
      setShowUI(true);
    } else setShowUI(false);
  }, [isresponsive]);

  return (
    <Card css={ProfileCardContainer}>
      <div>
        <div css={CardProfile}>
          <Avatar
            size={showUI ? 100 : 150}
            src={
              !userinfo
                ? "/image/profile_image_default.jpg"
                : userinfo.imgUrl
                ? userinfo.imgUrl
                : "/image/profile_image_default.jpg"
            }
          />
          {userinfo && <p>{userinfo.nickname}</p>}
        </div>
        <div css={ProfileCardContent}>
          <div>
            <p>포트폴리오</p>
            <h3>{count && count.portfolioCount}</h3>
          </div>
          <div>
            <p>스크랩</p>
            <h3>{count && count.scrapCount}</h3>
          </div>
          <div>
            <p>질문</p>
            <h3>{count && count.questionCount}</h3>
          </div>
          <div>
            <p>답변</p>
            <h3>{count && count.answerCount}</h3>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
export default ProfileCard;
