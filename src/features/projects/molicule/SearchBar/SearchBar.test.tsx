import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockOnSearchChange = jest.fn();
  const mockOnSearchClick = jest.fn();
  const mockOnClearClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders heading, input, and buttons', () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
        onClearClick={mockOnClearClick}
      />
    );

    expect(screen.getByText('Search Filter')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter Project Name')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('displays the current search term in input', () => {
    render(
      <SearchBar
        searchTerm="Test Project"
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
        onClearClick={mockOnClearClick}
      />
    );

    expect(screen.getByPlaceholderText('Enter Project Name')).toHaveValue(
      'Test Project'
    );
  });

  it('calls onSearchChange when typing in input', () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
        onClearClick={mockOnClearClick}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Project Name'), {
      target: { value: 'New Project' },
    });

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSearchClick when Search button is clicked', () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
        onClearClick={mockOnClearClick}
      />
    );

    fireEvent.click(screen.getByText('Search'));
    expect(mockOnSearchClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClearClick when Clear button is clicked', () => {
    render(
      <SearchBar
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchClick={mockOnSearchClick}
        onClearClick={mockOnClearClick}
      />
    );

    fireEvent.click(screen.getByText('Clear'));
    expect(mockOnClearClick).toHaveBeenCalledTimes(1);
  });
});
