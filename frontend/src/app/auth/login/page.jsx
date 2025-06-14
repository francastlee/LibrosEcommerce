'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext.jsx';
import Alert from '../../../../components/ui/Alert.jsx';
import AnimatedTitle from '../../../../components/ui/AnimatedTitle.jsx';
import InputPassword from '../../../../components/ui/InputPassword.jsx'
import gsap from 'gsap';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const formRef = useRef(null);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    gsap.to(formRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
      clearProps: 'opacity',
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      login(data);
      setSuccess('Inicio de sesión exitoso. Redirigiendo...');
      router.push('/books');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Alert message={error} type="error" onClose={() => setError('')} />
      <Alert message={success} type="success" onClose={() => setExito('')} />

      <section className="min-h-screen flex flex-col items-center justify-center bg-[#505168] px-4">
        <AnimatedTitle />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ opacity: 0 }}
          className="bg-[#27233A] shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-[#DCC48E]">Iniciar sesión</h2>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-white">Correo electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 text-[#DCC48E]"
            />
          </div>

          <InputPassword value={form.password} onChange={handleChange} />

          <button
            type="submit"
            className="w-full bg-[#505168] text-white py-2 rounded hover:bg-[#DCC48E] hover:text-black transition duration-500 cursor-pointer"
          >
            Iniciar sesión
          </button>

          <p className="mt-4 text-center text-white">
            ¿No tienes una cuenta?{' '}
            <a
              href="/auth/register"
              className="text-[#DCC48E] hover:text-[#DCC48E]/90 font-semibold underline"
            >
              Regístrate aquí
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
