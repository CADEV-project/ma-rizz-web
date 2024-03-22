type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>Auth Layout Header</header>
      <nav>Auth Layout Navigation</nav>
      <main>
        <aside>Auth Layout Aside</aside>
        {children}
      </main>
      <footer>Auth Layout Footer</footer>
    </>
  );
};

export default Layout;
