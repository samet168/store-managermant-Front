// App.jsx
import React from 'react';
import { AppRoute } from './routes/AppRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return <AppRoute />; // No BrowserRouter here
};

export default App;