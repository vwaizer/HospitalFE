import {
    BrowserRouter,
    Link,
    Route,
    Routes,
  } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import Content from "../components/Content";



let router = [
    {
        path: "/login",
        component: LoginPage
    },
    {
        path: "/",
        component: Content
    }
]

export default function RouterView() {
    return <BrowserRouter >
        <Routes>
            {
                router.map((route, index) => {
                    const Component = route.component
                    return <Route key={index} path={route.path} element={<Component />} />
                })
            }
        </Routes>
    </BrowserRouter>
}