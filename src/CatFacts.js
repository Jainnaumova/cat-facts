import React, { Component } from 'react';
import CatFactList from './CatFactList';

import './catFacts.css';

const INITIAL_URL = 'https://catfact.ninja/facts?';

class CatFacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	catsData: [],
      nextPageUrl: null,
      prevPageUrl: null,
    }
  }

  componentDidMount() {
		this.fetchCatFacts(INITIAL_URL);
  }

  fetchCatFacts(url) {
    /*
    *	because of CORS issue we need to send the request through a CORS proxy,
    * https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors/43268098
    */
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const catUrl = `${url}&limit=10`;
  	fetch(proxyUrl + catUrl)
    	.then(res => res.json())
      .then(catFacts => {
      	this.setState({
          catsData: catFacts.data,
          nextPageUrl: catFacts.next_page_url,
          prevPageUrl: catFacts.prev_page_url})
      });
  }

  getNextPage() {
    this.fetchCatFacts(this.state.nextPageUrl);
  }

  getPrevPage() {
    this.fetchCatFacts(this.state.prevPageUrl);
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='header'>CATFACTS</div>
        <CatFactList catsData={this.state.catsData} />
        <div className='button-group'>
          <button
            disabled={this.state.prevPageUrl === null}
            className={this.state.prevPageUrl ? 'button' : 'button-disabled'}
            onClick={() => this.getPrevPage()}>Previous</button>
          <button
            disabled={this.state.nextPageUrl === null}
            className={this.state.nextPageUrl ? 'button' : 'button-disabled'}
            onClick={() => this.getNextPage()}>Next</button>
        </div>
      </div>
    );
  }
}

export default CatFacts;
