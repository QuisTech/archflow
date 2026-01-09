import { describe, it, expect } from 'vitest';
import { validateStructure, extractDependencies } from '../analyzer';

describe('Analyzer Logic', () => {
    it('extractDependencies returns default list', () => {
        const deps = extractDependencies('dummy content');
        expect(deps).toContain('react');
        expect(deps).toContain('express');
    });

    it('validateStructure checks for required files', () => {
        const valid = validateStructure(['package.json', 'README.md']);
        expect(valid.isValid).toBe(true);

        const invalid = validateStructure(['index.ts']);
        expect(invalid.isValid).toBe(false);
        expect(invalid.issues).toContain('Missing package.json');
    });
});
