import React, { Component } from "react";

import './settings-panel.css';

export default class SettingsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            port: '',
            cache: false,
            microserviceType: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (target.type === 'checkbox') {
            console.log('input checkbox', value);
        }
        this.setState({
            [name]: value
        });
    }

    handleSelectChange(event) {
        this.setState({microserviceType: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSaveSettings(this.state);
    }

    componentDidMount() {
        console.log('mount', this.props.node);
        if (this.props.node.name === undefined) {
            this.setState({id: this.props.node.id});
        } else {
            const {id, name, address, port, cache, microserviceType} = this.props.node;
            this.setState({
                name,
                id,
                address,
                port,
                cache,
                microserviceType
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update');
        console.log('prevProps', prevProps, prevState);
        console.log('current props', this.props);
        if (prevState.id !== '') {
            if (this.props.node.id !== prevState.id) {

                const {name, address, port, cache, microserviceType} = this.props.node;
                console.log('update settings', name, address, port, cache, microserviceType);
                this.setState({
                    name: name === undefined ? '' : name,
                    id: this.props.node.id,
                    address: address === undefined ? '' : address,
                    port: port === undefined ? '' : port,
                    cache: cache,
                    microserviceType: microserviceType === undefined ? '' : microserviceType
                });
            }
        }
    }

    render() {
        let label = '';
        console.log('render', this.state);
        if (this.state.name !== undefined) {
            label = this.state.name;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container-settings">
                    <div className="settings-panel">
                        <div className="row">
                            <p className="object-type">Микросервис</p>
                            <button className="btn-close" onClick={() => this.props.onCloseSettings()}/>
                        </div>
                        <input name="name" className="object-name" type="text" placeholder={`Название ${label}`}
                               value={this.state.name} onChange={this.handleInputChange}/>
                        <input name="address" className="object-name" type="text" placeholder="Адрес"
                               value={this.state.address} onChange={this.handleInputChange}/>
                        <input name="port" className="object-name" type="text" placeholder="Порт"
                               value={this.state.port} onChange={this.handleInputChange}/>
                        <div>
                            <div className="cache">
                                <label>Кэш</label>
                                <input name="cache" type="checkbox" className="check-input" checked={this.state.cache}
                                       onChange={this.handleInputChange}/>
                            </div>
                            <select className="microservice-type" value={this.state.microserviceType}
                                    onChange={this.handleSelectChange}>
                                <option value="gateway">
                                    Перенаправляющий
                                </option>
                                <option value="default">
                                    Обычный
                                </option>
                                <option value="publisher">
                                    Поставщик
                                </option>
                                <option value="subscriber">
                                    Получатель
                                </option>
                            </select>
                        </div>
                        <input className="btn-save" type="submit" value="Сохранить"/>
                    </div>
                </div>
            </form>
        );
    }

}