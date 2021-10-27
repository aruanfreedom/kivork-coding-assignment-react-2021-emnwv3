import React from 'react';
import {
  MemoryRouter as Router, Route, Switch
} from 'react-router';
import './app.css';
import { Tickets } from './components/Tickets';
import { TicketDetail } from './components/TicketDetail';
import { ApiService } from "../api";

const apiService = new ApiService();
export const AppContext = React.createContext({});

const App = () => (
   <AppContext.Provider value={{ apiService }}>
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Tickets />
          </Route>
          <Route path="/ticket:ticketId">
            <TicketDetail />
          </Route>
        </Switch>
      </Router>
    </div>
   </AppContext.Provider>
);

export default App;
