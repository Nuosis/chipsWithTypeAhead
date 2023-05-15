import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Typeahead } from 'react-bootstrap-typeahead';

const FileMaker = '{}';

window.emailData = function() {
  const emails = document.getElementById(["toChips","ccChips","bccChips"]).value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementsById("messageText").value;
  const dataObject = { "emails" : emails , "subjectText" : subject ,"messageText" : message };
  //console.log(dataObject)
  
  const obj = JSON.stringify(dataObject);
  //console.log(obj)
  
  FileMaker.PerformScript("send HTML EMail" , obj );
  
  };
  
window.addFiles = function ()
  {
  
    FileMaker.PerformScript("add Files");
  
  };

const renderApp = (container) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
};

renderApp(document.getElementById('toChips'));
renderApp(document.getElementById('ccChips'));
renderApp(document.getElementById('bccChips'));