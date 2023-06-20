import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';
import ErrorContainer from './errorHandling/ErrorContainer';

function App() {
  
  return (
  <BrowserRouter>
    <Layout>
      <ErrorContainer>
        <Routing />
      </ErrorContainer>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
