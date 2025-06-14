'use client';

import PropTypes from 'prop-types';

export default function CardBook({ title, author, price, image, onAddToCart }) {
  return (
    <article className="bg-[#B3C0A4] p-1 rounded-[30px] shadow-xl hover:shadow-2xl w-[250px] h-[360px] overflow-hidden transition-all duration-300 transform hover:scale-[1.05] group">
      <div className="relative w-full h-full rounded-[24px] overflow-hidden">
        <img
          src={image}
          alt={`Portada de ${title}`}
          className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:brightness-75"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10" />

        <div className="absolute bottom-20 left-4 right-4 z-20 text-white">
          <h2 className="text-lg font-bold line-clamp-1">{title}</h2>
          <p className="text-sm text-gray-200 line-clamp-1">{author}</p>
          <p className="text-sm mt-1 text-gray-300">Desde ${price}</p>
        </div>

        {onAddToCart && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAddToCart();
            }}
            className="absolute bottom-4 left-4 right-4 z-20 bg-white text-black py-2 rounded-full text-sm font-semibold hover:bg-[#DCC48E] hover:text-[#27233A] transition transform group-hover:-translate-y-1 cursor-pointer"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </article>
  );
}

CardBook.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func
};
