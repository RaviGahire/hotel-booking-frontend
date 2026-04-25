export const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  className
}) => {
  return (
    <div className="w-full mb-4 relative">
      {label && (
        <label className="block text-sm font-medium  mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition
        ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1 absolute top-15">{error}</p>}
    </div>
  );
};

export const TextareaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition resize-none
        ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const SelectField = ({
  label,
  name,
  value,
  defaultOpt = "Select",
  onChange,
  options = [],
  error,
}) => {
  return (
    <div className="w-full mb-4">
      
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`w-full px-3 py-2 text-black cursor-pointer rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 transition
        ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      >
        <option value="">{defaultOpt}</option>

        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};