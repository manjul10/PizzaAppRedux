import MenuItem from "./MenuItem";
import { useLoaderData } from "react-router-dom";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export const getMenu = async () => {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) throw Error("Failed getting Menu");
  const data = await res.json();
  return data.data;
};

const Menu = () => {
//   const [menu, setMenu] = useState([]);

  const menu = useLoaderData() as any[];

//   useEffect(() => {
//     getMenu().then((data) => setMenu(data));
//   }, []);

  return (
    <ul className="divide-y divide-zinc-800 px-4 py-2">
      {menu.map((pizza) => (
      <MenuItem pizza={pizza} key={pizza.id} /> 
      ))}
    </ul>
  );
};

export default Menu;