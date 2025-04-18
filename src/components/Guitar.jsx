const Guitar = ({ guitar, addToCart }) => {

    const { image, name, description, price } = guitar

    return (
        <article className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`${import.meta.env.BASE_URL}img/${image}.jpg`} alt={name} />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-bold fs-3 text-primary">€{price}</p>
                <button
                    type="button"
                    className="btn btn-dark d-block w-100"
                    onClick={() => addToCart(guitar)}
                >
                    Añadir al carrito
                </button>
            </div>
        </article>
    )
}
export default Guitar