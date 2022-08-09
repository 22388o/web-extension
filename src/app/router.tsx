import {
  Routes,
  Route,
  MemoryRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useWallet } from "./apis/Wallet";
import Connect from "./views/connect/Connect";
import Wallet from "./views/wallet/Wallet";

export enum Paths {
  Home = "/",
  Connect = "/connect",
}

function GateKeeper() {
  const wallet = useWallet();
  if (!wallet.connected) {
    return <Navigate to={Paths.Connect} />;
  }
  return <Outlet />;
}

export default function Router() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path={Paths.Connect} element={<Connect />} />
        <Route element={<GateKeeper />}>
          <Route path={Paths.Home} element={<Wallet />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
