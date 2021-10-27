import React, {useContext, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router';
import { AppContext } from "../app";
import { ApiTypes } from "./Tickets";
import {Ticket as TicketType} from "../../api";

interface TicketDetailTypes {
  ticketId: string
}

export const TicketDetail = () => {
  const { ticketId }:TicketDetailTypes = useParams();
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetail] = useState({} as TicketType);
  const history = useHistory();
  const { apiService }:ApiTypes = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoaded(false);
      const result = await apiService?.ticket(Number.parseInt(ticketId, 10))?.toPromise();

      if (result) setDetail(result);
      setLoaded(true);
    };

    fetchData();
  }, [apiService, ticketId]);

  const onClick = () => {
    history.push('/');
  }

  if (!loaded) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>Ticket #{detail.id}</h2>
      <input className="button-primary" type="button" onClick={onClick} value="Back" />
      {ticketId ?
          <>
            <div>Description: {detail.description}</div>
            <div>Assignee id: {detail.assigneeId}</div>
            <div>Completed: {detail.completed.toString()}</div>
          </>
          : 'Not info :('
      }
    </div>
  );
};
