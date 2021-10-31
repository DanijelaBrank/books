import React, {useState, useContext, createContext} from 'react';


const authContext = createContext();

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);}

const useProvideAuth = () => {
    const [login, setLogin] = useState(null);    
    const [error, setError] = useState("");
    const [check,setCheck]=useState("");

    const signin = (username, password, failCallback = () => {}, okCallback = () => {}) => {
        fetch("http://localhost:3081/app/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }).then(response => response.json())
        .then(data => {
            if(data.status !== "ok"){
                setLogin(null);
                setError(data.body);
                failCallback();    
            }else{
                setLogin(data.body);
                setError(""); 
                okCallback();
            }
        })
        .catch(err => {
            setLogin(null);
            setError(err);
            failCallback();
        });
    }

    const addNewUser = (username, password, failCallback = () => {}, okCallback = () => {}) => {
        fetch("http://localhost:3081/app/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }).then(response => response.json())
        .then(data => {
            if(data.status !== "ok"){
                setLogin(null);
                setError(data.body);
                failCallback();    
            }else{
                setLogin(data.body);
                setError(""); 
                okCallback();
            }
        })
        .catch(err => {
            setLogin(null);
           setError(err);
            failCallback();
        });
    }

    const signout = (cb = () => {}) => {
        setLogin(null);
        setError("");
        cb();
    }

    const isExistUsername= (username)=>{
        const url="http://localhost:3081/app/checkUsername";
        fetch(`{url}/${username}`, {
            method: "GET",
            headers: {}})
            .then(resp => resp.json())
            .then(data => {
                if(data.status === "ok"){
                    setCheck(data.body);           
                    setError(null);   
                }else{
                    setError(data.body);
                    console.log(error);
                }
            })
            // .catch(err => {               
            //     setError(err);
            //     console.log(error);
            // });

    }

    return [login, error, signin, addNewUser, signout, isExistUsername];
}