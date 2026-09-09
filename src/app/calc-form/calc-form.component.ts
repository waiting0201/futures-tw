import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MarginOption {
  label: string;
  value: number;
}

interface StockFutures {
  name: string;
  price: number;
  qty: number;
  marginPct: number;
  ratio: number;
  pct: number;
  p1: string;
  p2: string;
  marginOptions: MarginOption[];
}

interface IndexFutures {
  name: string;
  price: number;
  qty: number;
  margin: number;
  ratio: number;
  pct: number;
  p1: string;
  p2: string;
}

const MARGIN_OPTIONS: MarginOption[] = [
  { label: '13.5%', value: 0.135 },
  { label: '16.2%', value: 0.162 },
  { label: '20.25%', value: 0.2025 },
];

const MARGIN_OPTIONS_LARGAN: MarginOption[] = [
  ...MARGIN_OPTIONS,
  { label: '24.3%', value: 0.243 },
];

@Component({
  selector: 'app-calc-form',
  imports: [FormsModule],
  templateUrl: './calc-form.component.html',
  styleUrl: './calc-form.component.css'
})
export class CalcFormComponent {
  stocks: StockFutures[] = [
    { name: '台積電', price: 0, qty: 0, marginPct: 0, ratio: 0, pct: 0, p1: '--', p2: '--', marginOptions: MARGIN_OPTIONS },
    { name: '台達電', price: 0, qty: 0, marginPct: 0, ratio: 0, pct: 0, p1: '--', p2: '--', marginOptions: MARGIN_OPTIONS },
    { name: '聯發科', price: 0, qty: 0, marginPct: 0, ratio: 0, pct: 0, p1: '--', p2: '--', marginOptions: MARGIN_OPTIONS },
    { name: '大立光', price: 0, qty: 0, marginPct: 0, ratio: 0, pct: 0, p1: '--', p2: '--', marginOptions: MARGIN_OPTIONS_LARGAN },
  ];

  indexes: IndexFutures[] = [
    { name: '台指', price: 0, qty: 0, margin: 0, ratio: 0, pct: 0, p1: '--', p2: '--' },
  ];

  equity = 0;
  total = '--';
  netResult = '-';
  netClass = 'text-success';

  private roundToFixed(value: number, decimals: number): number {
    return Number(value.toFixed(decimals));
  }

  calculate(): void {
    let totalRaw = 0;

    for (const s of this.stocks) {
      const p1 = this.roundToFixed(s.price * 2000 * s.marginPct * (s.ratio / 100), 0);
      const p = s.price * 0.1 * 2000;
      const p2 = p1 + this.roundToFixed(p * s.pct, 0);
      const p2short = Math.round(p2 * s.qty / 10000);
      s.p1 = String(p1);
      s.p2 = p2 + ' / ' + p2short;
      totalRaw += p2 * s.qty;
    }

    for (const idx of this.indexes) {
      const p1 = this.roundToFixed(idx.margin * (idx.ratio / 100), 0);
      const p = idx.price * 0.1 * 200;
      const p2 = p1 + this.roundToFixed(p * idx.pct, 0);
      const p2short = Math.round(p2 * idx.qty / 10000);
      idx.p1 = String(p1);
      idx.p2 = p2 + ' / ' + p2short;
      totalRaw += p2 * idx.qty;
    }

    const totalVal = this.roundToFixed(totalRaw, 0);
    this.total = String(totalVal);

    const net = this.roundToFixed(totalVal - this.equity, 0);
    this.netResult = String(net);
    this.netClass = net >= 0 ? 'text-success' : 'text-danger';
  }
}
