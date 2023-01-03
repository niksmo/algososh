import { render } from '@testing-library/react';
import { ElementStates } from 'types';
import { Circle } from '.';

describe('Circle component test', () => {
  it('should render with text', () => {
    const { getByTestId } = render(<Circle letter="abcd" />);

    const circleWithText = getByTestId('circle');

    expect(circleWithText).toHaveTextContent('abcd');

    expect(circleWithText).toMatchSnapshot();
  });

  it('should render without text', () => {
    const { getByTestId } = render(<Circle />);

    const emptyCircle = getByTestId('circle');

    expect(emptyCircle).toBeInTheDocument();

    expect(emptyCircle).toMatchSnapshot();
  });

  it('should render with text in head', () => {
    const { getByTestId } = render(<Circle head="abcd" />);

    const circleWithTextInHead = getByTestId('circle');

    expect(circleWithTextInHead).toHaveTextContent('abcd');

    expect(circleWithTextInHead).toMatchSnapshot();
  });

  it('should render with react element in head', () => {
    const { getByTestId } = render(<Circle head={<a>abcd</a>} />);

    const circleWithElemInHead = getByTestId('circle');

    expect(circleWithElemInHead).toHaveTextContent('abcd');

    expect(circleWithElemInHead).toMatchSnapshot();
  });

  it('should render with text in tail', () => {
    const { getByTestId } = render(<Circle tail="abcd" />);

    const circleWithTextInTail = getByTestId('circle');

    expect(circleWithTextInTail).toHaveTextContent('abcd');

    expect(circleWithTextInTail).toMatchSnapshot();
  });

  it('should render with react element in tail', () => {
    const { getByTestId } = render(<Circle tail={<a>abcd</a>} />);

    const circleWithElemInTail = getByTestId('circle');

    expect(circleWithElemInTail).toHaveTextContent('abcd');

    expect(circleWithElemInTail).toMatchSnapshot();
  });

  it('should render with index', () => {
    const { getByTestId } = render(<Circle index={5} />);

    const circleWithIndex = getByTestId('circle');

    expect(circleWithIndex).toHaveTextContent('5');

    expect(circleWithIndex).toMatchSnapshot();
  });

  it('should render with isSmall prop', () => {
    const { getByTestId } = render(<Circle isSmall />);

    const circleWithIndex = getByTestId('circle-main');

    expect(circleWithIndex).toHaveClass('small');

    expect(circleWithIndex).toMatchSnapshot();
  });

  it('should render with all existing states', () => {
    const { container, getByText } = render(
      <>
        <Circle state={ElementStates.Default} letter="1" />
        <Circle state={ElementStates.Changing} letter="2" />
        <Circle state={ElementStates.Modified} letter="3" />
      </>
    );

    const defaultState = getByText('1');
    const changingState = getByText('2');
    const modifiedState = getByText('3');

    expect(defaultState).toHaveTextContent('1');
    expect(changingState).toHaveTextContent('2');
    expect(modifiedState).toHaveTextContent('3');

    expect(container).toMatchSnapshot();
  });
});
