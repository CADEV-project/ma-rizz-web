type CommonLayoutProps = {
  children: React.ReactNode;
};

export const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <>
      <header>Common Layout Header</header>
      <nav>Common Layout Navigation</nav>
      <main>
        <aside>Common Layout Aside</aside>
        {children}
      </main>
      <footer>Common Layout Footer</footer>
    </>
  );
};
