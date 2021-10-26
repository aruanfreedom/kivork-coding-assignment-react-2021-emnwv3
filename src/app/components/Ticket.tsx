import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const Ticket = ({ item }) => {
  const onClick = useCallback(async () => {
    useHistory.push(`ticket/${item.id}`);
  });

  return (
    <li onClick={onClick}>
      Ticket: {item.id}, {item.description}
    </li>
  );
};
