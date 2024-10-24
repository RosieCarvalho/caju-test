import Router from '~/router';
import { Header } from './components/Header';
import { CandidatesProvider } from './context/CandidatesContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <CandidatesProvider>
        <Router />
      </CandidatesProvider>
      <Toaster />
    </>
  );
}

export default App;
