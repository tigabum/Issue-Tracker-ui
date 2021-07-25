import React from 'react'
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';
import Page from './Page.jsx'
import {HashRouter as Router } from 'react-router-dom';

 const Element =(
                     <Router>
                            <Page/>
                     </Router>
 );


        ReactDOM.render(Element, document.getElementById("contents"))

        if(module.hot){
               module.hot.accept();
        }











