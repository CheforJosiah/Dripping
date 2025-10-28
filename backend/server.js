const express = require("express");
const cors = require("cors");
const { supabase } = require("./supabaseClient");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Fetching all products
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, image_url, description, categories(name), rating, rating_count, rating_url");

  if (error) return res.status(400).json({ error });
  res.json(data);
});


// Posting new product
app.post("/api/products", async (req, res) => {
  const { name, description, price, image_url, category_id, rating, rating_count, rating_url } = req.body;

  const { data, error } = await supabase 
  .from("products")
  .insert([{ name, description, price, image_url, category_id, rating, rating_count, rating_url }])
  .select();

  if(error) return res.status(400).json({ error });
  res.json(data);
});

// Deleting a product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error });
  res.json(data);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));