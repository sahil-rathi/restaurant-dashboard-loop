import React, { createContext } from "react";

interface BookmarkContextInterface {
  bookmarks: string[];
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
}

const bookmarkContext = createContext<BookmarkContextInterface>({
  bookmarks: [],
  setBookmarks: (value: any) => {},
});

export default bookmarkContext;
