import React, {Component, Fragment} from 'react';
import Switch from '@material-ui/core/Switch';

export default ({openDelete, item, toggleDisplayPost, updateOrder}) =>
  <li>
    <div className='date-content'>
      <h3>{item.date}</h3>
    </div>
    <div className='post-content'>
      <h3>{item.title}</h3>
      <p className='description'>
        {item.description}
      </p>
      <p className='link'>{item.link}</p>
      <div className='delete'>
        <div className='button' onClick={openDelete(item)}>Delete</div>
      </div>
    </div>
    <div className={item.display? 'switch active': 'switch'}>
      <Switch
        checked={item.display}
        onChange={toggleDisplayPost(item)}
        color='default'
      />

      <div className="order-val">
        {item.order}
      </div>
      <div className='order-buttons'>
        <div className='button' onClick={updateOrder(1, item)}>+</div>
        <div className='button' onClick={updateOrder(-1, item)}>-</div>
      </div>
    </div>
  </li>
