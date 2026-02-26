import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Scan } from "./pages/Scan";
import { ScanResults } from "./pages/ScanResults";
import { Login } from "./pages/Login";
import { History } from "./pages/History";
import { AccountSettings } from "./pages/AccountSettings";
import { CreatePost } from "./pages/CreatePost";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
      { path: "scan", Component: Scan },
      { path: "scan/results", Component: ScanResults },
      { path: "login", Component: Login },
      { path: "history", Component: History },
      { path: "settings", Component: AccountSettings },
      { path: "create-post", Component: CreatePost },
      { path: "*", Component: NotFound },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});