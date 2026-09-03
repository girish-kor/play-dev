import React from 'react';
import { List } from '../utility/List';
import { useSettings } from '../../contexts/SettingsContext';

interface KeyBindingsProps {
  bindings: Record<string, string>;
  onReset?: () => void;
}

export const KeyBindings: React.FC<KeyBindingsProps> = ({ bindings: _bindings, onReset }) => {
  const { settings, dispatchSettings } = useSettings();
  const entries = Object.entries(settings.keybindings);

  const handleChange = (action: string, newKey: string) => {
    dispatchSettings({
      type: 'UPDATE_KEYBINDINGS',
      payload: { ...settings.keybindings, [action]: newKey },
    });
  };

  return (
    <div>
      <List
        items={entries}
        renderItem={([action, key]) => (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span>{action}</span>
            <input
              value={key}
              onChange={(e) => handleChange(action, e.target.value)}
              placeholder="Press key"
            />
          </div>
        )}
        keyExtractor={([action]) => action}
      />
      {onReset && <button onClick={onReset}>Reset</button>}
    </div>
  );
};
