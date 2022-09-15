import React, { createContext } from "react";

const CartContext = React.createContext({
	items: [],
	totalAmount: 0,
	addItem: () => {},
	removeItem: (id) => {}
});

export default CartContext;