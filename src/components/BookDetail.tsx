import { ReactElement } from "react";
import { useLocation } from "react-router-dom";

export default function BookDetail(): ReactElement {
  const book: any = useLocation().state;
  return (
    <>
      {book && (
        <div className="p-4 items-start w-full  flex flex-wrap  ">
          <img className="md:w-1/4 w-full" src={book.cover_url} alt="" />
          <div className="md:px-12 p-4 md:w-3/4 ">
            <div className="font-bold text-4xl">{book.title}</div>
            <div className="font-medium">
              By {book.authors.map((el: any) => el + " ")}
            </div>
            <div className="font-medium mt-4">Description</div>
            <div className="pre bg-slate-100 rounded p-2 whitespace-pre-line">
              {book.description}
            </div>
            <div className="my-4 font-bold text-xl">
              {book.sections.length} Sections
            </div>
            {book.sections.map((el: any) => (
              <div className="p-2 border-b">
                <div className="font-bold">{el.title}</div>
                <div className="text-slate-500">{el.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
