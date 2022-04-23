import { createContext, ReactChild, ReactElement, useState } from "react";

export const BooksContext = createContext<any>([]);

export function ContextProvider(props: { children: ReactChild }): ReactElement {
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [bookmark, setBookmark] = useState<any[]>([]);

  const addBookmark = (data: any) => {
    const newBookmark = [...new Set<any>([...bookmark, data])];
    setBookmark(newBookmark);
  };
  const removeBookmark = (id: number) => {
    const newBookmark = [...bookmark.filter((el: any) => el.id !== id)];
    setBookmark(newBookmark);
  };
  const contextValue = {
    books,
    setBooks,
    categories,
    setCategories,
    bookmark,
    addBookmark,
    removeBookmark,
  };
  return (
    <BooksContext.Provider value={contextValue}>
      {props.children}
    </BooksContext.Provider>
  );
}
