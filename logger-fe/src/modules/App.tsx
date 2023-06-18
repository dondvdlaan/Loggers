import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

function App() {
  
  return (
  <BrowserRouter>
    <Layout>
      <Routing />
    </Layout>
  </BrowserRouter>
  );
}

export default App;
