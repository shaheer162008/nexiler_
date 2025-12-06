"use client";

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { app } from "../../../firebase/init";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

    const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin/dashboard");
      } else {
        setIsCheckingAuth(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [router]);

  const validateEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const idToken = user.getIdToken();
          document.cookie = `authToken=${idToken}; path=/; max-age=3600; secure; samesite=strict`
          router.push("/admin/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError("Invalid email or password.");
        });
      setSuccess("Logged in");
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <section className="w-full max-w-[420px] bg-white rounded-xl shadow-lg p-7">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Admin sign in
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Sign in with email/password or continue with Google.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-900">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full text-black mt-2 px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-900">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 text-black px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </label>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                aria-label="Remember me"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm border border-red-200"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="mb-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm border border-green-200"
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        
      </section>
    </main>
  );
}
