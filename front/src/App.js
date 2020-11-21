import Header from './components/Header';
import Posts from './components/Posts';
import {ThemeProvider, CSSReset} from '@chakra-ui/core';
import {customTheme} from './theme/theme';
import {ReactQueryCacheProvider} from 'react-query';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ReactQueryCacheProvider>
        <CSSReset />
        <Header />
        <Posts />
      </ReactQueryCacheProvider>
    </ThemeProvider>
  );
}

export default App;
