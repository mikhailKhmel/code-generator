import React from 'react'
import MicroservicePanel from './microservice-panel'
import DatabasePanel from './database-panel'

const SettingsPanel = (props) => {
  console.log('open SettingsPanel', props)
  const { settings, onSaveSettings, onCloseSettings } = props
  switch (settings.type) {
    case 'microservice':
      return (
        <MicroservicePanel
          settings={settings}
          onSaveSettings={onSaveSettings}
          onCloseSettings={onCloseSettings}
        />
      )
    case 'database':
      return (
        <DatabasePanel settings={settings} onSaveSettings={onSaveSettings} onCloseSettings={onCloseSettings} />
      )
  }
}

export default SettingsPanel
