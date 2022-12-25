import { render } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('Button component test', () => {
  it('should render with text', () => {
    const { getByRole } = render(<Button text="clickMe" />);
    const button = getByRole('button');
    expect(button).toMatchSnapshot();
  });

  it('should render without text', () => {
    const { getByRole } = render(<Button />);
    const button = getByRole('button');
    expect(button).toMatchSnapshot();
  });

  it('should render disabled state', () => {
    const { getByRole } = render(<Button disabled />);
    const button = getByRole('button');
    expect(button).toMatchSnapshot();
  });

  it('should render loading state', () => {
    const { getByRole } = render(<Button isLoader />);
    const button = getByRole('button');
    expect(button).toMatchSnapshot();
  });

  it('should click', () => {
    const click = jest.fn();
    const { getByRole } = render(<Button onClick={click} />);

    const button = getByRole('button');

    expect(click).toBeCalledTimes(0);

    userEvent.click(button);

    expect(click).toHaveBeenCalledTimes(1);
  });
});
