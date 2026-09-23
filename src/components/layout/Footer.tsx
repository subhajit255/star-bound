export function Footer() {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground bg-white">
      <p>
        &copy; {new Date().getFullYear()} Starbound Systems. All rights
        reserved.
      </p>
      <div className="flex gap-4">
        <a href="#" className="hover:text-primary transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
