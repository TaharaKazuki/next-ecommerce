"use client";

export function Footer() {
  return (
    <footer className="border-t border-dashed py-6">
      <div className="text-muted-foreground container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}
