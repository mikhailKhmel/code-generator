import React from 'react'
import MicroservicePanel from './microservice-panel'

const SettingsPanel = (props) => {
  console.log('open SettingsPanel', props)
  const { settings, onSaveSettings, onCloseSettings } = props
  switch (settings.type) {
    case 'microservice':
      console.log('open microservice')
      return (
        <MicroservicePanel
          settings={settings}
          onSaveSettings={onSaveSettings}
          onCloseSettings={onCloseSettings}
        />
      )
  }
}

export default SettingsPanel
