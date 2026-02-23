import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import TicketList from "./pages/TicketList.tsx";
import CreateTicket from "./pages/CreateTicket.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TicketList />} />
          <Route path="/new" element={<CreateTicket />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
