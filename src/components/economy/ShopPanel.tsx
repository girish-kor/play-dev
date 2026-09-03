import React, { useState } from 'react';
import { Modal } from '../utility/Modal';
import { List } from '../utility/List';
import { Button } from '../utility/Button';
import { CurrencyDisplay } from '../hud/CurrencyDisplay';

interface ShopItem {
  id: string;
  name: string;
  price: number;
}

interface ShopPanelProps {
  inventory: ShopItem[];
  playerCurrency: { gold: number };
  prices: { buy: number; sell: number };
  onBuy: (item: ShopItem, quantity: number) => void;
  onSell: (item: ShopItem, quantity: number) => void;
  onClose: () => void;
}

export const ShopPanel: React.FC<ShopPanelProps> = ({
  inventory,
  playerCurrency,
  prices,
  onBuy,
  onSell,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <Modal isOpen={true} onRequestClose={onClose} title="Shop">
      <div>
        <CurrencyDisplay currencyType="Gold" amount={playerCurrency.gold} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="shop-quantity">Quantity</label>
          <input
            id="shop-quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <List
          items={inventory}
          renderItem={(item) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span>{item.name}</span>
              <span>{item.price * prices.buy} Gold</span>
              <span>Sell for {item.price * prices.sell} Gold</span>
              <Button onClick={() => onBuy(item, quantity)}>Buy</Button>
              <Button onClick={() => onSell(item, quantity)}>Sell</Button>
            </div>
          )}
          keyExtractor={(item) => item.id}
        />
      </div>
    </Modal>
  );
};
