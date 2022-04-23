import { useState, useEffect, useLayoutEffect, useContext } from "react";
import type { ReactElement } from "react";
import BooksCard from "../components/BooksCard";
import axios from "axios";
import { BooksContext } from "../Context";

export default function Main(props: any): ReactElement {
  const booksContext = useContext(BooksContext);
  const { books, setBooks, categories, setCategories } = booksContext;
  // const [books, setBooks] = useState<any[]>([]);
  // const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  // const { bookmark } = props;
  // const { addBookmark, removeBookmark } = props.bookmarkHandle;

  useEffect(() => {
    axios.get("/fee-assessment-categories").then((res) => {
      setCategories(res.data);
      setSelectedCategory(res.data[1].id);
    });
  }, []);
  useLayoutEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          "/fee-assessment-books?categoryId=" +
            selectedCategory +
            "&page=" +
            (page - 1)
        )
        .then((res) => {
          setBooks(res.data);
        });
    }
  }, [selectedCategory, page]);

  return (
    <>
      <div className="p-4 md:px-20">
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-slate-100 focus:outline-none"
          type="text"
          placeholder="search books"
        />
      </div>

      <div className="flex md:px-20 px-4">
        <div className="flex border p-2 py-1 rounded-full ">
          <div>Category: </div>
          <select
            name="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories &&
              categories.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center flex-wrap p-4">
        {books &&
          books
            .filter((item: any) => item.title.toLowerCase().includes(search))
            .map((item: any) => <BooksCard key={item.id} item={item} />)}
      </div>
      <div className="flex space-x-12 items-center justify-center p-4">
        {books.length ? (
          <>
            <button
              onClick={() => {
                if (page > 1) setPage(page - 1);
              }}
              className="bg-blue-500 text-white rounded-lg px-4 p-1 active:scale-90"
            >
              prev
            </button>
            <div className="text-blue-500 text-xl ">{page}</div>
            <button
              onClick={() => setPage(page + 1)}
              className="bg-blue-500 text-white rounded-lg px-4 p-1  active:scale-90"
            >
              next
            </button>
          </>
        ) : (
          <div className="font-bold text-slate-500 text-xl">
            retrieving books...
          </div>
        )}
      </div>
    </>
  );
}
