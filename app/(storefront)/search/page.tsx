import { Metadata } from "next";
import { SearchPageContent } from "@/components/storefront/SearchPageContent";

export const metadata: Metadata = {
  title: "Search | Amoré",
  description: "Search for handcrafted bouquets, gifts, and more at Amoré.",
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SearchPageContent />
    </div>
  );
}
