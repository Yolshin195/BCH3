import React from 'react';
import ApiContext from '../apiContext';
import Strip from './Strip';

class ResultateTaskList extends React.Component {
    static contextType = ApiContext;

    constructor(props, context) {
        super(props, context);

        this.state = {

            isError: false,

            error: null,
            status: props.status || false,
            taskList: []

        }

        this.timerId = null;

        this.getResultateTaskList = this.getResultateTaskList.bind(this);
    }
    componentDidMount() {
        this.getResultateTaskList()
    }

    componentWillUnmount() {

    }

    registerTimer(time) {
        this.timerId = setTimeout(() => {
            if(this.props.isUpdate) {
                this.getResultateTaskList();
            }
        }, time || 25000)
    }


    getResultateTaskList() {
        this.context.getResultateTaskList()
        .then(body => {
            this.registerTimer();

            console.log('taskList: ', body.taskList.taskList);
            this.setState(() => ({
                taskList: body.taskList.taskList
            }))
        })
        .catch(err => {
            this.registerTimer(100000);

            this.setState(() => ({
                isError: true,
                error: err
            }))
        })
    }

    render() {
      return (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <Strip list={['x', 'y', 'z', 'hits', 'time']}/>
            </li>
            {
                this.state.taskList.map(task => {
                    const list = [...task.point.map(el => el.toFixed(2)), task.hits, task.time.toFixed()];
                    return(
                        <li className="list-group-item">
                            <Strip list={list}/>
                        </li>
                    );
                })
            }
          </ul>
      );
    }
}

export default ResultateTaskList;
