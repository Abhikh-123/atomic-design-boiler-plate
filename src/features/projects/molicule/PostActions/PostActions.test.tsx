import { render, screen, fireEvent } from '@testing-library/react';
import PostActions from './PostActions';

describe('PostActions', () => {
  it('renders Edit and Delete buttons', () => {
    render(<PostActions onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onEdit when Edit button is clicked', () => {
    const handleEdit = jest.fn();
    render(<PostActions onEdit={handleEdit} onDelete={() => {}} />);

    fireEvent.click(screen.getByText('Edit'));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(<PostActions onEdit={() => {}} onDelete={handleDelete} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('applies correct CSS classes to buttons', () => {
    render(<PostActions onEdit={() => {}} onDelete={() => {}} />);

    expect(screen.getByText('Edit')).toHaveClass('edit-button');
    expect(screen.getByText('Delete')).toHaveClass('delete-button');
  });
});
