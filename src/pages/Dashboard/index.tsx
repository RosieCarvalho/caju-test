import Collumns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import ReactLoading from 'react-loading';
import { useContext } from 'react';
import { CandidatesContext } from '~/context/CandidatesContext';

const DashboardPage = () => {
  const { loadingDashboard } = useContext(CandidatesContext);
  return (
    <S.Container>
      <SearchBar />
      <Collumns />
      {loadingDashboard && (
        <S.Loadding>
          <ReactLoading
            color="rgba(232, 5, 55, 1)"
            type="bubbles"
            height={267}
            width={275}
          />
        </S.Loadding>
      )}
    </S.Container>
  );
};
export default DashboardPage;
