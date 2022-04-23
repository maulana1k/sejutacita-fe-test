import { ReactElement } from "react";
import BooksCard from "../components/BooksCard";
export default function Bookmark(props: any): ReactElement {
  return (
    <div className="p-4 ">
      <div className="font-bold text-slate-700">All bookmark</div>
      <div className="flex flex-wrap">
        {props.bookmark.map((item: any) => (
          <BooksCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
