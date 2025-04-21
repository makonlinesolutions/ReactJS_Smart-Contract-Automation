import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function WalletAutomationDashboard() {
  const [tradeAmount, setTradeAmount] = useState('');
  const [walletCount, setWalletCount] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [proxy, setProxy] = useState('');
  const [logDir, setLogDir] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ tradeAmount?: string; walletCount?: string }>({});

  const handleWalletUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setWallets(parsed);
        setWalletCount(parsed.length.toString());
        toast.success(`✅ Imported ${parsed.length} wallets`);
      } catch {
        toast.error('❌ Invalid wallet file');
      }
    };
    reader.readAsText(file);
  };

  const handleStartAutomation = async () => {
    const validationErrors: { tradeAmount?: string; walletCount?: string } = {};

    if (!wallets || wallets.length === 0) {
      toast.error('❌ Please import at least one wallet before starting automation.');
      return;
    }

    if (!tradeAmount || parseFloat(tradeAmount) <= 0) {
      validationErrors.tradeAmount = 'Trade amount is required and must be a number';
    }

    if (!walletCount || parseInt(walletCount) <= 0) {
      validationErrors.walletCount = 'Wallet count is required and must be a number';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      setErrors({});
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: tradeAmount,
          walletCount,
          wallets,
          telegram,
          twitter,
          discord,
          faucetProxy: proxy.split('\n'),
          logDir,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`✅ ${data.message}`);
      } else {
        toast.error(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error('❌ API call failed:', error);
      toast.error('❌ Something went wrong. Please check the console for more info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        <h1 className="text-2xl font-bold text-center">AUTOMATION</h1>

        <div>
          <Input
            type="number"
            placeholder="Amount"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
          />
          {errors.tradeAmount && <p className="text-red-600 text-sm mt-1">{errors.tradeAmount}</p>}
        </div>

        <div>
          <Input
            type="number"
            placeholder="Number of wallets to be used"
            value={walletCount}
            onChange={(e) => setWalletCount(e.target.value)}
          />
          {errors.walletCount && <p className="text-red-600 text-sm mt-1">{errors.walletCount}</p>}
        </div>

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

        <Button className="w-full" onClick={handleStartAutomation} disabled={wallets.length === 0 || loading}>
          {loading ? 'Starting...' : 'Start'}
        </Button>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  );
}
