import React from 'react';
import ApiContext from '../apiContext';

class RunTask extends React.Component {
    static contextType = ApiContext;

    constructor(props, context) {
        super(props, context);

        this.state = {

            mc_repeat: 10,
            mc_center: [0, 50, 0],
            mc_radius: 10,

            bch_normal: [1, 0, 0],
            bch_number: 18,
            bch_cycles: 1,
            status: false

        }

        this.timerId = null;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePoint = this.handlePoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getStatus()
    }

    registerTimer(time) {
        this.timerId = setTimeout(() => {
            if(this.state.status) {
                this.getStatus();
            }
        }, time || 25000)
    }

    getStatus() {
        this.context.getStatus()
        .then(body => {
            this.registerTimer()

            this.setState(() => ({
                status: body.status,
            }))
        })
        .catch(err => {
            this.registerTimer(100000)
        })
    }

    handleChange({target}) {
        console.log(target.name, target.value);
        this.setState(() => ({
            [target.name]: Number(target.value)
        }))
    }

    handlePoint({target}) {
        this.setState(() => ({
            [target.name]: this.stringToPoint(target.value)
        }))
    }

    stringToPoint(str) {
        var point = str.split(',');
        console.log(point);
        return point.map(el => {
            var t = el.match(/[0-9]+/) 
            return (t === null) ? 0 : Number(t[0])
        })
    }

    pointToString([x, y, z]) {
        return `x=${x}, y=${y}, z=${z}`;
    }

    handleSubmit(event) {
        event.preventDefault();

        const body = {...this.state};
        delete body.status;

        this.context.run(body)
        .then(body => {
            this.getStatus()

            this.setState(() => ({
                status: body.status,
            }))
        })
        .catch(err => console.log(err), this.getStatus());
    }

    render() {
        console.log('context: ', this.context);
      return (
        <div className="card">
          <div className="card-header">
            Параметры расчёта
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="normal">
                    Боевая часть: Нормаль
                </label>
                <input type="text" className="form-control" 
                    placeholder="Enter number"
                    id="normal"
                    name="bch_normal"
                    value={this.pointToString(this.state.bch_normal)}
                    onChange={this.handlePoint}
                />
              </div>
              <div className="form-group">
                <label for="number">
                    Боевая часть: количество поражающих эллементов
                </label>
                <input type="number" className="form-control"
                    placeholder="Enter number"
                    id="number"
                    name="bch_number"
                    value={this.state.bch_number}
                    onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="cycles">
                    Боевая часть: количество колец 
                </label>
                <input type="number" className="form-control"
                    placeholder="Enter number"
                    id="cycles"
                    name="bch_cycles"
                    value={this.state.bch_cycles}
                    onChange={this.handleChange}
                />
              </div>

              <div className="form-group">
                <label for="NumberOfRandomPoints">
                    Монте Карло: Повторений 
                </label>
                <input type="number" className="form-control"
                    placeholder="Enter number"
                    id="repeat"
                    name="mc_repeat"
                    value={this.state.mc_repeat}
                    onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label for="NumberOfRandomPoints">
                    Монте Карло: Центер 
                </label>
                <input type="text" className="form-control"
                    placeholder="Enter number"
                    id="center"
                    name="mc_center"
                    value={this.pointToString(this.state.mc_center)}
                    onChange={this.handlePoint}
                />
              </div>
              <div className="form-group">
                <label for="NumberOfRandomPoints">
                    Монте Карло: Радиус
                </label>
                <input type="number" className="form-control"
                    placeholder="Enter number"
                    id="radius"
                    name="mc_radius"
                    value={this.state.mc_radius}
                    onChange={this.handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={this.state.status}>
                Выполнить расчёт
              </button>
            </form>
          </div>
        </div>
      );
    }
}

export default RunTask;
