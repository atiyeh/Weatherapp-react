import Search from "./component/searchbox";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Forcast from "./pages/forcast";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Search defaultcity="New york" />} />
                <Route path="/forcast" element={<Forcast />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
