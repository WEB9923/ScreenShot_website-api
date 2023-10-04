import ReactDOM from 'react-dom/client'
import './index.css'
import {
  JSX,
  Suspense,
  lazy,
  LazyExoticComponent
} from "react";
import Loader from "./components/Loader.tsx";
const App: LazyExoticComponent<() => JSX.Element> = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loader loadingText={"loading..."}/>}>
    <App />
  </Suspense>
)
