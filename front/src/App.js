import Header from './components/Header';
import Posts from './components/Posts';
import {ThemeProvider, CSSReset} from '@chakra-ui/core';
import {customTheme} from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Header />
      <Posts />
    </ThemeProvider>
  );
}

export default App;
