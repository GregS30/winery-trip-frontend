import React from 'react';

const WineryList = (props) => {
  return (
    <div>
      <div>
        <h3 className="winery-header">Wineries</h3>
      </div>
      <div className="winery-list">
        {props.wineries.map(winery => {
          return (
            <p
              key={winery.id}
              onClick={(e) => props.handleClick(e, winery)}
            >{winery.name}</p>
          )
        })}
      </div>
    </div>
  )
}

export default WineryList;
