import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { makeImgagePath } from "../utils";

import {
  Overlay,
  BigMovie,
  BigCover,
  BigMain,
  BigTitle,
  BigText,
  BigImg,
  BigOverbiew,
} from "../styled/MainConent";

import { getTvDetail, IGetTvDetail } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

interface IModal {
  modal: string;
}

// Tv List click modal창 on/off animations
const itemVariants = {
  hidden: { opacity: 0 },
  active: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "tween",
    },
  },
};

const TvModal = ({ modal }: IModal) => {
  const [modalData, setModalData] = useState<IGetTvDetail>();
  const { scrollY } = useViewportScroll();
  const history = useNavigate();

  const onOverlayClick = () => history("/tv"); // tv으로 이동

  const { data: detail } = useQuery<IGetTvDetail>(
    ["tvshow", "detail"],
    () => getTvDetail(modal),
    { enabled: !!modal }
  );

  useEffect(() => {
    setModalData(detail);
  }, [detail]);

  return (
    <AnimatePresence>
      {modal && (
        <>
          <Overlay
            variants={itemVariants}
            onClick={onOverlayClick}
            initial="hidden"
            animate="active"
            transition={{ type: "tween", duration: 1 }}
          />

          <BigMovie layoutId={modal} style={{ top: scrollY.get() + 200 }}>
            {modalData && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgagePath(
                      modalData.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <BigMain>
                  <BigTitle>{modalData.name}</BigTitle>
                  <BigText>
                    <span>첫방영</span>
                    {modalData.first_air_date}
                    <span>평점</span>⭐ {modalData.vote_average} 점
                    <span>언어</span>
                    {modalData.original_language.toUpperCase()}
                  </BigText>
                  <BigImg
                    style={{
                      backgroundImage: `url(${makeImgagePath(
                        modalData.poster_path,
                        "w200"
                      )})`,
                    }}
                  />
                </BigMain>
                <BigOverbiew>{modalData.overview}</BigOverbiew>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
};

export default TvModal;
