import GlobalStyle from "../GlobalStyle";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
