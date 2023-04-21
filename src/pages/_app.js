import ContextState from "@/context/ContextState";
import "@/styles/globals.css";
export default function App({ Component, pageProps }) {
  return (
    <ContextState>
      <Component {...pageProps} />
    </ContextState>
  );
}
