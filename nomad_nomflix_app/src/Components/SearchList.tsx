import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { makeImgagePath } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';

// icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';

//styled
import { Row, Info } from '../styled/SliderContent';
import { SearchResult } from '../api';

interface SlideContentProps {
  items?: SearchResult[];
}

// 영화 List hover시 animations
const boxVariants = {
  normal: {
    scale: 1,
    boxShadow: '0px 0px 5px rgba(0,0,0,0)',
  },
  hover: {
    scale: 1.3,
    boxShadow: '0px 0px 30px rgba(0,0,0,1), 0px 0px 15px rgba(0,0,0,1)',
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

// 영화 List hover시 하단 설명 animations
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: 'tween',
    },
  },
};

const SearchList = ({ items }: SlideContentProps) => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const history = useNavigate();

  // 서치 리스트 상세정보
  const onBoxClicked = (type: string, item: number) => {
    history(`/search/${type}/${item}?keyword=${keyword}`);
  };

  return (
    <>
      <AnimatePresence>
        <Row
          className='none'
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 1 }}
        >
          {items &&
            items.slice(1).map((item) => (
              <Box
                layoutId={item.id + ''}
                key={item.id}
                whileHover='hover'
                initial='normal'
                variants={boxVariants}
                onClick={() => onBoxClicked(item.media_type, item.id)}
                transition={{ type: 'tween' }}
                bgPhoto={makeImgagePath(item.poster_path, 'w500')}
              >
                <Info variants={infoVariants}>
                  <div>
                    <h4>{item.title}</h4>
                    <p>
                      <span>
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faShareNodes} />
                      </span>
                    </p>
                  </div>

                  <p>
                    <span className='mini'>첫방영</span>
                    {item.first_air_date}
                    <span className='mini'>평점</span>⭐ {item.vote_average} 점
                  </p>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </>
  );
};

const Box = styled(motion.div)<{ bgPhoto: string }>`
  margin-bottom: 60px;
  height: 450px;
  background-color: #fff;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 6px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export default SearchList;
