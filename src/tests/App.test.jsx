import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "../pages/homepage/homepage";
import App from "../App";

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
              <App>
                <Outlet context={{ 
                  cartCount: 0, 
                  setCartCount: vi.fn(), 
                  data: mockData, // Make sure this matches what Homepage expects
                  price: 0 
                }} />
              </App>
            }
          >
            <Route index element={<Homepage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Debug the rendered output
    screen.debug();

    // Verify the product card is rendered
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });
});