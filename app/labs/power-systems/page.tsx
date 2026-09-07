import type { Metadata } from 'next';
import { LabPage } from '@/components/page-parts';

export const metadata: Metadata = { title: 'AI in Power Systems Lab', description: 'Research in renewable-energy forecasting, optimization, intelligent grids and decision-aware deep learning.' };
export default function PowerSystemsLabPage() { return <LabPage kind="power" />; }
