import React from 'react';
import ApiContext from '../apiContext';

class WorkerList extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.state = {
            workerList: [],
            isUpdate: true,
        }

        this.timerId = null;

        this.handleChange = this.handleChange.bind(this);
        this.updateWorkerList = this.updateWorkerList.bind(this);
    }

    handleChange({target}) {
        this.setState(() => ({isUpdate: target.checked}));
        this.registerTimer(100)
    }

    registerTimer(time) {
        this.timerId = setTimeout(() => {
            if(this.state.isUpdate) {
                this.updateWorkerList()
            }
        }, time || 10000)
    }

    componentDidMount() {
        this.registerTimer(100)
    }

    updateWorkerList() {
        this.context.getWorkerList()
        .then(res => {
            this.registerTimer()
            this.setState(() => ({workerList : res.workerList}))
        })
        .catch(err => {
            this.registerTimer(50000)
            console.log(err);
        })
    }

    componentWillUnmount() {

    }



    render() {
      return (
        <div className="card">
          <div className="card-header">
            <div className="form-group form-check" style={{"margin-bottom": 0}}>
                <input type="checkbox" className="form-check-input"
                    title="Включить мониторинг за серверами"
                    onChange={this.handleChange}
                    checked={this.state.isUpdate}
                    id="exampleCheck1"/>
                <label className="form-check-label" for="exampleCheck1">
                    Список серверов 
                </label>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {
                this.state.workerList.map(el => {
                    return(
                        <li className="list-group-item">
                            <Worker config={el}/>
                        </li>
                    );
                })
            }
          </ul>
        </div>
      );
    }
}

function Worker({config}) {
    var items = [];
    for(let key in config) {
        items.push(<span>{config[key]}</span>);
    }

    return items; 
}


export default WorkerList;
