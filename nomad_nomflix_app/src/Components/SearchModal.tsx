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

import { getSearchDetail, IGetMovieDetail } from '../api';
import { useQuery } from 'react-query';

interface IPathname {
  type: string;
  id: string;
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

const SearchList = (modal: IPathname) => {
  const { scrollY } = useViewportScroll();
  const history = useNavigate();

  const onOverlayClick = () => history(-1); // home으로 이동

  const { data: detail } = useQuery<IGetMovieDetail>(
    ['Movie', 'searchMovie'],
    () => getSearchDetail(modal.type, modal.id),
    { enabled: !!modal.id }
  );

  return (
    <AnimatePresence>
      {modal.id && (
        <>
          <Overlay
            variants={itemVariants}
            onClick={onOverlayClick}
            initial='hidden'
            animate='active'
            transition={{ type: 'tween', duration: 1 }}
          />

          <BigMovie layoutId={modal.id} style={{ top: scrollY.get() + 200 }}>
            {detail && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgagePath(
                      detail.backdrop_path,
                      'w500'
                    )})`,
                  }}
                />
                <BigMain>
                  <BigTitle>{detail.title}</BigTitle>
                  <BigText>
                    <span>개봉일</span>
                    {detail.release_date}
                    <span>평점</span>⭐ {detail.vote_average} 점
                    <span>언어</span>
                    {/* {detail.original_language.toUpperCase()} */}
                  </BigText>
                  <BigImg
                    style={{
                      backgroundImage: `url(${makeImgagePath(
                        detail.poster_path,
                        'w200'
                      )})`,
                    }}
                  />
                </BigMain>
                <BigOverbiew>{detail.overview}</BigOverbiew>
              </>
            )}
          </BigMovie>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchList;
