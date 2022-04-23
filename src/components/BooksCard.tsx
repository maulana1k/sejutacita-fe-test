import { ReactElement, useContext } from "react";
import { BooksContext } from "../Context";
import { Link } from "react-router-dom";
import Bookmark from "./Bookmark.svg";

function BooksCard(props: { item: any }): ReactElement {
  const { item } = props;
  const booksContext = useContext(BooksContext);
  const { bookmark, addBookmark, removeBookmark } = booksContext;
  return (
    <div className=" md:w-64 rounded border relative w-full overflow-hidden hover:shadow-lg m-4 flex-col flex ">
      <img
        onClick={() => {
          !bookmark.includes(item)
            ? addBookmark(item)
            : removeBookmark(item.id);
        }}
        className={`z-10 w-10 transition-all active:scale-90 rounded-full p-2 hover:bg-blue-400 ${
          bookmark.includes(item) ? "bg-blue-500" : "bg-slate-600/50"
        }  absolute top-2 right-2`}
        src={Bookmark}
        alt=""
      />
      <Link to={"/detail/" + item.id} state={item}>
        <img className="md:w-64 w-full" src={item.cover_url} alt="" />
        <div className="p-4">
          <div className=" mt-2 font-bold text-xl">{item.title}</div>
          <div className="text-slate-500">
            {item.authors.map((el: string) =>
              el != item.authors.slice(-1) ? el + " & " : el
            )}
          </div>
          <div className=" text-slate-500 text-sm">
            {item.sections.length} section
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BooksCard;
