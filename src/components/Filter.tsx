import React from 'react'
import "./Filter.css";
export enum EStatus{
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    ALL = "ALL",
}
interface IFilter{
    activeValue: EStatus;
    setActiveValue: (x: EStatus) => void
}
const Filter:React.FC<IFilter> = ({activeValue,setActiveValue}) => {
  return (
    <div className="filter" >
        {Object.values(EStatus).map(key => <button className={`filter-btn ${activeValue === EStatus[key] && "active"}`} onClick={() => setActiveValue(EStatus[key])}>{EStatus[key]}</button>)}
    </div>
  )
}

export default Filter