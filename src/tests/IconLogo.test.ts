import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte";
import IconLogo from "$lib/components/icons/IconLogo.svelte";

describe("IconLogo", () => {
  describe("Rendering", () => {
    it("renders the logo SVG", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");

      expect(svg).toBeInTheDocument();
    });

    it("has correct default size", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");

      expect(svg).toHaveAttribute("width", "20");
      expect(svg).toHaveAttribute("height", "20");
    });

    it("accepts custom size prop", () => {
      const { container } = render(IconLogo, { props: { size: 32 } });
      const svg = container.querySelector("svg.logo-icon");

      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });
  });

  describe("SVG viewBox Validation (#166)", () => {
    it("has correct viewBox", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");

      // Widow's peak variant has 36x54 viewBox
      expect(svg).toHaveAttribute("viewBox", "0 0 36 54");
    });

    it("viewBox has exactly 4 values", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");
      const viewBox = svg?.getAttribute("viewBox");

      // Validate format: exactly 4 space-separated numeric values
      const values = viewBox?.split(" ");
      expect(values).toHaveLength(4);
      values?.forEach((val) => {
        expect(Number.isNaN(parseFloat(val))).toBe(false);
      });
    });

    it("viewBox starts at origin (0 0)", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");
      const viewBox = svg?.getAttribute("viewBox");
      const [minX, minY] = viewBox?.split(" ").map(Number) ?? [];

      expect(minX).toBe(0);
      expect(minY).toBe(0);
    });
  });

  describe("Logo Structure", () => {
    it("contains rack frame", () => {
      const { container } = render(IconLogo);
      const frame = container.querySelector(".logo-frame");

      expect(frame).toBeInTheDocument();
    });

    it("contains device slots", () => {
      const { container } = render(IconLogo);
      const slots = container.querySelectorAll(".logo-slot");

      expect(slots.length).toBeGreaterThan(0);
    });

    it("contains three device slots", () => {
      const { container } = render(IconLogo);
      const slots = container.querySelectorAll(".logo-slot");

      expect(slots).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("is hidden from screen readers", () => {
      const { container } = render(IconLogo);
      const svg = container.querySelector("svg.logo-icon");

      expect(svg).toHaveAttribute("aria-hidden", "true");
    });
  });
});
