import { describe, it, expect } from "vitest";
import { paginationMeta } from "@/lib/api";

describe("API helpers", () => {
  describe("paginationMeta", () => {
    it("should create pagination metadata", () => {
      const meta = paginationMeta(100, 10, "cursor123");
      expect(meta.total).toBe(100);
      expect(meta.limit).toBe(10);
      expect(meta.cursor).toBe("cursor123");
    });

    it("should default cursor to null", () => {
      const meta = paginationMeta(50, 20);
      expect(meta.cursor).toBeNull();
    });
  });
});
