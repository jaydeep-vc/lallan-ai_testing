"use client";

import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";

import { EyeCloseIcon, EyeOpenIcon } from "@/components/icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  register?: UseFormRegister<any>;
}

export default function Input({
  label,
  id,
  type = "text",
  name = "",
  register,
  error,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggle = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-left text-sm font-medium leading-6 text-gray-900">
          {label}
        </label>
      )}
      <div className="mt-2 relative flex items-center">
        <input
          id={id}
          type={isPasswordVisible ? "text" : type}
          aria-invalid={error ? "true" : "false"}
          className={`block w-full ${
            error
              ? "border-red-500 ring-red-500 text-red-600 focus:border-red-500 focus:ring-red-500"
              : "text-gray-900 ring-gray-300 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300"
          }  px-4 py-3 rounded-md border-1 ring-1 shadow-sm sm:text-sm sm:leading-6`}
          {...(register ? register(name) : {})}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-1 p-2 bg-slate-50 rounded focus:ring-2 focus:ring-gray-600 focus:outline-none"
            onClick={() => toggle()}
          >
            {isPasswordVisible ? (
              <EyeCloseIcon height={20} width={20} className="stroke-primary" />
            ) : (
              <EyeOpenIcon height={20} width={20} className="stroke-primary" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600 mt-1 text-left">{error}</p>}
    </div>
  );
}
