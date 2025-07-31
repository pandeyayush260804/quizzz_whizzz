import { Link } from "react-router-dom";

const Header=()=>{
    return(<div className="flex place-content-between bg-[#000000] text-white p-4 h-[50px] pb-[20px] ">

        <div className="ml-[20px]">
            <Link to="/">Home</Link>
        </div>
        
        &nbsp;
        {/* <div className="flex gap-2 mr-[20px]">
            <div><Link to="/login">Login</Link></div>
            
        &nbsp;
        <div><Link to="/register">Register</Link></div>
        
        </div> */}
        
    </div>)
}
export default Header;