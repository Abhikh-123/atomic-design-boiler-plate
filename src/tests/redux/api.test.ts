import { myApi } from '../../redux/api';

describe('myApi slice', () => {
  it('should have correct reducerPath', () => {
    expect(myApi.reducerPath).toBe('myApi');
  });

  it('should have getPosts endpoint', () => {
    expect(myApi.endpoints.getPosts).toBeDefined();
    expect(typeof myApi.endpoints.getPosts.initiate).toBe('function');
  });
  it('should have getPosts endpoint as query', () => {
    expect(myApi.endpoints.getPosts).toBeDefined();
    expect(typeof myApi.endpoints.getPosts.useQuery).toBe('function');
  });

  it('should have newPost mutation', () => {
    expect(myApi.endpoints.newPost).toBeDefined();
    expect(typeof myApi.endpoints.newPost.useMutation).toBe('function');
  });

  it('should have newPost endpoint as mutation', () => {
    expect(myApi.endpoints.newPost).toBeDefined();
    expect(typeof myApi.endpoints.newPost.useMutation).toBe('function');
  });

  it('should have deletePost mutation', () => {
    expect(myApi.endpoints.deletePost).toBeDefined();
    expect(typeof myApi.endpoints.newPost.useMutation).toBe('function');
  });

  it('should have editPost mutation', () => {
    expect(myApi.endpoints.editPost).toBeDefined();
    expect(typeof myApi.endpoints.newPost.useMutation).toBe('function');
  });
});
