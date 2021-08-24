import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  
  const div = document.createElement('divvvv');
  ReactDOM.render(<Apap />, div);
  ReactDOM.unmountComponentAtNode(div);
});
