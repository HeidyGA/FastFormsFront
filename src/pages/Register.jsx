import React from 'react'
import { userAtom } from '../stores/authAtom'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const Register = () => {
    const [user, setUser] = useAtom(userAtom)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (user) {
        navigate('/dashboard')
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Registrar usuario en Supabase
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name
                    }
                }
            })

            if (signUpError) {
                setError(signUpError.message)
                setLoading(false)
                return
            }

            // Guardar datos del usuario en el atom
            setUser({
                id: data.user.id,
                email: data.user.email,
                name
            })

            // Redirigir al dashboard
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Error al registrarse')
            setLoading(false)
        }
    }

    return (
        <>
            <h2>Registro</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <label htmlFor="name">Nombre</label>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
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
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </>
    )
}

export default Register