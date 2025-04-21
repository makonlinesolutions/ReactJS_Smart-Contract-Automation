
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function WalletAutomationDashboard() {
  const [tradeAmount, setTradeAmount] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [proxy, setProxy] = useState('');
  const [logDir, setLogDir] = useState('');

  const handleWalletUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        const parsed = JSON.parse(result);
        setWallets(parsed);
      } catch {
        alert('Invalid wallet file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center">AUTOMATION</h1>

        <Input
          placeholder="Amount"
          value={tradeAmount}
          onChange={(e) => setTradeAmount(e.target.value)}
        />

        <Button onClick={() => document.getElementById('wallet-upload')?.click()} className="w-full">
          Batch Import Wallets
        </Button>
        <input
          id="wallet-upload"
          type="file"
          accept="application/json"
          onChange={handleWalletUpload}
          className="hidden"
        />

        <div className="text-sm text-gray-700 space-y-1">
          <p><strong>Stats</strong></p>
          <p>Num Wallets: {wallets.length}</p>
          <p>Balances: {(wallets.length * 0.02).toFixed(4)} ETH</p>
        </div>

        <div className="space-y-3">
          <Input placeholder="Telegram Account" value={telegram} onChange={(e) => setTelegram(e.target.value)} />
          <Input placeholder="Twitter Account" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          <Input placeholder="Discord Account" value={discord} onChange={(e) => setDiscord(e.target.value)} />
          <Textarea placeholder="Faucet Proxy (one per line)" value={proxy} onChange={(e) => setProxy(e.target.value)} />
          <Input placeholder="Log Export Directory" value={logDir} onChange={(e) => setLogDir(e.target.value)} />
        </div>

        <Button className="w-full" onClick={() => alert('🚀 Automation Started')}>
          Start
        </Button>
      </div>
    </div>
  );
}
