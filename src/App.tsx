import { useContext } from "react";
import { BooksContext } from "./Context";
import type { ReactElement } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Main from "./view/Main";
import Bookmark from "./view/Bookmark";
import BookDetail from "./components/BookDetail";
import "./App.css";

function App(): ReactElement {
  const location = useLocation();
  const booksContext = useContext(BooksContext);
  const { bookmark } = booksContext;

  return (
    <div className="min-h-screen  min-w-full">
      {/* <BookDetail /> */}
      <div className="font-bold text-xl bg-white border-b px-8 py-4">
        Sejutacita App
      </div>
      <div className="flex md:px-20 px-4 bg-slate-100 ">
        <Link to="/">
          <div
            className={`p-3 ${
              location.pathname === "/"
                ? "font-bold text-blue-500 border-b-4 border-blue-500"
                : ""
            }`}
          >
            All Books
          </div>
        </Link>
        <Link to="/bookmark">
          <div
            className={`p-3 ${
              location.pathname === "/bookmark"
                ? "font-bold text-blue-500 border-b-4 border-blue-500"
                : ""
            }`}
          >
            Bookmark ({bookmark.length})
          </div>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="bookmark" element={<Bookmark bookmark={bookmark} />} />
        <Route path="/detail/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
}

export default App;
