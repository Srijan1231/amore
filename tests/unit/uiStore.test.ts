import { describe, it, expect, beforeEach } from "vitest";
import { useUIStore } from "@/store/uiStore";

describe("uiStore", () => {
  beforeEach(() => {
    useUIStore.setState({
      isMobileMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
      isNewsletterModalOpen: false,
    });
  });

  it("should start with all closed", () => {
    const state = useUIStore.getState();
    expect(state.isMobileMenuOpen).toBe(false);
    expect(state.isCartOpen).toBe(false);
    expect(state.isSearchOpen).toBe(false);
    expect(state.isNewsletterModalOpen).toBe(false);
  });

  it("should toggle mobile menu", () => {
    const { toggleMobileMenu } = useUIStore.getState();
    toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(true);
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });

  it("should toggle cart", () => {
    const { toggleCart } = useUIStore.getState();
    toggleCart();
    expect(useUIStore.getState().isCartOpen).toBe(true);
  });

  it("should close cart", () => {
    useUIStore.setState({ isCartOpen: true });
    const { closeCart } = useUIStore.getState();
    closeCart();
    expect(useUIStore.getState().isCartOpen).toBe(false);
  });

  it("should toggle search", () => {
    const { toggleSearch } = useUIStore.getState();
    toggleSearch();
    expect(useUIStore.getState().isSearchOpen).toBe(true);
  });

  it("should close search", () => {
    useUIStore.setState({ isSearchOpen: true });
    const { closeSearch } = useUIStore.getState();
    closeSearch();
    expect(useUIStore.getState().isSearchOpen).toBe(false);
  });
});
