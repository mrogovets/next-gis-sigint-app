import Navbar from "./Navbar";

export default function Layout({ children, isSBMenuOpen }) {
  return (
    <>
      <Navbar isSBMenuOpen={isSBMenuOpen} />
      <main>{children}</main>
    </>
  );
}
