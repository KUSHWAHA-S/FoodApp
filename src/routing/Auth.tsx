import {useState,useContext, createContext} from 'react';

interface IAuth {
    userId: string;
    getAuth: boolean;
  }
  
  interface IAuthContext {
    auth: IAuth;
    setAuth: (state: IAuth) => void;
  }
  interface Props {
    children: React.ReactNode;
  }
  
  export const AuthContext = createContext<IAuthContext | null>(null);
  
  export const AuthProvider: React.FC<Props> = ({children}) => {
    const [auth, setAuth] = useState({ userId: "", getAuth: false });
  
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };
















// type User={
//     user: String
// }
// type AuthTypes=User&{
//     login : (isAuth:User)=>void,
//     logout : ()=> void
// }

// const InitialData={
//     user:'',
//     login,
//     logout

// }

// const AuthContext= createContext<AuthTypes>(InitialData);


// export const AuthProvider=({children})=> {

//     const [user, setUser]= useState('');
     
//     const login=(user: string) =>{
//         setUser(user);
//     }

//     const logout=()=>{
//         setUser('');
//     }

//     return(
//         <AuthContext.Provider value={{user, login, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth=()=>{
//     return useContext(AuthContext)
// }

