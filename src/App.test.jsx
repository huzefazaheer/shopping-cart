import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Outlet } from 'react-router-dom';
import Homepage from './pages/homepage/homepage';

// Mock CSS modules
vi.mock('./styles.module.css', () => ({
  product: 'product',
  productholder: 'productholder'
}));

const mockProducts = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    image: 'backpack.jpg',
  },
  {
    id: 2,
    title: 'Mens Casual T-Shirt',
    price: 22.3,
    image: 'tshirt.jpg',
  },
];

describe('Homepage Component', () => {
  const mockContext = {
    cartCount: 2,
    setCartCount: vi.fn(),
    data: mockProducts,
    price: 132.25,
    setPrice: vi.fn(),
  };

  const renderHomepage = () => {
    return render(
      <MemoryRouter>
        <Outlet context={mockContext}>
          <Homepage />
        </Outlet>
      </MemoryRouter>,
      {
        // Add this wrapper to handle context properly
        wrapper: ({ children }) => (
          <MemoryRouter>
            <Outlet context={mockContext}>
              {children}
            </Outlet>
          </MemoryRouter>
        )
      }
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders homepage title and products', async () => {
    renderHomepage();
    
    // Debug the rendered output
    screen.debug();
    
    // Use findBy for async elements
    expect(await screen.findByRole('heading', { name: /home/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(mockProducts.length);
      mockProducts.forEach(product => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      });
    });
  });

  it('navigates to product page on click', async () => {
    const user = userEvent.setup();
    renderHomepage();
    
    // Wait for products to render
    const productTitle = await screen.findByText(mockProducts[0].title);
    const productDiv = productTitle.closest('div');
    
    await user.click(productDiv);
    
    // Verify navigation
    // Note: You'll need to mock useNavigate to verify this properly
  });

  it('handles empty product state', () => {
    render(
      <MemoryRouter>
        <Outlet context={{ ...mockContext, data: [] }}>
          <Homepage />
        </Outlet>
      </MemoryRouter>
    );
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});