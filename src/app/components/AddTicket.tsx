import React, { useContext, useState } from "react";
import { ApiTypes, TicketsContext } from "./Tickets";
import { AppContext } from "../app";

export const AddTicket = () => {
    const { setLoaded, setUpdated, loaded } = useContext(TicketsContext);
    const { apiService }:ApiTypes = useContext(AppContext);

    const [description, setDescription] = useState('');

    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setDescription(value);
    }

    const addTicket = async () => {
      setLoaded(false);
      setDescription('');
      await apiService?.newTicket({ description }).toPromise();
      setUpdated(true);
    }

    return (
      <div className="row">
        <div className="ten columns">
          <textarea
              placeholder="Description"
              className="textarea"
              onChange={onChangeDescription}
              value={description}
          />
        </div>
        <div className="two columns">
          <button disabled={!loaded} type="button" onClick={addTicket}>Add</button>
        </div>
      </div>
    )
}