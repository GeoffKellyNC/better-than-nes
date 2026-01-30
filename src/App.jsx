import { Router } from '@reach/router';
import { GlobalStyles } from './styles/GlobalStyles';
import { HomePage } from './pages/HomePage';
import { OutageDetailPage } from './pages/OutageDetailPage';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <HomePage path="/" />
        <OutageDetailPage path="/outage/:outageId" />
      </Router>
    </>
  );
}

export default App;
