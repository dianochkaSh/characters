import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-gray-800 p-4">
      <ul>
        <li className="space-x-4">
          <Link className="text-gray-300 hover:text-white" href="/products">Product</Link>
          <Link className="text-gray-300 hover:text-white"  href="/favorites">Favorites</Link>
          <Link className="text-gray-300 hover:text-white"  href="/products/create-project">Create products</Link>
        </li>
      </ul>
    </div>
  )
}
export default NavBar;