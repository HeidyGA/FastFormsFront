
import React from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userAtom } from '../stores/authAtom'
import { supabase } from '../lib/supabaseClient'

const Header = () => {
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      navigate('/register')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="site-header">
      <h1 className="site-title">FastForms</h1>
      <nav>
        {user ? (
          <button onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header