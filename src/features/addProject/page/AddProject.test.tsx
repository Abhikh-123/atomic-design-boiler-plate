import React from 'react';
import { render } from '@testing-library/react';
import AddProject from './AddProject';

// Mock AddProjectTemplate since we only care about the callback
jest.mock('../templates/AddProjectTemplate', () => ({
  __esModule: true,
  default: ({ onBackClick }: { onBackClick: () => void }) => (
    <div data-testid="add-project-template">
      <button onClick={onBackClick}>Back</button>
    </div>
  ),
}));

// Mock react-router navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AddProject Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders AddProjectTemplate', () => {
    const { getByTestId } = render(<AddProject />);
    expect(getByTestId('add-project-template')).toBeInTheDocument();
  });

  it('calls navigate(-1) when onBackClick is triggered', () => {
    const { getByText } = render(<AddProject />);
    getByText('Back').click();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
