import { children, createContext, useContext, useEffect } from "react";

const ChatContext = createContext()


const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {

    }, [])

    return (
        <ChatContext.Provider value={{user,setUser}}>
            {children}
        </ChatContext.Provider>
    );
}

export const ChatState = () => {

    return useContext(contextValue);
};


export default ChatProvider;
