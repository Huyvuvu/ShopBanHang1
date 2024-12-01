import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    // Thêm hoặc cập nhật sản phẩm
    addUpdateItem: (state, action) => {
      const item = action.payload; // Sản phẩm từ action.payload
      const existItemIndex = state.items.findIndex((i) => i.id === item.id);

      if (existItemIndex === -1) {
        // Thêm sản phẩm mới
        state.items.push({
          ...item,
          itemTotal: Math.round(item.quantity * item.price * 100) / 100,
        });
        state.total =
          Math.round((state.total + item.quantity * item.price) * 100) / 100;
      } else {
        // Cập nhật sản phẩm hiện có
        const existItem = state.items[existItemIndex];

        // Loại bỏ giá trị cũ khỏi tổng
        state.total -= existItem.itemTotal;

        // Cập nhật số lượng mới
        existItem.quantity = item.quantity;

        // Tính lại tổng sản phẩm
        existItem.itemTotal =
          Math.round(existItem.quantity * existItem.price * 100) / 100;

        // Cộng giá trị mới vào tổng giỏ hàng
        state.total += existItem.itemTotal;

        // Làm tròn tổng giỏ hàng
        state.total = Math.round(state.total * 100) / 100;
        
      }
    },

    // Xóa sản phẩm
    removeItem: (state, action) => {
      const item = action.payload;
      const existItemIndex = state.items.findIndex((i) => i.id === item.id);

      if (existItemIndex !== -1) {
        const removedItem = state.items[existItemIndex];
        state.total -= removedItem.itemTotal; // Trừ giá trị sản phẩm
        state.items.splice(existItemIndex, 1); // Loại bỏ sản phẩm
        state.total = Math.round(state.total * 100) / 100;
      }
    },
  },
});

export const { addUpdateItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
