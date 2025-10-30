import { render, screen, fireEvent } from '@testing-library/react';
import Project from './Project';

interface Project {
  id: string; // or number depending on your data
  title: string;
  description: string;
  // Add other project fields as needed
}

interface ProjectTemplateProps {
  title: string;
  onAddClick: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onClearClick: () => void;
  projects: Project[]; // Array of Project objects
  onEdit: (projectId: string) => void; // or use Project type if necessary
  onDelete: (projectId: string) => void; // or use Project type if necessary
}

const mockUseGetPostsQuery = jest.fn();
const mockUseDeletePostMutation = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../../../redux/api', () => ({
  useGetPostsQuery: () => mockUseGetPostsQuery(),
  useDeletePostMutation: () => [mockUseDeletePostMutation],
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../../../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock(
  '../../../projects/templates/ProjectTemplate/ProjectTemplate',
  () => (props: ProjectTemplateProps) => (
    <div data-testid="project-template">
      <h1>{props.title}</h1>
      <button onClick={props.onAddClick}>Add</button>
      <input
        placeholder="searc"
        value={props.searchTerm}
        onChange={props.onSearchChange}
      />
      <button onClick={props.onSearchClick}>Search</button>
      <button onClick={props.onClearClick}>Clear</button>
      {props.projects.map((p: Project) => (
        <div key={p.id}>
          <span>{p.title}</span>
          <button onClick={() => props.onEdit(p.id)}>Edit</button>
          <button onClick={() => props.onDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
);

describe('Project Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: true,
      data: [],
      refetch: jest.fn(),
    });

    render(<Project />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders ProjectTemplate with data', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: false,
      data: [{ id: 1, title: 'My Project', body: 'Alice' }],
      refetch: jest.fn(),
    });

    render(<Project />);
    expect(screen.getByTestId('project-template')).toBeInTheDocument();
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });

  test('navigates when Add is clicked', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: false,
      data: [],
      refetch: jest.fn(),
    });

    render(<Project />);
    fireEvent.click(screen.getByText('Add'));
    expect(mockNavigate).toHaveBeenCalledWith('/add-project');
  });

  test('navigates when Edit is clicked', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: false,
      data: [{ id: 42, title: 'Demo', body: 'Alice' }],
      refetch: jest.fn(),
    });

    render(<Project />);
    fireEvent.click(screen.getByText('Edit'));
    expect(mockNavigate).toHaveBeenCalledWith('/add-project?id=42');
  });

  //   test("calls deletePost when Delete is clicked", async () => {
  //     const mockRefetch = jest.fn();
  //     const mockDelete = jest.fn().mockReturnValue({ unwrap: () => Promise.resolve() });
  //     mockUseGetPostsQuery.mockReturnValue({
  //       isLoading: false,
  //       data: [{ id: 1, title: "Demo", body: "Alice" }],
  //       refetch: mockRefetch,
  //     });
  //     mockUseDeletePostMutation.mockReturnValue(mockDelete);

  //     render(<Project />);
  //     fireEvent.click(screen.getByText("Delete"));

  //     expect(mockDelete).toHaveBeenCalledWith(1);
  //   });

  test('filters projects with search', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: false,
      data: [
        { id: 1, title: 'Match', body: 'Alice' },
        { id: 2, title: 'Other', body: 'Bob' },
      ],
      refetch: jest.fn(),
    });

    render(<Project />);
    fireEvent.change(screen.getByPlaceholderText('search'), {
      target: { value: 'Match' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(screen.getByText('Match')).toBeInTheDocument();
    expect(screen.queryByText('Other')).not.toBeInTheDocument();
  });

  test('clears search when Clear is clicked', () => {
    mockUseGetPostsQuery.mockReturnValue({
      isLoading: false,
      data: [{ id: 1, title: 'Demo', body: 'Alice' }],
      refetch: jest.fn(),
    });

    render(<Project />);
    const input = screen.getByPlaceholderText('search');

    fireEvent.change(input, { target: { value: 'Demo' } });
    fireEvent.click(screen.getByText('Clear'));

    expect(input).toHaveValue('');
  });
});
