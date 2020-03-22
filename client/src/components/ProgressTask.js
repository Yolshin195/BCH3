import React from 'react';
import ApiContext from '../apiContext';

class ProgressTask extends React.Component {
    static contextType = ApiContext;

    constructor(props, context) {
        super(props, context);

        this.state = {

            isError: false,
            isUpdate: true,

            error: null,
            status: props.status || false,
            progress: [0, 0]

        }

        this.timerId = null;

        this.handleChange = this.handleChange.bind(this);
        this.getProgressTask = this.getProgressTask.bind(this);
    }
    componentDidMount() {
        this.registerTimer(1000);
    }

    componentWillUnmount() {

    }

    registerTimer(time) {
        this.timerId = setTimeout(() => {
            if(this.state.isUpdate) {
                this.getProgressTask()
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

    getProgressTask() {
        this.context.getProgressTask()
        .then(body => {
            this.registerTimer()

            this.setState(() => ({
                status: body.status,
                progress: body.progress 
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
                    title="Включить отслеживание прогресса выполнения задачь"
                    onChange={this.handleChange}
                    checked={this.state.isUpdate}
                    id="isUpdateTask"/>
                <label className="form-check-label" for="isUpdateTask">
                    Прогресс выполнения
                </label>
            </div>
          </div>
          <div className="card-body">
            <div className="progress">
              <div className="progress-bar"
                role="progressbar"
                style={{"width": `${((100 / this.state.progress[1]) * this.state.progress[0]) || 0}%`}}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              >{`${this.state.progress[0]} - ${this.state.progress[1]}`}</div>
            </div>
          </div>
        </div>
      );
    }
}

export default ProgressTask;
