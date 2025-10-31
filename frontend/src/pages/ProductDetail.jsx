import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let res;
        try {
          res = await axios.get(`http://localhost:4000/api/products/${id}`);
        } catch (e) {
          const all = await axios.get("http://localhost:4000/api/products");
          res = { data: all.data.find(p => p.id === id) };
        }

        const prod = res.data;
        if (!prod) throw new Error("Product not found");
        setProduct(prod);
        setMainImage(prod.main_image_url || (prod.gallery_urls && prod.gallery_urls[0]) || prod.image_url);

        try {
          const rel = await axios.get(`http://localhost:4000/api/products/${id}/related`);
          setRelated(rel.data || []);
        } catch (e) {
          const all = await axios.get("http://localhost:4000/api/products");
          setRelated(
            all.data.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 4)
          );
        }
      } catch (err) {
        console.error("Product load failed", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  const changeQty = (delta) => setQty((prev) => Math.max(1, prev + delta));

  const addToCart = async () => {
    if (!product) return;
    try {
      await axios.post("http://localhost:4000/cart/add", {
        user_id: "8e979bfa-b949-44c3-b096-0bb83007babc",
        product_id: product.id,
        quantity: qty,
      });
      alert("Product added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="notfound">Product not found</div>;

  const htmlDesc = product.description_long || product.description || "";

  return (
    <>
      <Header />
      <main className="container">
        <section className="breadcrumb">
          <h5 className="category">{product.category || "Category"}</h5>
          <p>Home &gt; Shop Page &gt; {product.category}</p>
        </section>

        <section className="topRow">
          <div className="leftCol">
            <div className="imageWrap">
              <div className="mainImageBox">
                <img className="mainImage" src={mainImage} alt={product.name} />
              </div>

              <div className="thumbnailRow">
                {(product.gallery_urls && product.gallery_urls.length
                  ? product.gallery_urls
                  : product.image_url
                  ? [product.image_url]
                  : []
                ).map((u, i) => (
                  <button key={i} className="thumbBtn" onClick={() => setMainImage(u)}>
                    <img src={u} alt={`${product.name} ${i}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rightCol">
            <h1 className="title">{product.name}</h1>

            <div className="priceRow">
              <div className="price">{Number(product.price).toFixed(2)} frs</div>
              <div className="rating">
                <span className="ratingStars">{product.rating || 0}</span>
                <span className="ratingCount">({product.rating_count || 0})</span>
              </div>
            </div>

            <div className="stockAdd">
              <div className="stock">
                {product.in_stock ? (
                  <span className="inStock">IN STOCK</span>
                ) : (
                  <span className="outStock">OUT OF STOCK</span>
                )}
              </div>

              <div className="qtyControl">
                <button onClick={() => changeQty(-1)} className="qtyBtn">-</button>
                <input className="qtyInput" readOnly value={qty} />
                <button onClick={() => changeQty(1)} className="qtyBtn">+</button>
              </div>

              <div className="actionButtons">
                <button onClick={addToCart} className="primaryBtn">Add To Cart</button>
                <button className="secondaryBtn">Buy Now</button>
              </div>

              <div className="meta">
                <div>SKU: <span className="metaValue">{product.sku}</span></div>
                <div>Category: <span className="metaValue">{product.category}</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="descriptionSection">
          <h3 className="sectionTitle">Description</h3>
          <div className="descriptionText">
            <div dangerouslySetInnerHTML={{ __html: htmlDesc.replace(/\n/g, "<br/>") }} />
          </div>

          {/* <div className="specs">
            <h4>Additional information</h4>
            {product.specs && Object.keys(product.specs).length ? (
              <ul>
                {Object.entries(product.specs).map(([k, v]) => (
                  <li key={k}><strong>{k}:</strong> {v}</li>
                ))}
              </ul>
            ) : null}
          </div> */}
        </section>

        <section className="relatedSection">
          <h3 className="sectionTitle">Related products</h3>
          <div className="relatedGrid">
            {related.map(r => (
              <div key={r.id} className="relatedCard">
                <Link to={`/product/${r.id}`} className="relatedImageWrap">
                  <img src={r.main_image_url || r.image_url} alt={r.name} />
                </Link>
                <div className="relatedInfo">
                  <Link to={`/product/${r.id}`} className="relatedName">{r.name}</Link>
                  <div className="relatedPrice">{Number(r.price).toFixed(2)} frs</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
