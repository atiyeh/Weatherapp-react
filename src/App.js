import Search from "./component/searchbox";
import "./index.css";

function App() {
    return (
        <div className="Search">
            <div className="container">
                <Search defaultcity="New york" />
            </div>
        </div>
    );
}

export default App;
