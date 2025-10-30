const express = require("express");
const cors = require("cors");
const { supabase } = require("./supabaseClient");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// Fetching all products
app.get("/api/products", async (req, res) => {
  const { category, search } = req.query;
  let query = supabase.from("products").select("*");
  if (category) query = query.eq("category", category);
  if (search) { query = query.or(`name.ilike.%${search}%,category.ilike.%${search}%`); }

  const { data, error } = await query;

  if (error) return res.status(400).json({ error });
  res.json(data);
});


// Posting new product
app.post("/api/products", async (req, res) => {
  const { name, description, price, image_url, category, rating, rating_count, rating_url } = req.body;

  const { data, error } = await supabase 
  .from("products")
  .insert([{ name, description, price, image_url, category, rating, rating_count, rating_url }])
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


app.get("/api/cart", async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from("cart_items")
    .select(`id, quantity, product_id (id, name, price, image_url, category, rating)`)
    .eq("user_id", "8e979bfa-b949-44c3-b096-0bb83007babc");

  if (error) return res.status(400).json({ error });
  res.json(data);
});



// app.get("/api/cart/:user_id", async (req, res) => {
//   const { user_id } = req.params;

//   try {
//     const { data, error } = await supabase
//       .from("cart_items")
//       .select(`
//         id,
//         quantity,
//         products (
//           id,
//           name,
//           price,
//           image_url,
//           category,
//           rating
//         )
//       `)
//       .eq("user_id", "8e979bfa-b949-44c3-b096-0bb83007babc");

//     if (error) throw error;
//     res.json(data);
//   } catch (err) {
//     console.error("Error fetching cart items:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// Adding item to cart
app.post("/cart/add", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    // checking if product is already in user's cart
    const { data: existing } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", product_id)
      .single();

    if (existing) {
      // I'm updating just the quantity if it exists
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id)
        .select();

      if (error) throw error;
      return res.json(data[0]);
    }

    // If cart item doesn't exist, I'm inserting a new cart item row
    const { data, error } = await supabase
      .from("cart_items")
      .insert([{ user_id, product_id, quantity }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));