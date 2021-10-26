import React from 'react';
import { useParams } from 'react-router-dom';

export const TicketDetail = () => {
  const { ticketId } = useParams();

  return <div>Ticket: {ticketId}</div>;
};
