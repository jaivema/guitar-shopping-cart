import { useMemo } from "react"

export default function Header({ cart, clearCart, removeFromCart, decreaseQuantity, increaseQuantity }) {
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
    const cartQty = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
    
    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-cotent-center justify-content-md-between">
                    <div className="col-8 col-md-3 ">
                        <a href="index.html">
                            <img className="img-fluid header-guitarra" src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 mt-5 d-flex align-items-center justify-content-end">
                        <span className="rounded-circle text-white px-1 bg-dark fs-6">
                            {cartQty}
                        </span>
                        <div className="carrito">
                            <img className="flex img-fluid" src={`${import.meta.env.BASE_URL}img/carrito.png`} alt="carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center fw-bold">El carrito está vacío</p>
                                ) : (<>
                                    <p className="d-inline-flex">hay {cart.length} productos</p>
                                    <table className="w-100 table">
                                        <thead>
                                            <tr>
                                                <th>Imagen</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(guitar => (
                                                <tr key={guitar.id}>
                                                    <td>
                                                        <img className="img-fluid" src={`${import.meta.env.BASE_URL}img/${guitar.image}.jpg`} alt={guitar.name} />
                                                    </td>
                                                    <td>{guitar.name}</td>
                                                    <td>€{guitar.price}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => decreaseQuantity(guitar.id)}
                                                        >
                                                            -
                                                        </button>
                                                        {guitar.quantity}
                                                        <button
                                                            type="button"
                                                            className="btn btn-dark"
                                                            onClick={() => increaseQuantity(guitar.id)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            type="button"
                                                            onClick={() => removeFromCart(guitar.id)}
                                                        >
                                                            X
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <p className="text-end">Total: <span className="fw-bold">€{cartTotal}</span></p>
                                    <button className="btn btn-dark w-100 mt-3 p-2"
                                        onClick={() => clearCart()}
                                    >
                                        Vaciar carrito
                                    </button>
                                </>)}
                            </div>
                        </div>
                    </nav>
                </div>
            </div >
        </header >
    )
}
