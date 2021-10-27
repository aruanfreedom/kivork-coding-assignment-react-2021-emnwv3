import React, { useEffect, useState, useContext, createContext } from 'react';
import { AppContext } from '../app';
import { Ticket as TicketType, ApiService } from "../../api";
import { Ticket } from "./Ticket";
import { AddTicket } from "./AddTicket";
import { Filter } from "./Filter";

export const TicketsContext = createContext({
  tickets: [] as TicketType[],
  setUpdated: (updated:boolean) => {},
  setLoaded: (loaded:boolean) => {},
  loaded: true
});

export interface ApiTypes {
  apiService?: ApiService
}

interface TicketListsProps {
  loaded: boolean
}

const TicketLists = ({ loaded }:TicketListsProps) => {
  const { tickets } = useContext(TicketsContext);

  if (!loaded) return <div>Loading...</div>;

  return (
    tickets.length > 0 ? (
      <ul>
        {tickets.map((t) => (
           <Ticket key={t.id} item={t} />
        ))}
      </ul>
      ) : (
        <div>Not tickets :(</div>
      )
  );
}

export const Tickets = () => {
  const [tickets, setTickets] = useState([] as TicketType[]);
  const [loaded, setLoaded] = useState(true);
  const [updated, setUpdated] = useState(true);
  const { apiService }:ApiTypes = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      const result = await apiService?.tickets()?.toPromise();

      if (result) {
        setTickets(result);
      }
      setLoaded(true);
      setUpdated(false);
    };

    if (updated) fetchData();
  }, [apiService, updated]);

  return (
      <TicketsContext.Provider value={{ tickets, setUpdated, setLoaded, loaded }}>
        <div className="container">
          <h2>Tickets</h2>
          <Filter />
          <div className="tickets">
            <TicketLists loaded={loaded} />
          </div>
          <AddTicket />
        </div>
      </TicketsContext.Provider>
  );
};
