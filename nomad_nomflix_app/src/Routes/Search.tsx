import { useQuery } from 'react-query';
import { useLocation, useMatch, PathMatch } from 'react-router-dom';

import { getSearch, IGetSearch } from '../api';
import { SearchList, SearchModal } from '../Components';

// styled
import { Wrapper, Loader } from '../styled/MainBanner';
import { SliderWrapper, Slider, SliderTitle } from '../styled/MainConent';

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');

  const bigMovieMatch: PathMatch<string> | null = useMatch('/search/:type/:id');

  const { data, isLoading } = useQuery<IGetSearch>(
    ['search', keyword],
    () => getSearch(keyword!),
    { enabled: !!keyword }
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩중 ...</Loader>
      ) : (
        <SliderWrapper>
          <Slider>
            <SliderTitle>영화 검색결과 </SliderTitle>
            <SearchList
              items={data?.results!.filter(
                (movie) => movie.media_type === 'movie'
              )}
            />
          </Slider>

          <Slider>
            <SliderTitle>TV Show 검색결과 </SliderTitle>
            <SearchList
              items={data?.results!.filter((tv) => tv.media_type === 'tv')}
            />
          </Slider>
          <SearchModal
            type={bigMovieMatch?.params.type!}
            id={bigMovieMatch?.params.id!}
            // {...bigMovieMatch?.params}
          />
        </SliderWrapper>
      )}
    </Wrapper>
  );
};

export default Search;
