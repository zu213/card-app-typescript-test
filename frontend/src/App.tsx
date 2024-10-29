import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Settings from "./components/Settings";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider, ThemeProvider } from "./utilities/globalContext";

export default function App() {
  return (
    <section>
      <Router>
        <ThemeProvider>
          <EntryProvider>
            <Settings></Settings>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<AllEntries />}></Route>
              <Route path="create" element={<NewEntry />}></Route>
              <Route path="edit/:id" element={<EditEntry />}></Route>
            </Routes>
          </EntryProvider>
        </ThemeProvider>
      </Router>
    </section>
  );
}
