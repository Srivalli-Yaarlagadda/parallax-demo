export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-900 px-6 py-10 text-neutral-300">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm">
            © {year} Your Company. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
