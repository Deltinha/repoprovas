import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
// import { GlobalStyle } from './styles/GlobalStyle';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <GlobalStyle /> */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
