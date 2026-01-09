import { render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';
import { describe, it, expect } from 'vitest';
import { Zap } from 'lucide-react';

describe('StatCard', () => {
    it('renders label and value', () => {
        render(<StatCard label="Test Stat" value="100" icon={<Zap />} color="text-red-500" />);

        expect(screen.getByText('Test Stat')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
    });
});
