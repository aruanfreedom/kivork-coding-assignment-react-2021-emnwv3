import React, {useCallback, useContext, useState} from 'react';
import { useHistory } from 'react-router';
import { Ticket as TicketType } from "../../api";
import {ApiTypes} from "./Tickets";
import {AppContext} from "../app";

interface Item {
  item: TicketType
}

export const Ticket = ({ item }:Item) => {
  const history = useHistory();
  const { apiService }:ApiTypes = useContext(AppContext);
  const [loaded, setLoaded] = useState(true);
  const [checked, setChecked] = useState(item.completed);

  const onClick = useCallback(async () => {
    history.push(`/ticket${item.id}`);
  }, [history, item.id]);

  const onChange = useCallback(async () => {
    if (checked) return null;
    setChecked(true);
    setLoaded(false);
    await apiService?.complete(item.id).toPromise();
    setLoaded(true);
  }, [apiService, checked, item.id]);

  return (
    <li className="ticket">
      <span onClick={onClick}>Ticket: {item.id}, {item.description}</span>
      <label>
        <span>Completed:</span>
        {loaded ? <input type="checkbox" onChange={onChange} checked={checked} /> : <span>load</span>}
      </label>
    </li>
  );
};
