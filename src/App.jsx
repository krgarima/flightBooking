import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [resultsFound, setResultsFound] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />
        <main className="h-full w-full mt-16 overflow-auto px-6 border-2 bg-slate-200">
          <SearchInput setResultsFound={setResultsFound} />
          {resultsFound ? (
            <SearchResults />
          ) : (
            <img src="/src/assets/plane.jpg" alt="plane" />
          )}
        </main>
      </div>
    </LocalizationProvider>
  );
}

export default App;
