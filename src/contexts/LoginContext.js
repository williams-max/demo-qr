import React, {createContext, Component} from "react";
import {User} from '../components/global/user/User';


export const LoginContext = createContext();

class LoginContextProvider extends Component {

    state = {
        isLogin: new User().isLogin(),
    };

    setLogin = (isLogin) => {
        new User().setLogin(isLogin);
        this.setState({isLogin: isLogin})
    };

    render() {

        return (

            <LoginContext.Provider
                value={{
                    ...this.state,
                    setLogin: this.setLogin,
                }}>

                {this.props.children}

            </LoginContext.Provider>

        )

    }

}

export default LoginContextProvider;

export const LoginConsumer = LoginContext.Consumer;
