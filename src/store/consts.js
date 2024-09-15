import { AiOutlineHome } from "react-icons/ai"; 
import { MdOutlineAddShoppingCart } from "react-icons/md"; 
import { MdOutlineShoppingCart } from "react-icons/md"; 
import { TbCategory, TbLayoutGridAdd } from "react-icons/tb"



export const btnData = [
    {id:0, title: "Home", icon:AiOutlineHome , path: "/"},
    {id:1, title: "Categories", icon: TbCategory, path: "/categories"},
    {id:2, title: "Products", icon: MdOutlineShoppingCart, path: "/products"},
    {id:3, title: "Create category", icon: TbLayoutGridAdd, path: "/create-category"},
    {id:4, title: "Create product", icon: MdOutlineAddShoppingCart, path: "/create-product"}
    ]
    