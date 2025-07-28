import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import api from '../utils/axios.js'

import useUserStore from '../store/useUserStore.js'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const authHandle = async ({ username, password }) => {
    const url = isLogin ? '/auth/login' : '/auth/register'
    const res = await api.post(url, {username, password});
    return res.data;
  }

  const mutation = useMutation({
    mutationFn: authHandle,
    onSuccess: (res) => {
      const user = res.user
      const token = res.access_token
      if(token) sessionStorage.setItem('access_token', token)
      setUser(user)
      navigate('/rooms')
    },
    onError: (err) => {
      console.error("Auth failed:", err)
      const msg = err?.response?.data?.message || "Authentication failed."
      setErrorMsg(msg)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Both fields are required.");
      return;
    }
    setErrorMsg('')
    mutation.mutate({ username, password })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-6 bg-green-100">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-londrina text-green-800 text-center mb-4">
          {isLogin ? "Login to Momentum" : "Create your account"}
        </h1>

        <form 
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {errorMsg && (
            <p className="text-sm text-red-600 text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className={`bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg shadow transition-colors duration-300 ${
              mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {mutation.isPending
              ? (isLogin ? "Logging in..." : "Signing up...")
              : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <p className="text-center text-green-800 font-opensans">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-900 underline hover:text-green-600"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-900 underline hover:text-green-600"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default Auth