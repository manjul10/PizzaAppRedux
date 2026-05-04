import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverView from "../features/cart/CartOverView";
import Loader from "./Loader";
// import CartOverview from "./cart/CartOverview";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-zinc-950">
      
      {isLoading && <Loader/>}
      <Header />

      <main className="overflow-scroll scrollbar-hide">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* Outlet is where Home, Menu, or Cart will appear */}
          <Outlet />
        </div>
      </main>

      <CartOverView />
    </div>
  );
}

export default AppLayout;