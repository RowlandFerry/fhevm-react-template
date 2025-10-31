import React from 'react'

interface WalletConnectProps {
  isConnected: boolean
  userAddress: string | null
  onConnect: () => void
}

export function WalletConnect({ isConnected, userAddress, onConnect }: WalletConnectProps) {
  return (
    <div className="card">
      <h3>Wallet Status</h3>
      {isConnected && userAddress ? (
        <div className="wallet-info">
          <p className="status">✅ Connected</p>
          <p className="address">
            {userAddress.substring(0, 6)}...{userAddress.substring(userAddress.length - 4)}
          </p>
        </div>
      ) : (
        <div className="wallet-info">
          <p className="status">Not Connected</p>
          <button className="btn" onClick={onConnect}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  )
}
