import React from 'react';

const Api = require('./api');
export const api = new Api();
export const ApiContext = React.createContext(api);

export default ApiContext;
