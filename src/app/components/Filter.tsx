import React, { useContext, useState } from "react";
import { ApiTypes, TicketsContext } from "./Tickets";
import { AppContext } from "../app";

export const Filter = () => {
    const { setLoaded, setUpdated } = useContext(TicketsContext);
    const { apiService }:ApiTypes = useContext(AppContext);
    const [checked, setChecked] = React.useState(false);

    const onClick = async () => {
      setChecked(!checked);
      setLoaded(false);
      await apiService?.filterTicket(!checked);
      setUpdated(true);
    }

    const onReset = async () => {
      setLoaded(false);
      setChecked(false);
      await apiService?.filterTicket(false, true);
      setUpdated(true);
    }

    return (
       <div className="filter">
         <div>
           <label>
               <span>Completed</span>
               <input type="checkbox" checked={checked} onClick={onClick} />
           </label>
             <input type="button" onClick={onReset} value="Reset" />
         </div>
      </div>
    )
}