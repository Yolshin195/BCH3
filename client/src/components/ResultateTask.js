import React from 'react';
import ApiContext from '../apiContext';
import ResultateTaskList from './ResultateTaskList';

class ResultateTask extends React.Component {
    static contextType = ApiContext;

    constructor(props, context) {
        super(props, context);

        this.state = {

            isError: false,
            isUpdate: true,

            error: null,
            status: props.status || false,
            resultateVP: 0

        }

        this.timerId = null;

        this.handleChange = this.handleChange.bind(this);
        this.getResultateTask = this.getResultateTask.bind(this);
    }
    componentDidMount() {
        this.registerTimer(1000);
    }

    componentWillUnmount() {

    }

    registerTimer(time) {
        this.timerId = setTimeout(() => {
            if(this.state.isUpdate) {
                this.getResultateTask();
            }
        }, time || 10000)
    }

    handleChange({target}) {
        if(target.checked) {
            this.registerTimer()
        }
        this.setState( () => ({
            isUpdate: target.checked
        }))
    }

    getResultateTask() {
        this.context.getResultateTask()
        .then(body => {
            this.registerTimer()

            this.setState(() => ({
                status: body.status,
                resultateVP: body.resultate 
            }))
        })
        .catch(err => {
            this.registerTimer(20000)

            this.setState(() => ({
                isError: true,
                error: err
            }))
        })
    }

    render() {
      return (
        <div className="card">
          <div className="card-header">
            <div className="form-group form-check" style={{"margin-bottom": 0}}>
                <input type="checkbox" className="form-check-input"
                    title="Включить обновление результата расчётов"
                    onChange={this.handleChange}
                    checked={this.state.isUpdate}
                    id="isUpdateTask"/>
                <label className="form-check-label" for="isUpdateTask">
                    Результат расчётов
                </label>
            </div>
          </div>
          <div className="card-body">
            <p>Вероятность поподания: {this.state.resultateVP.toFixed(2)}</p>
          </div>
          <ResultateTaskList isUpdate={this.state.isUpdate}/>
        </div>
      );
    }
}

export default ResultateTask;
