import React from "react";

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-border text-textMuted text-center p-4">
      © {new Date().getFullYear()} ISKCON DASHBOARD • All rights reserved
    </footer>
  );
}
