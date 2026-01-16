import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import type { TGuitar, TCartItem } from "../types";

export const useCart = () => {
	const initialCart = () : TCartItem[] => {
		const localStorageCart = localStorage.getItem("cartLa-guitars");
		return localStorageCart ? JSON.parse(localStorageCart) : [];
	};

	const [data] = useState(db);
	const [cart, setCart] = useState(initialCart);

	function addToCart(item: TGuitar) {
		const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
		if (itemExists >= 0) {
			const updatedCart = [...cart];
			updatedCart[itemExists].quantity++;
			setCart(updatedCart);
		} else {
			const newItem: TCartItem = {...item, quantity: 1}
			setCart([...cart, newItem]);
		}
	}

	function clearCart() {
		setCart([]);
	}

	function removeFromCart(id: TGuitar['id']) {
		setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
	}

	function increaseQuantity(id: TGuitar['id']) {
		const updatedCart = cart.map((item) => {
			if (item.id === id)
				return {
					...item,
					quantity: item.quantity + 1,
				};
			return item;
		});
		setCart(updatedCart);
	}

	function decreaseQuantity(id: TGuitar['id']) {
		const updatedCart = cart.map((item) => {
			if (item.id === id && item.quantity > 0)
				return {
					...item,
					quantity: item.quantity - 1,
				};
			return item;
		});
		setCart(updatedCart);
	}

	useEffect(() => {
		localStorage.setItem("cartLa-guitars", JSON.stringify(cart));
	}, [cart]);

	const isEmpty = useMemo(() => cart.length === 0, [cart]);
	const cartTotal = useMemo(
		() => cart.reduce((total, item) => total + item.quantity * item.price, 0),
		[cart]
	);
	const cartQty = useMemo(
		() => cart.reduce((total, item) => total + item.quantity, 0),
		[cart]
	);

	return {
		cartQty,
		cartTotal,
		isEmpty,
		data,
		cart,
		addToCart,
		clearCart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	};
};
