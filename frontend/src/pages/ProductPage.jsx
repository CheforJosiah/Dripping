import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function ProductPage() {

  return (
    <>
      <title>Products</title>

      <Header />

      <div className="search">

        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="" alt="Search" />
        </button>
      </div>

      <Footer />
    </>
  )
}
