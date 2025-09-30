import { render, screen, fireEvent } from '@testing-library/react';
import ProjectList from './ProjectList';
interface PostsCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

// Mock the PostsCard component so we only test ProjectList logic
jest.mock('../PostsCard/PostsCard', () => ({
  __esModule: true,
  default: ({ post, onEdit, onDelete }: PostsCardProps) => (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

describe('ProjectList', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders 'No matching projects found.' when list is empty", () => {
    render(
      <ProjectList projects={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );
    expect(screen.getByText('No matching projects found.')).toBeInTheDocument();
  });

  it('renders projects when list is not empty', () => {
    const projects = [
      { id: 1, title: 'Project One', body: 'Body One' },
      { id: 2, title: 'Project Two', body: 'Body Two' },
    ];

    render(
      <ProjectList
        projects={projects}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Project One')).toBeInTheDocument();
    expect(screen.getByText('Project Two')).toBeInTheDocument();
  });

  it('calls onEdit with project id when Edit button is clicked', () => {
    const projects = [{ id: 1, title: 'Project One', body: 'Body One' }];

    render(
      <ProjectList
        projects={projects}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(1);
  });

  it('calls onDelete with project id when Delete button is clicked', () => {
    const projects = [{ id: 1, title: 'Project One', body: 'Body One' }];

    render(
      <ProjectList
        projects={projects}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
