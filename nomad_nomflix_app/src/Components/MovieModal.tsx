import { AnimatePresence, useViewportScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { makeImgagePath } from '../utils';

import {
  Overlay,
  BigMovie,
  BigCover,
  BigMain,
  BigTitle,
  BigText,
  BigImg,
  BigOverbiew,
} from '../styled/MainConent';

import { getMovieDetail, IGetMovieDetail } from '../api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

interface IModal {
  modal: string;
}

// 영화 List click modal창 on/off animations
const itemVariants = {
  hidden: { opacity: 0 },
  active: {
    opacity: 1,
    transition: {
      duration: 1,
      type: 'tween',
    },
  },
};

const Modal = ({ modal }: IModal) => {
  const [modalData, setModalData] = useState<IGetMovieDetail>();
  const { scrollY } = useViewportScroll();
  const history = useNavigate();

  const onOverlayClick = () => history('/'); // home으로 이동

  const { data: detail } = useQuery<IGetMovieDetail>(
    ['search', 'detail'],
    () => getMovieDetail(modal),
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
            initial='hidden'
            animate='active'
            transition={{ type: 'tween', duration: 1 }}
          />

          <BigMovie layoutId={modal} style={{ top: scrollY.get() + 200 }}>
            {modalData && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgagePath(
                      modalData.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <BigMain>
                  <BigTitle>{modalData.title}</BigTitle>
                  <BigText>
                    <span>개봉일</span>
                    {modalData.release_date}
                    <span>평점</span>⭐ {modalData.vote_average} 점
                    <span>언어</span>
                    {modalData.original_language.toUpperCase()}
                  </BigText>
                  <BigImg
                    style={{
                      backgroundImage: `url(${makeImgagePath(
                        modalData.poster_path,
                        'w200'
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

export default Modal;
