import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutComponent from "./Component/AboutComponent/AboutComponent";
import ContantComponent from "./Component/ContactComponent/ContantComponent";
import HomeComponent from "./Component/HomeComponent/HomeComponent";
import LoginComponent from "./Component/LoginComponent/LoginComponent";
import MenuComponent from "./Component/MenuComponent/MenuComponent";
import NavHomeComponent from "./Component/NavHomeComponent/NavHomeComponent";
import NewProductComponent from "./Component/NewProductComponent/NewProductComponent";
import SignUpComponent from "./Component/SignUpComponent/SignUpComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />}>
          <Route index element={<NavHomeComponent />} />
          <Route path="/menu" element={<MenuComponent />} />
          <Route path="menu/:id" element={<MenuComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="/contant" element={<ContantComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/newProduct" element={<NewProductComponent />} />
          <Route path="/signUp" element={<SignUpComponent />} />
          <Route path="/logIn" element={<LoginComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
