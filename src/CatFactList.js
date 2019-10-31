import React from 'react';
import shortid from 'shortid';
import CatFact from './CatFact';

export default props => {
	const { catsData } = props;

	return (
    <div className='rows'>
      {catsData.map(catData => (
				<div className='cat-container' key={shortid.generate()}>
      	  <CatFact catData={catData.fact} />
        </div>
			))}
    </div>
  )
}
