import React, { useState } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const WalletAutomationDashboard = () => {
  const [amount, setAmount] = useState('');
  const [walletCount, setWalletCount] = useState('');
  const [telegram, setTelegram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [proxy, setProxy] = useState('');
  const [logPath, setLogPath] = useState('');
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const fileText = await e.target.files[0].text();
        const parsed = JSON.parse(fileText);
        if (Array.isArray(parsed)) {
          setWallets(parsed);
          setWalletCount(parsed.length.toString());
        } else {
          alert("Invalid JSON format. Expected an array of wallets.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to read or parse the wallets.json file.");
      }
    }
  };

  const handleStart = async () => {
    if (!wallets.length) {
      alert("📂 Please upload a valid wallets.json file.");
      return;
    }

    if (!amount) {
      alert("❗ Please enter trade amount");
      return;
    }

    setLoading(true);

    const payload = {
      amount,
      walletCount,
      telegram,
      twitter,
      discord,
      proxy,
      logPath,
      wallets,
    };

    try {
      const response = await fetch(`${baseUrl}/api/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Backend error");

      const result = await response.json();
      if (result && result.message) {
        alert(`🚀 ${result.message}`);
      } else {
        alert("⚠️ Backend did not return a success message.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error triggering backend automation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span role="img" aria-label="brain">🧠</span> Wallet Automation Dashboard
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm font-semibold">Amount to Trade</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Number of Wallets</label>
            <input
              type="number"
              value={walletCount}
              disabled
              className="w-full p-2 border rounded mt-1 bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold">Upload wallets.json</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            placeholder="Telegram"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Twitter"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            placeholder="Discord"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
            placeholder="Proxy URL"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={logPath}
            onChange={(e) => setLogPath(e.target.value)}
            placeholder="Log Export Path"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white p-3 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "⏳ Starting..." : "🚀 Start Automation"}
        </button>
      </div>
    </div>
  );
};

export default WalletAutomationDashboard;
