// src/redux/portfolioSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";

// 1. READ
export const fetchPortfolios = createAsyncThunk(
  "portfolio/fetch",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("portofolio")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return rejectWithValue(error.message);
    return data;
  },
);

// 2. DELETE
export const deletePortfolio = createAsyncThunk(
  "portfolio/delete",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("portofolio").delete().eq("id", id);
    if (error) return rejectWithValue(error.message);
    return id;
  },
);

// 3. CREATE
export const addPortfolio = createAsyncThunk(
  "portfolio/add",
  async (newPortfolio, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("portofolio")
      .insert([newPortfolio])
      .select();
    if (error) return rejectWithValue(error.message);
    return data[0];
  },
);

// 4. UPDATE (FITUR BARU)
export const updatePortfolio = createAsyncThunk(
  "portfolio/update",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("portofolio")
      .update(updatedData)
      .eq("id", id) // Cocokkan dengan ID yang diedit
      .select();

    if (error) return rejectWithValue(error.message);
    return data[0]; // Kembalikan data yang sudah diperbarui
  },
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePortfolio.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(addPortfolio.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Menangani state setelah Update berhasil
      .addCase(updatePortfolio.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Ganti data lama dengan data baru di tabel UI
        }
      });
  },
});

export default portfolioSlice.reducer;
