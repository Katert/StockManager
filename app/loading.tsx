"use client";

// Components
import { CircleLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className="mx-48 flex flex-grow items-center justify-center">
      <CircleLoader color="grey" size={50} />
    </section>
  );
};

export default Loading;
