import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // adding new price to the total amount
    // const updatedTotalAmount =
    //   state.totalAmount + action.item.price * action.item.amount;
    
    // const existingCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.item.id
    // );

    // const existingCartItem = state.items[existingCartItemIndex];
    // let updatedItems;

    // if (existingCartItem) {
    //   const updatedItem = {
    //     ...existingCartItem,
    //     amount: existingCartItem.amount + action.item.amount,
    //   };

    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // } else {
    //   updatedItems = state.items.concat(action.item);
    // }

    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };

    // adding new price to the total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // find the updating item in the existing item list and add the amount
    const updatedItems = state.items.map((item) =>
      item.id === action.item.id
        ? { ...item, amount: item.amount + action.item.amount }
        : item
    );
    // Find the difference in after updating, if no difference, add new item
    const updatedItemsAmount = updatedItems.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    const stateItemsAmount = state.items.reduce(
      (acc, item) => acc + item.amount,
      0
    );
    return {
      items:
        updatedItemsAmount === stateItemsAmount
          ? state.items.concat(action.item)
          : updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    // const existingCartItemIndex = state.items.findIndex(
    //   (item) => item.id === action.id
    // );
    // const existingCartItem = state.items[existingCartItemIndex];

    // const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    // let updatedItems;
    // if (existingCartItem.amount === 1) {
    //   updatedItems = state.items.filter((item) => item.id !== action.id);
    // } else {
    //   const updatedItem = {
    //     ...existingCartItem,
    //     amount: existingCartItem.amount - 1,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // }

    // return {
    //   items: updatedItems,
    //   totalAmount: updatedTotalAmount,
    // };

    // decreasing item price to the total amount
    const updatedTotalAmount = state.totalAmount - action.item.price;
    // find the updating item in the existing item list and decrease the amount
    const itemsAfterDecreaseAmount = state.items.map((item) =>
      item.id === action.item.id ? { ...item, amount: item.amount - 1 } : item
    );
    // Filter out the items with 0 amount
    const itemsAfterRemoveItem = itemsAfterDecreaseAmount.filter(
      (item) => item.amount > 0
    );
    return {
      items: itemsAfterRemoveItem,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (item) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
