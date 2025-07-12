import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route, Outlet, data } from "react-router-dom";
import Homepage from "../pages/homepage/homepage";
import App from "../App";
import Product from "../pages/product/product";
import userEvent from "@testing-library/user-event";

describe("Products", () => {
  const mockProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120
    }
  };

  const mockData = [mockProduct]; // Wrap in array since your component uses .map()

  it("cards are displayed with data", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <Homepage data={mockData}/> // No props passed directly
                        }
                    />
                </Routes>
            </MemoryRouter>
    );

    // Debug the rendered output

    // Verify the product card is rendered
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

    it("cards are not displayed with no data", () => {
    render(
      <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <Homepage data={[]}/> // No props passed directly
                        }
                    />
                </Routes>
            </MemoryRouter>
    );

    // Debug the rendered output
    

    // Verify the product card is rendered
    expect(screen.queryByText(mockProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByText(`$${mockProduct.price}`)).not.toBeInTheDocument();
  });

  it("detail when product is clicked on", ()=> {
    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route 
              path="product/:id" 
              element={
                  <Product data={mockData}/> // No props passed directly
              }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.queryByText("$"+mockProduct.price)).toBeInTheDocument();
  })


  it("should update cart when buying product", async () => {
    const mockAddToCart = vi.fn();
    const mockSetPrice = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route 
            path="product/:id" 
            element={
              <Product 
                data={mockData} 
                cartCount={0} 
                setCartCount={mockAddToCart} 
                setPrice={mockSetPrice}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Set quantity first
    const quantityInput = screen.getByDisplayValue(1);
    await user.clear(quantityInput);
    await user.type(quantityInput, '2');

    // Click the button
    const btn = screen.getByText("Add to Cart");
    await user.click(btn);

    // Verify the exact calls
    expect(mockAddToCart).toHaveBeenCalledWith(2); // Should be called with new count
    // expect(mockSetPrice).toHaveBeenCalledWith(200); // 2 * 100
  });
});