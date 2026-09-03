import React from 'react';
import { Modal } from '../utility/Modal';
import { Tab } from '../utility/Tab';
import { Slider } from '../utility/Slider';
import { Toggle } from '../utility/Toggle';
import { KeyBindings } from '../controls/KeyBindings';
import type { SettingsState } from '../../contexts/SettingsContext';

interface SettingsPanelProps {
  settings: SettingsState;
  onChange: (key: string, value: number | boolean) => void;
  onSave: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onChange,
  onSave,
  onReset,
  onClose,
}) => {
  const tabs = [
    {
      label: 'Audio',
      content: (
        <>
          <Slider
            label="Volume"
            value={settings.audio.volume}
            onChange={(v) => onChange('audio.volume', v)}
          />
          <Toggle
            label="Mute"
            checked={settings.audio.muted}
            onChange={(v) => onChange('audio.muted', v)}
          />
        </>
      ),
    },
    {
      label: 'Video',
      content: (
        <>
          <Slider
            label="Brightness"
            value={settings.video.brightness}
            min={0.5}
            max={1.5}
            step={0.1}
            onChange={(v) => onChange('video.brightness', v)}
          />
          <Toggle
            label="Fullscreen"
            checked={settings.video.fullscreen}
            onChange={(v) => onChange('video.fullscreen', v)}
          />
        </>
      ),
    },
    {
      label: 'Controls',
      content: <KeyBindings bindings={settings.keybindings} onReset={onReset} />,
    },
  ];

  return (
    <Modal isOpen={true} onRequestClose={onClose} title="Settings">
      <Tab tabs={tabs} />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={onSave}>Save</button>
        <button onClick={onReset}>Reset</button>
      </div>
    </Modal>
  );
};
