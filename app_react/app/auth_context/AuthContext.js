import { createContext, useState, useContext } from "react";

// módulo de verificação de login dos usuários do sistema


// criamos uma instancia do hook useContext()
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // criar um estado de autenticação
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // função de login que altera para true o estado inicial
    const login = () => {
        setIsAuthenticated(true)
    }

    // função de logout
    const logout = () => {
        setIsAuthenticated(false)
    }

    // retornando o nosso provider com os dados do nosso contexto
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

// exportando o nosso CustomHook para o resto da aplicação
export const useAuth = () => useContext(AuthContext);