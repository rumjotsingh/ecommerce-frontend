import { Route, Routes } from "react-router-dom";
import ModernHomePage from "./pages/ModernHomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import ModernRegister from "./pages/Auth/ModernRegister";
import ModernLogin from "./pages/Auth/ModernLogin";
import Dashborad from "./pages/user/Dashborad";
import PrivateRoute from "./components/routes/Private";
import ModernForgetPassword from "./pages/Auth/ModernForgetPassword";
import AdminRoute from "./components/routes/AdminRoute";
import ModernAdminDashboard from "./pages/Admin/ModernAdminDashboard";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Products from "./pages/Admin/Products";
import ModernProductDetails from "./pages/ModernProductDetails";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import ModernCartPage from "./pages/ModernCartPage";
import AdminOrders from "./pages/Admin/AdminOrder";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ModernHomePage />}></Route>
        <Route path="/login" element={<ModernLogin />}></Route>
        <Route path="/product/:slug" element={<ModernProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<ModernCartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashborad" element={<PrivateRoute />}>
          <Route path="user" element={<Dashborad />}></Route>
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashborad" element={<AdminRoute />}>
          <Route path="admin" element={<ModernAdminDashboard />}></Route>
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<ModernRegister />}></Route>
        <Route path="/forget-password" element={<ModernForgetPassword />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
