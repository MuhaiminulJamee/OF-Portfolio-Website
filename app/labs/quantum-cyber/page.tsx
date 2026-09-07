import type { Metadata } from 'next';
import { LabPage } from '@/components/page-parts';

export const metadata: Metadata = { title: 'Quantum Cyber Intelligence Lab', description: 'Research in quantum machine learning, quantum neural networks, cryptography and intelligent threat detection.' };
export default function QuantumCyberLabPage() { return <LabPage kind="quantum" />; }
