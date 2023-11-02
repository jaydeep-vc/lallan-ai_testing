import type { UseFormRegister } from "react-hook-form";

interface OptionsInputProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: string[];
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  error?: string;
  labelField?: string;
  valueField?: string;
}

export default function OptionsInput({
  label,
  id,
  error,
  name,
  register,
  options,
  labelField,
  valueField,
  ...rest
}: OptionsInputProps) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm text-left font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2 relative flex items-center">
        <select
          {...rest}
          {...(register && register(name))}
          className="w-full p-3 border text-gray-900 ring-gray-900 ring-inset focus:ring-2 focus:ring-inset focus:ring-primary-300 text-sm rounded-md"
        >
          {options.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        {/* 
        <input
          id={id}
          aria-invalid={error ? "true" : "false"}
          className={`block w-full ${
            error
              ? "border-red-500 ring-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
              : "text-gray-900 ring-gray-300 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300"
          }  px-4 py-3 rounded-md border-1 ring-1 shadow-sm sm:text-sm sm:leading-6`}
          {...(register ? register(name) : {})}
          {...props}
        /> */}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
