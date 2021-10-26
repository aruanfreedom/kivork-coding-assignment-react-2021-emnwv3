import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './app.css';
import { Tickets } from './components/Tickets';
import { TicketDetail } from './components/TicketDetail';

interface AppProps {
  apiService: ApiService;
}

const App = ({ apiService }: AppProps) => (
  <Router>
    <div className="app">
      <Switch>
        <Route path="/">
          <Tickets apiService={apiService} />
        </Route>
        <Route path="/ticket:ticketId">
          <TicketDetail />
        </Route>
      <Switch>
    </div>
  </Router>
);

export default App;
