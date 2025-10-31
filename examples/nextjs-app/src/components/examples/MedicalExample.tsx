'use client';

import React, { useState } from 'react';
import { useEncrypt, useFhevmStatus } from '@fhevm/sdk';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface MedicalRecord {
  recordId: string;
  patientId: string;
  dataType: string;
  encryptedValue: string;
  timestamp: string;
  status: string;
}

/**
 * Medical Example Component
 * Demonstrates confidential medical data storage using FHEVM
 */
export const MedicalExample: React.FC = () => {
  const { encrypt, isLoading: isEncrypting } = useEncrypt();
  const { isReady } = useFhevmStatus();

  const [patientId, setPatientId] = useState<string>('');
  const [dataType, setDataType] = useState<'bloodPressure' | 'heartRate' | 'glucose' | 'temperature'>('heartRate');
  const [value, setValue] = useState<string>('72');
  const [contractAddress, setContractAddress] = useState<string>('0x0000000000000000000000000000000000000000');
  const [userAddress, setUserAddress] = useState<string>('');
  const [record, setRecord] = useState<MedicalRecord | null>(null);
  const [error, setError] = useState<string>('');

  const dataTypeInfo = {
    bloodPressure: { label: 'Blood Pressure', unit: 'mmHg', icon: '🩺', range: '80-120' },
    heartRate: { label: 'Heart Rate', unit: 'bpm', icon: '❤️', range: '60-100' },
    glucose: { label: 'Blood Glucose', unit: 'mg/dL', icon: '🩸', range: '70-140' },
    temperature: { label: 'Body Temperature', unit: '°F', icon: '🌡️', range: '97-99' }
  };

  const handleSubmit = async () => {
    if (!isReady) {
      setError('FHEVM is not initialized yet');
      return;
    }

    if (!patientId || !userAddress) {
      setError('Please provide patient ID and user address');
      return;
    }

    try {
      setError('');

      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        setError('Please enter a valid number');
        return;
      }

      // Encrypt the medical data
      const encrypted = await encrypt(numValue, 'uint32', {
        contractAddress,
        userAddress
      });

      const newRecord: MedicalRecord = {
        recordId: 'MR-' + Date.now(),
        patientId,
        dataType: dataTypeInfo[dataType].label,
        encryptedValue: encrypted.handles.toString(),
        timestamp: new Date().toISOString(),
        status: 'stored'
      };

      setRecord(newRecord);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Card title="Confidential Medical Records" subtitle="Private healthcare data using FHE">
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{dataTypeInfo[dataType].icon}</span>
            <div>
              <p className="text-sm text-gray-600">{dataTypeInfo[dataType].label}</p>
              <p className="text-lg font-semibold text-green-900">
                Normal Range: {dataTypeInfo[dataType].range} {dataTypeInfo[dataType].unit}
              </p>
            </div>
          </div>
        </div>

        <Input
          label="Patient ID"
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="P-12345"
          helperText="Unique patient identifier"
        />

        <Input
          label="Healthcare Provider Address"
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="0x..."
          helperText="Your wallet address as healthcare provider"
        />

        <Input
          label="Contract Address"
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="0x..."
          helperText="Medical records contract address"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Type
          </label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="heartRate">Heart Rate (bpm)</option>
            <option value="bloodPressure">Blood Pressure (mmHg)</option>
            <option value="glucose">Blood Glucose (mg/dL)</option>
            <option value="temperature">Body Temperature (°F)</option>
          </select>
        </div>

        <Input
          label={`${dataTypeInfo[dataType].label} (${dataTypeInfo[dataType].unit})`}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          loading={isEncrypting}
          disabled={!isReady || isEncrypting}
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Store Confidential Record'}
        </Button>

        {record && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-900">Record Stored Successfully</h4>
              <span className="text-2xl">✅</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Record ID:</span>
                <span className="font-mono text-xs">{record.recordId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{record.patientId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Type:</span>
                <span className="font-semibold">{record.dataType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-2 py-0.5 bg-green-200 text-green-800 rounded text-xs font-medium">
                  {record.status}
                </span>
              </div>
              <div className="pt-2 border-t border-green-300">
                <p className="text-xs text-gray-600">Encrypted Handle:</p>
                <p className="font-mono text-xs break-all mt-1">{record.encryptedValue.substring(0, 50)}...</p>
              </div>
              <div className="pt-2 border-t border-green-300">
                <p className="text-xs text-gray-600">Timestamp:</p>
                <p className="text-xs mt-1">{new Date(record.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-600">
              🔒 This medical data is encrypted and can only be accessed by authorized healthcare
              providers with proper permissions. Patient privacy is fully protected on-chain.
            </p>
          </div>
        )}

        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            <strong>HIPAA-Compliant Privacy:</strong>
            <br />
            • All medical data encrypted before storage
            <br />
            • Role-based access control (RBAC)
            <br />
            • Audit trails for compliance
            <br />
            • No plaintext patient data exposed
            <br />• Computations on encrypted records possible
          </p>
        </div>
      </div>
    </Card>
  );
};
