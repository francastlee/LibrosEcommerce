import { Range } from "react-range";
export default function BookFilters({ searchName, setSearchName, priceRange, setPriceRange, min, max }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
      <input
        type="text"
        placeholder="Buscar por título"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 rounded-md border-none focus:outline-none text-white bg-[#27233A]"
      />

      <div className="w-full md:w-1/2">
        <p className="text-white text-sm mb-2 text-center md:text-start">
          Filtrar por precio: ${priceRange[0]} - ${priceRange[1]}
        </p>
        <Range
          step={1}
          min={min}
          max={max}
          values={priceRange}
          onChange={setPriceRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 bg-white rounded-full"
              style={{
                ...props.style,
                height: '6px',
                background: 'linear-gradient(to right, #ddd, #DCC48E, #ddd)',
              }}
            >
              {children}
            </div>
            )}
            renderThumb={({ props, index }) => {
                const { key, ...rest } = props;
                return (
                    <div
                    {...rest}
                    key={`thumb-${index}`} 
                    className="w-4 h-4 bg-[#DCC48E] rounded-full shadow-md cursor-pointer"
                    />
                );
            }}
        />
      </div>
    </div>
  );
}
