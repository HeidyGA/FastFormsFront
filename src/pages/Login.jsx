import React, { useEffect } from 'react'
import { userAtom } from '../stores/authAtom'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const Login = () => {
    const [user, setUser] = useAtom(userAtom)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Iniciar sesión en Supabase
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (signInError) {
                setError(signInError.message)
                setLoading(false)
                return
            }

            // Log para ver qué información envía Supabase
            console.log('Datos completos de Supabase:', data)
            console.log('Usuario:', data.user)
            console.log('User metadata:', data.user.user_metadata)

            // Guardar datos del usuario en el atom
            const userData = {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name || data.user.email
            }
            setUser(userData)
            console.log('Usuario guardado en atom:', userData)

            // Redirigir al dashboard
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión')
            setLoading(false)
        }
    }

    return (
        <>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </>
    )
}

export default Login