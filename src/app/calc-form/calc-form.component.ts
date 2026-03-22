import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calc-form',
  imports: [FormsModule],
  templateUrl: './calc-form.component.html',
  styleUrl: './calc-form.component.css'
})
export class CalcFormComponent {
  // 台積電
  priceTsmc = 0;
  qtyTsmc = 0;
  marginPctTsmc = 0;
  ratioTsmc = 0;
  pctTsmc = 0;

  // 台達電
  priceDelta = 0;
  qtyDelta = 0;
  marginPctDelta = 0;
  ratioDelta = 0;
  pctDelta = 0;

  // 台指期
  priceTx = 0;
  qtyTx = 0;
  marginTx = 0;
  ratioTx = 0;
  pctTx = 0;

  // 綜合權益數
  equity = 0;

  // 計算結果
  p1Tsmc = '--';
  p2Tsmc = '--';
  p1Delta = '--';
  p2Delta = '--';
  p1Tx = '--';
  p2Tx = '--';
  total = '--';
  netResult = '-';
  netClass = 'text-success';

  private roundToFixed(value: number, decimals: number): number {
    return Number(value.toFixed(decimals));
  }

  calculate(): void {
    const p1_tsmc = this.roundToFixed(this.priceTsmc * 2000 * this.marginPctTsmc * this.ratioTsmc, 0);
    const p_tsmc = this.priceTsmc * 0.1 * 2000;
    const p2_tsmc = p1_tsmc + this.roundToFixed(p_tsmc * this.pctTsmc, 0);
    const p2short_tsmc = Math.round(p2_tsmc * this.qtyTsmc / 10000);
    this.p1Tsmc = String(p1_tsmc);
    this.p2Tsmc = p2_tsmc + ' / ' + p2short_tsmc;

    const p1_delta = this.roundToFixed(this.priceDelta * 2000 * this.marginPctDelta * this.ratioDelta, 0);
    const p_delta = this.priceDelta * 0.1 * 2000;
    const p2_delta = p1_delta + this.roundToFixed(p_delta * this.pctDelta, 0);
    const p2short_delta = Math.round(p2_delta * this.qtyDelta / 10000);
    this.p1Delta = String(p1_delta);
    this.p2Delta = p2_delta + ' / ' + p2short_delta;

    const p1_tx = this.roundToFixed(this.marginTx * this.ratioTx, 0);
    const p_tx = this.priceTx * 0.1 * 200;
    const p2_tx = p1_tx + this.roundToFixed(p_tx * this.pctTx, 0);
    const p2short_tx = Math.round(p2_tx * this.qtyTx / 10000);
    this.p1Tx = String(p1_tx);
    this.p2Tx = p2_tx + ' / ' + p2short_tx;

    const totalVal = this.roundToFixed((p2_tsmc * this.qtyTsmc) + (p2_delta * this.qtyDelta) + (p2_tx * this.qtyTx), 0);
    this.total = String(totalVal);

    const net = this.roundToFixed(totalVal - this.equity, 0);
    this.netResult = String(net);
    this.netClass = net >= 0 ? 'text-success' : 'text-danger';
  }
}
