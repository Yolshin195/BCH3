import React from 'react';
import './App.css';
import { RunTask, SetModelName, WorkerList, ProgressTask, ResultateTask } from './components';
import { api, ApiContext } from './apiContext';


function App() {
  return (
    <ApiContext.Provider value={api}>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <SetModelName/>
                    </div>
                    <div className="">
                        <RunTask/>
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <WorkerList/>
                    </div>
                    <div className="mb-3">
                        <ProgressTask/>
                    </div>
                    <div className="mb-3">
                        <ResultateTask/>
                    </div>
                </div>
            </div>
        </div>
    </ApiContext.Provider>
  );
}

export default App;
