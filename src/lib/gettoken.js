import { supabase } from './supabaseClient'

export const getToken = async () => {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
            console.error('Error al obtener sesión:', error)
            return null
        }

        if (!session) {
            console.log('No hay sesión activa')
            return null
        }

        return session.access_token
    } catch (err) {
        console.error('Error al obtener token:', err)
        return null
    }
}
