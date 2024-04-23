// Core
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="my-8 flex w-full items-center justify-center px-48 py-4">
      <Image src="/idt-logo.png" alt="next logo" width={100} height={100} />
    </footer>
  );
};
