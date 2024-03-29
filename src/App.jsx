import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Website from "./pages/Website";
import { Suspense, useState } from "react";
import Properties from "./pages/Properties/Properties";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Property from "./pages/Property/Property";
import SignInComponent from "./components/SignIn/SignInComponent";
import UserDetailContext from "./components/context/UserDetailsContext";
import MainLayout from "./components/Layout/MainLayout";
import Bookings from "./pages/Bookings/Bookings";
import AdminPrivateRoute from "./admin/AdminPrivateRoute";
import AdminDashboard from "./admin/AdminDashboard";
import { useAuth, useUser } from "@clerk/clerk-react";
function App() {

  const queryClient = new QueryClient()
  const [userDetails, setUserDetails] = useState({
    // favourites: [],
    bookings: [],
    token: null
  })


  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/sign-in" element={<SignInComponent />} />
                <Route path="/" element={<Website />} />

                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>

                <Route path="/bookings" element={<Bookings />}></Route>
                {/* <Route path="/admin" element={<AdminPrivateRoute />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                </Route> */}
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
