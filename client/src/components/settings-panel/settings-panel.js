import React from "react";

import './settings-panel.css';

const SettingsPanel = (props) => {
    const { objectType, onCloseSettings } = props;
    return (
        <div className="container-settings">
            <div className="settings-panel">
                <div className="row">
                    <p className="object-type">{objectType}</p>
                    <button className="btn-close" onClick={() => onCloseSettings()}></button>
                </div>
                <input className="object-name" type="text" placeholder={`Название ${objectType}`} />
                <input className="object-name" type="text" placeholder="Адрес" />
                <input className="object-name" type="text" placeholder="Порт" />
                {objectType === 'Микросервис' &&
                    <div>
                        <div class="cache">
                            <label>Кэш</label>
                            <input type="checkbox" className="check-input" />
                        </div>
                        <select className="microservice-type">
                            <option value="gateway">
                                Перенаправляющий
                            </option>
                            <option value="defualt">
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
                }
                <button className="btn-save">Сохранить</button>
            </div>
        </div>
    );
};

export default SettingsPanel;