import React from 'react';

export default props => {
	const { catData } = props;

  return (
    <div className='cat-item'>{catData}</div>
  )
}
