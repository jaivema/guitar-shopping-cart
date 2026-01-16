import "./App.css";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header";
import Guitar from "./components/Guitar";

function App() {
	const {
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
	} = useCart();

	return (
		<>
			<Header
				cart={cart}
				clearCart={clearCart}
				removeFromCart={removeFromCart}
				decreaseQuantity={decreaseQuantity}
				increaseQuantity={increaseQuantity}
				isEmpty={isEmpty}
				cartQty={cartQty}
				cartTotal={cartTotal}
			/>
			<main className="container-xl mt-5">
				<h1 className="text-center">Nuestra Colección</h1>
				<section className="row mt-5">
					{data.map((guitar) => (
						<Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
					))}
				</section>
			</main>
			<footer className="bg-dark mt-5 py-5">
				<div className="container-xl">
					<p className="text-white text-center fs-4 mt-4 m-md-0">
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}
export default App;
