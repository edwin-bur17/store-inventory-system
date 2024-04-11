"use client";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";

function RegisterPage() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  // Envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Petición post a la api
      const res = await axios.post("/api/auth/signup", {
        fullname,
        email,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        //si el error es ocasionado por axios
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <section>
      <form className="text-white" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500 text-center text-white p-2 rounded-md ">
            {error}
          </div>
        )}
        <h1>Sign up</h1>
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="********"
          className="bg-zinc-800 px-4 py-2 block mb-2 rounded-md"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="bg-sky-500 hover:bg-sky-600 px-3 py-2 rounded-full cursor-pointer">
          Registrarme
        </button>
      </form>
    </section>
  );
}

export default RegisterPage;
