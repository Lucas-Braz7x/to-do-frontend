import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/src/components/atoms/Input';

describe('Input', () => {
  describe('Rendering', () => {
    it('should render the input correctly', () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });

    it('should render with text type by default', () => {
      render(<Input data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      expect(
        screen.getByPlaceholderText('Enter your email')
      ).toBeInTheDocument();
    });
  });

  describe('Types', () => {
    it('should accept email type', () => {
      render(<Input type="email" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'email');
    });

    it('should accept password type', () => {
      render(<Input type="password" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    });

    it('should accept number type', () => {
      render(<Input type="number" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('type', 'number');
    });
  });

  describe('Error State', () => {
    it('should apply error styles when error is true', () => {
      render(<Input error data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-red-500');
    });

    it('should not apply error styles when error is false', () => {
      render(<Input error={false} data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-slate-300');
      expect(input).not.toHaveClass('border-red-500');
    });

    it('should apply normal styles by default', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('border-slate-300');
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styles', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:bg-slate-100');
    });
  });

  describe('Events', () => {
    it('should call onChange when typing', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} data-testid="input" />);

      fireEvent.change(screen.getByTestId('input'), {
        target: { value: 'test' },
      });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('should update value when typing', () => {
      render(<Input data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'new value' } });
      expect(input.value).toBe('new value');
    });

    it('should call onFocus when focused', () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} data-testid="input" />);

      fireEvent.focus(screen.getByTestId('input'));
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur when blurred', () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} data-testid="input" />);

      fireEvent.blur(screen.getByTestId('input'));
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Additional Props', () => {
    it('should accept custom className', () => {
      render(<Input className="custom-class" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('custom-class');
    });

    it('should accept controlled value', () => {
      render(<Input value="controlled value" readOnly data-testid="input" />);
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('controlled value');
    });

    it('should accept native HTML attributes', () => {
      render(<Input name="email" autoComplete="email" data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('name', 'email');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('should accept maxLength', () => {
      render(<Input maxLength={10} data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('maxLength', '10');
    });
  });
});
