const BookCard = ({ book }) => {
  return (
    <div className="w-full">
      <img
        src={book.coverImage}
        className="w-full h-[280px] object-cover rounded-md"
      />
      <div className="w-full py-4">
        <h1 className="text-xl text-blue-400 font-bold ">{book.title}</h1>
        <a
          href={`/book/${book._id}`}
          className="underline text-blue-200 font-normal"
        >
          Detail
        </a>
      </div>
    </div>
  );
};

export default BookCard;
