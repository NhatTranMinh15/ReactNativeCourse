import React, { createContext, useContext, ReactNode, useState } from 'react';
import { User } from '../models/user';
import { loginService } from '../services/auth-service';
import { LogInModel, LoginResponseModel, LoginResponseUserModel } from '../models/auth';
import * as SecureStore from 'expo-secure-store';
import { removeValueOf } from '../services/api-service';
import { saveUserProfile } from '../services/user-service';


interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<number>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (username: string, password: string) => {
        const data: LogInModel = {
            username,
            password
        }
        const { user, token } = await loginService(data).then(async response => {
            const data: LoginResponseModel = response.data;
            const token: string = data.data.token;
            const user: LoginResponseUserModel = data.data.user;
            // this will be secure save
            await save("token", token);
            await saveUserProfile(user);
            setUser({ username: user.username, role: user.role });
            return { user, token };
        }).catch((err) => {
            console.log("Error", err.response ? err.response.data.error.message : err);
            return { user: null, token: null };
        });
        if (user === null || token === null) {
            return 0;
        }
        return 1;
    };

    const logout = async () => {
        await removeValueOf("token");
        setUser(null);
    };

    const contextValue: AuthContextProps = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}


export { AuthProvider, useAuth };


