import { Redirect, Route } from "react-router-dom";

interface Props {
    children: React.ReactNode
    path: string
    exact: boolean
}

const PrivateRoute: React.FC<Props> = ({ children, ...rest }) => {
    let userToken = window.localStorage.getItem("userToken")
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !!userToken ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute