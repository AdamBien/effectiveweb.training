import AirNav from './AirNav.js';
import AirSlot from './AirSlot.js';
import AirCrumb from './AirCrumb.js';
import TotalView from './views/TotalView.js';
import AirUpdate from './AirUpdate.js';
import AirStorage from './AirStorage.js';

navigator.serviceWorker.register('/stockz-worker.js').
    then(registration => console.log('registration succeeded', registration)).
    catch(error => console.error('registration not successful',error));