import { render, screen } from '@testing-library/react';
import { Spinner } from '@/src/components/atoms/Spinner';

describe('Spinner', () => {
  describe('Rendering', () => {
    it('should render the spinner', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should have aria-label for accessibility', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Carregando');
    });

    it('should have accessibility text for screen readers', () => {
      render(<Spinner />);
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('should visually hide text with sr-only', () => {
      render(<Spinner />);
      const srText = screen.getByText('Carregando...');
      expect(srText).toHaveClass('sr-only');
    });
  });

  describe('Sizes', () => {
    it('should render with md size by default', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('h-8', 'w-8');
    });

    it('should apply sm size correctly', () => {
      render(<Spinner size="sm" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('h-4', 'w-4');
    });

    it('should apply lg size correctly', () => {
      render(<Spinner size="lg" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('h-12', 'w-12');
    });
  });

  describe('Styles', () => {
    it('should have spin animation', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should be rounded', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('rounded-full');
    });

    it('should have borders with correct colors', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass(
        'border-2',
        'border-slate-200',
        'border-t-indigo-600'
      );
    });
  });

  describe('Additional Props', () => {
    it('should accept custom className', () => {
      render(<Spinner className="custom-class" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-class');
    });

    it('should keep default classes when adding custom className', () => {
      render(<Spinner className="custom-class" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass(
        'animate-spin',
        'rounded-full',
        'custom-class'
      );
    });
  });
});
