import { Link, Outlet } from "react-router";

function Header() {
    return ( <>
        <h1><Link to={'/'}>Q&A app</Link></h1>
        <Outlet />
    </>);
}
export default Header;
