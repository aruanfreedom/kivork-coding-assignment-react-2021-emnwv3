import React from 'react';
import Ticket from './Ticket';

export const Tickets = ({ apiService }) => {
  const [tickets, setTickets] = useState([] as Ticket[]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiService.tickets().toPromise();
      setTickets(result);
    };
    fetchData();
  }, [apiService]);

  return (
    <>
      <h2>Tickets</h2>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((t) => (
            <li key={t.id}>
              Ticket: {t.id}, {t.description}
            </li>
          ))}
        </ul>
      ) : (
        <span>loading...</span>
      )}
    </>
  );
};
