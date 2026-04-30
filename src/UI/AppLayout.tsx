import { Outlet } from "react-router-dom";
import Header from "./Header";
import CartOverView from "../features/cart/CartOverView";
// import CartOverview from "./cart/CartOverview";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <main className="overflow-scroll">
        <div className="mx-auto max-w-3xl">
          {/* Outlet is where Home, Menu, or Cart will appear */}
          <Outlet />
        </div>
      </main>

      <CartOverView />
    </div>
  );
}

export default AppLayout;