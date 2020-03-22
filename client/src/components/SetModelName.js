import React from 'react';
import ApiContext from '../apiContext';

class SetModelName extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.state = {
            modelName: "NoModel"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        this.context.getModelName()
        .then(body => this.setState({modelName: body.modelName}))
        .catch(err => console.log(err));
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();

        formData.append('file', this.fileInput.current.files[0]);
        formData.append('filename', this.fileInput.current.files[0].name);

        this.context.setModelStl(formData)
        .then(body => {
            if(body.status) {
                this.setState({modelName: body.modelName})
            }
            console.log(body)
        })
        .catch(err => console.log(err));
    }

    render() {
      return (
        <div class="card">
          <div class="card-header">
            Загрузка модели на сервер
          </div>
          <div class="card-body">
            <p>
                Модель на сервере: {this.state.modelName}
            </p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="setModelName">
                    Выбирите файл с моделью для загрузки
                </label>
                <input type="file" className="form-control-file"
                    ref={this.fileInput}
                    id="setModelName"/>
              </div>
              <button type="submit" className="btn btn-primary">
                Загрузить модель на сервер
              </button>
            </form>
          </div>
        </div>
      );
    }
}

export default SetModelName;
