import { render, screen } from '@testing-library/react';
import { Label } from '@/src/components/atoms/Label';

describe('Label', () => {
  describe('Rendering', () => {
    it('should render the label with correct text', () => {
      render(<Label>Name</Label>);
      expect(screen.getByText('Name')).toBeInTheDocument();
    });

    it('should render as label element', () => {
      render(<Label>Email</Label>);
      const label = screen.getByText('Email');
      expect(label.tagName).toBe('LABEL');
    });

    it('should apply default styles', () => {
      render(<Label>Field</Label>);
      const label = screen.getByText('Field');
      expect(label).toHaveClass('text-sm', 'font-medium', 'text-slate-700');
    });
  });

  describe('Required Indicator', () => {
    it('should display asterisk when required is true', () => {
      render(<Label required>Required field</Label>);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should apply red color to asterisk', () => {
      render(<Label required>Field</Label>);
      const asterisk = screen.getByText('*');
      expect(asterisk).toHaveClass('text-red-500');
    });

    it('should not display asterisk when required is false', () => {
      render(<Label required={false}>Optional field</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('should not display asterisk by default', () => {
      render(<Label>Field</Label>);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Input Association', () => {
    it('should accept htmlFor to associate with input', () => {
      render(<Label htmlFor="email-input">Email</Label>);
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', 'email-input');
    });
  });

  describe('Additional Props', () => {
    it('should accept custom className', () => {
      render(<Label className="custom-class">Custom</Label>);
      const label = screen.getByText('Custom');
      expect(label).toHaveClass('custom-class');
    });

    it('should keep default classes when adding custom className', () => {
      render(<Label className="custom-class">Field</Label>);
      const label = screen.getByText('Field');
      expect(label).toHaveClass('text-sm', 'font-medium', 'custom-class');
    });

    it('should accept native HTML attributes', () => {
      render(
        <Label data-testid="label-test" id="my-label">
          Test
        </Label>
      );
      const label = screen.getByTestId('label-test');
      expect(label).toHaveAttribute('id', 'my-label');
    });
  });

  describe('Complex Children', () => {
    it('should render complex children correctly', () => {
      render(
        <Label>
          <span>Text with</span> <strong>formatting</strong>
        </Label>
      );
      expect(screen.getByText('Text with')).toBeInTheDocument();
      expect(screen.getByText('formatting')).toBeInTheDocument();
    });
  });
});
