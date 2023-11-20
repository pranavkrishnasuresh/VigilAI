// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StationSignUp from './pages/StationSignUp';
import StationSignIn from './pages/StationSignIn';
import OfficerSignUp from './pages/OfficerSignUp';
import OfficerSignIn from './pages/OfficerSignIn';
import StationDashboard from './pages/StationDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import StationReporting from './pages/StationReporting';
import OfficerReporting from './pages/OfficerReporting';
import StationSettings from './pages/StationSettings';
import OfficerSettings from './pages/OfficerSettings';
import DefaultComponent from './pages/DefaultComponent';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // Import the Navbar component
import StationCopAnalysis from './pages/StationCopAnalysis';
import OfficerQuiz from './pages/OfficerQuiz';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar component */}
      <Switch>
        {/* Authentication Pages */}
        <Route path="/station/signup" component={StationSignUp} />
        <Route path="/station/signin" component={StationSignIn} />
        <Route path="/officer/signup" component={OfficerSignUp} />
        <Route path="/officer/signin" component={OfficerSignIn} />

        {/* Station User Pages */}
        <Route path="/station/dashboard" component={StationDashboard} />
        <Route path="/station/officers" component={StationCopAnalysis}/>
        <Route path="/station/reporting" component={StationReporting} />
        <Route path="/station/settings" component={StationSettings} />

        {/* Officer User Pages */}
        <Route path="/officer/dashboard" component={OfficerDashboard} />
        <Route path="/officer/reporting" component={OfficerReporting} />
        <Route path="/officer/settings" component={OfficerSettings} />
        <Route path="/officer/quiz" component={OfficerQuiz} />

        {/* Default or 404 */}
        <Route path="/" component={DefaultComponent} />
      </Switch>
      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
