import React, { useState } from 'react';
import { Plus, Trash2, Calculator, Receipt } from 'lucide-react';

interface QuoteItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export const CrmQuotes: React.FC = () => {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', name: 'Software Enterprise License (Annual)', price: 12000, qty: 1 },
    { id: '2', name: 'Custom Developer Sandbox API Provisioning', price: 4500, qty: 1 },
    { id: '3', name: 'Premium Team Setup & Support Tier', price: 1500, qty: 3 }
  ]);

  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [taxPercent, setTaxPercent] = useState<number>(8);

  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemQty, setNewItemQty] = useState<number>(1);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemPrice <= 0) return;

    const item: QuoteItem = {
      id: Date.now().toString(),
      name: newItemName,
      price: newItemPrice,
      qty: newItemQty
    };

    setItems([...items, item]);
    setNewItemName('');
    setNewItemPrice(0);
    setNewItemQty(1);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountVal = (subtotal * discountPercent) / 100;
  const taxVal = ((subtotal - discountVal) * taxPercent) / 100;
  const grandTotal = subtotal - discountVal + taxVal;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      <div className="grid-cols-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Quote Calculator list */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
            Interactive Quote Estimator
          </h2>

          {/* Table list */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Item / Service</th>
                  <th style={{ textAlign: 'center' }}>Price</th>
                  <th style={{ textAlign: 'center' }}>Qty</th>
                  <th style={{ textAlign: 'right' }}>Total</th>
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ fontSize: '13.5px', fontWeight: 500 }}>{item.name}</span>
                    </td>
                    <td style={{ textAlign: 'center', fontSize: '13px' }}>${item.price.toLocaleString()}</td>
                    <td style={{ textAlign: 'center', fontSize: '13px' }}>{item.qty}</td>
                    <td style={{ textAlign: 'right', fontWeight: 600, fontSize: '13.5px' }}>
                      ${(item.price * item.qty).toLocaleString()}
                    </td>
                    <td>
                      <button 
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                        className="hover-danger"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add item form inline */}
          <form onSubmit={handleAddItem} style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(255,255,255,0.01)',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ flex: 2 }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Item Name</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Item name"
                required
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                style={{ fontSize: '13px', padding: '6px 10px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Price ($)</label>
              <input 
                type="number" 
                className="form-control" 
                required
                value={newItemPrice || ''}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
                placeholder="0"
                style={{ fontSize: '13px', padding: '6px 10px' }}
              />
            </div>
            <div style={{ width: '70px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Qty</label>
              <input 
                type="number" 
                className="form-control" 
                min={1}
                required
                value={newItemQty}
                onChange={(e) => setNewItemQty(Number(e.target.value))}
                style={{ fontSize: '13px', padding: '6px 10px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" style={{ height: '36px' }}>
              <Plus size={14} /> Add
            </button>
          </form>
        </div>

        {/* Totals Summary Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Calculator size={18} style={{ color: 'var(--primary)' }} /> Summary Total
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>

            {/* Editable Discount */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Discount (%):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '70px' }}>
                <input 
                  type="number" 
                  className="form-control" 
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  style={{ fontSize: '12.5px', padding: '4px 6px', textAlign: 'right' }}
                />
              </div>
            </div>

            {/* Editable Tax */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Tax Rate (%):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '70px' }}>
                <input 
                  type="number" 
                  className="form-control" 
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  style={{ fontSize: '12.5px', padding: '4px 6px', textAlign: 'right' }}
                />
              </div>
            </div>

            {/* Split dividers */}
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Discount Amount:</span>
              <span style={{ color: 'var(--danger)' }}>-${discountVal.toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Tax Amount:</span>
              <span>+${taxVal.toLocaleString()}</span>
            </div>

            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '14px' }}>Grand Total:</span>
              <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--success)' }}>
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
            <Receipt size={16} /> Save & Generate Quote
          </button>
        </div>
      </div>
      <style>{`
        .hover-danger:hover {
          color: var(--danger) !important;
        }
      `}</style>
    </div>
  );
};
