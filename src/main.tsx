import ReactDOM from 'react-dom/client'
import './index.css'
import React from "react";
import Loader from "./components/Loader.tsx";
const App: React.LazyExoticComponent<() => React.JSX.Element> = React.lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Suspense fallback={<Loader loadingText={"loading..."}/>}>
    <App />
  </React.Suspense>
)
