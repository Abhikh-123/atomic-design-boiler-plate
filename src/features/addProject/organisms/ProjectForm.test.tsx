import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectForm from './ProjectForm';
import { BrowserRouter } from 'react-router-dom';
import {
  useGetPostsQuery,
  useNewPostMutation,
  useEditPostMutation,
} from '../../../redux/api';

const mockNavigate = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock('../../../redux/api', () => ({
  useGetPostsQuery: jest.fn(),
  useNewPostMutation: jest.fn(),
  useEditPostMutation: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useSearchParams: () => mockUseSearchParams(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ProjectForm', () => {
  const mockNewPostTrigger = jest.fn();
  const mockEditPostTrigger = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useNewPostMutation as jest.Mock).mockReturnValue([mockNewPostTrigger]);
    (useEditPostMutation as jest.Mock).mockReturnValue([mockEditPostTrigger]);
    (useGetPostsQuery as jest.Mock).mockReturnValue({ data: [] });
  });

  it('renders empty form when adding new project', () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams('')]);

    renderWithRouter(<ProjectForm />);

    expect(screen.getByPlaceholderText('Enter project name')).toHaveValue('');
    expect(screen.getByPlaceholderText('Enter team lead name')).toHaveValue('');
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('pre-fills form when editing existing project', () => {
    const fakePosts = [
      { id: '123', title: 'Existing Project', body: 'Alice', user_id: 1 },
    ];

    (useGetPostsQuery as jest.Mock).mockReturnValue({ data: fakePosts });
    mockUseSearchParams.mockReturnValue([new URLSearchParams('id=123')]);

    renderWithRouter(<ProjectForm />);

    expect(screen.getByPlaceholderText('Enter project name')).toHaveValue(
      'Existing Project'
    );
    expect(screen.getByPlaceholderText('Enter team lead name')).toHaveValue(
      'Alice'
    );
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('submits form and navigates for new project', async () => {
    mockUseSearchParams.mockReturnValue([new URLSearchParams('')]);

    mockNewPostTrigger.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({}),
    });

    renderWithRouter(<ProjectForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter project name'), {
      target: { value: 'New Project' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter team lead name'), {
      target: { value: 'Bob' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(mockNewPostTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Project',
          body: 'Bob',
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/project');
    });
  });

  it('calls editPost if id is present (edit mode)', async () => {
    const fakePosts = [
      { id: '123', title: 'Old Title', body: 'Old Body', user_id: 1 },
    ];

    (useGetPostsQuery as jest.Mock).mockReturnValue({ data: fakePosts });
    mockUseSearchParams.mockReturnValue([new URLSearchParams('id=123')]);

    mockEditPostTrigger.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({}),
    });

    renderWithRouter(<ProjectForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter project name'), {
      target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter team lead name'), {
      target: { value: 'Updated Body' },
    });

    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(mockEditPostTrigger).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Updated Title',
          body: 'Updated Body',
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/project');
    });
  });
});
