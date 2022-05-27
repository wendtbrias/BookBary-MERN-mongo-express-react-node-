import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import {
  Homepage,
  BookPage,
  AddBook,
  MainBook,
  BookDetail,
  UpdateBook,
  AuthorPage,
  MainAuthor,
  AddAuthor,
  AuthorDetail,
} from "./pages";
import React from "react";
import Author from "./pages/Author";

export default function App() {
  return (
    <>
      <section className="app sm:w-full min-h-screen bg-gray-800">
        <div className="w-[80%] mx-auto">
          <Navbar />
          <Routes>
            <Route index path="/" element={<Homepage />} />
            <Route element={<MainBook />}>
              <Route index path="book" element={<BookPage />} />
              <Route path="/book/:id" element={<BookDetail />} />
              <Route path="/book/add" element={<AddBook />} />
              <Route path="/book/update/:id" element={<UpdateBook />} />
            </Route>
            <Route element={<MainAuthor />}>
              <Route path="author" element={<AuthorPage />} />
              <Route path="/author/:id" element={<AuthorDetail />} />
              <Route path="/author/add" element={<AddAuthor />} />
            </Route>
          </Routes>
        </div>
      </section>
    </>
  );
}
