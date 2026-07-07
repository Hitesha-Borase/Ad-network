import React, { useState } from 'react';
import { Search, Eye, X, Download, Printer } from 'lucide-react';

interface Invoice {
  id: string;
  client: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid' | 'overdue';
  items: { name: string; qty: number; price: number }[];
}

const initialInvoices: Invoice[] = [
  { 
    id: 'INV-2026-001', 
    client: 'Wayne Enterprises', 
    amount: 12500, 
    dueDate: '22 Jun 2026', 
    status: 'paid',
    items: [
      { name: 'Developer Sandbox Provisioning', qty: 1, price: 4500 },
      { name: 'SaaS Platform Subscription SLA', qty: 8, price: 1000 }
    ]
  },
  { 
    id: 'INV-2026-002', 
    client: 'Stark Industries', 
    amount: 45000, 
    dueDate: '10 Jul 2026', 
    status: 'unpaid',
    items: [
      { name: 'Core Engine Creative Strategy Support', qty: 1, price: 30000 },
      { name: 'Media Ad Buy Campaign Builders', qty: 1, price: 15000 }
    ]
  },
  { 
    id: 'INV-2026-003', 
    client: 'Cyberdyne Systems', 
    amount: 8500, 
    dueDate: '05 Jul 2026', 
    status: 'overdue',
    items: [
      { name: 'Custom AI Modeling Consulting Hours', qty: 10, price: 850 }
    ]
  }
];

export const CrmInvoices: React.FC = () => {
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(inv =>
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="fade-in">
      {/* Top search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search invoice number or client..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>
      </div>

      {/* Invoice table list */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client Name</th>
                <th>Amount Due</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{inv.id}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.client}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>${inv.amount.toLocaleString()}</span>
                  </td>
                  <td style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{inv.dueDate}</td>
                  <td>
                    <span className="badge" style={{
                      backgroundColor: 
                        inv.status === 'paid' ? 'var(--success-light)' :
                        inv.status === 'overdue' ? 'var(--danger-light)' : 'var(--warning-light)',
                      color:
                        inv.status === 'paid' ? 'var(--success)' :
                        inv.status === 'overdue' ? 'var(--danger)' : 'var(--warning)'
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => setSelectedInvoice(inv)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Detail Modal (Invoice Receipt) */}
      {selectedInvoice && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px', padding: '30px' }}>
            {/* Modal Actions Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Invoice Details</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>ID: {selectedInvoice.id}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }}><Printer size={14} /></button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '6px' }}><Download size={14} /></button>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: '10px' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Document layout */}
            <div style={{
              backgroundColor: '#121721',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontSize: '13.5px'
            }}>
              {/* Top corporate info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontWeight: 700, color: '#fff', fontSize: '16px', margin: '0 0 4px 0' }}>AD NETWORK</h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>100 Pine Street, San Francisco, CA</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge" style={{
                    backgroundColor: 
                      selectedInvoice.status === 'paid' ? 'var(--success-light)' :
                      selectedInvoice.status === 'overdue' ? 'var(--danger-light)' : 'var(--warning-light)',
                    color:
                      selectedInvoice.status === 'paid' ? 'var(--success)' :
                      selectedInvoice.status === 'overdue' ? 'var(--danger)' : 'var(--warning)'
                  }}>
                    {selectedInvoice.status}
                  </span>
                </div>
              </div>

              {/* Bill to block */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>BILL TO:</span>
                  <strong style={{ color: '#fff' }}>{selectedInvoice.client}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>DUE DATE:</span>
                  <strong style={{ color: '#fff' }}>{selectedInvoice.dueDate}</strong>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '12px 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-secondary)', fontSize: '11.5px', fontWeight: 600 }}>
                      <th style={{ padding: '6px 0' }}>Item Description</th>
                      <th style={{ textAlign: 'center', padding: '6px 0' }}>Qty</th>
                      <th style={{ textAlign: 'right', padding: '6px 0' }}>Rate</th>
                      <th style={{ textAlign: 'right', padding: '6px 0' }}>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx} style={{ borderTop: '1px solid rgba(255,255,255,0.03)', fontSize: '12.5px' }}>
                        <td style={{ padding: '10px 0', color: 'var(--text-primary)' }}>{item.name}</td>
                        <td style={{ textAlign: 'center', padding: '10px 0', color: 'var(--text-secondary)' }}>{item.qty}</td>
                        <td style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text-secondary)' }}>${item.price.toLocaleString()}</td>
                        <td style={{ textAlign: 'right', padding: '10px 0', fontWeight: 600, color: 'var(--text-primary)' }}>
                          ${(item.qty * item.price).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculation Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '180px', alignSelf: 'flex-end', textAlign: 'right', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal:</span>
                  <span>${selectedInvoice.amount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Tax (0%):</span>
                  <span>$0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
                  <span>Total Due:</span>
                  <span style={{ color: 'var(--success)' }}>${selectedInvoice.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
