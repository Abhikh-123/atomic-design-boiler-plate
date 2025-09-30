import { createRoot } from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('main entry point', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>'; // create root element
    jest.clearAllMocks();
  });

  it('should call createRoot and render the app', async () => {
    await import('../main');

    expect(createRoot).toHaveBeenCalledTimes(1);
    const rootElement = document.getElementById('root');
    expect(rootElement).not.toBeNull();

    // You can also check that render() was called
    const mockRoot = (createRoot as jest.Mock).mock.results[0].value;
    expect(mockRoot.render).toHaveBeenCalledTimes(1);
  });
});
