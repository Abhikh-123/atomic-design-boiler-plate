import { render, screen, fireEvent } from '@testing-library/react';
import PostsCard from './PostsCard';
interface PostActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

// Mock PostActions to simplify testing
jest.mock('../../../projects/molicule/PostActions/PostActions', () => ({
  __esModule: true,
  default: ({ onEdit, onDelete }: PostActionsProps) => (
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

describe('PostsCard', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const post = { id: 1, title: 'Test Project', body: 'Alice' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders project details', () => {
    render(
      <PostsCard post={post} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('project - Test Project')).toBeInTheDocument();
    expect(screen.getByText('Project: Test Project')).toBeInTheDocument();
    expect(screen.getByText('TeamLead: Alice')).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(
      <PostsCard post={post} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(
      <PostsCard post={post} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
