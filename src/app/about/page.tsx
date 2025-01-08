/**
 * About Page
 * Provides an overview of the Table Over Two publication's mission and focus.
 */
export default function About() {
  return (
    <div className="flex justify-center bg-background text-foreground min-h-screen">
      <main className="max-w-3xl w-full px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-12">
        {/* Page Title */}
        <header className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.25rem] font-bold leading-tight">
            About Table Over Two
          </h1>
        </header>

        {/* Page Content */}
        <section className="prose prose-base sm:prose-lg max-w-none text-foreground leading-relaxed">
          <p>
            Table Over Two is for Supercross and motocross fans who care about
            the elements that drive performance. From race-day strategies to
            season-defining moments, I aim to explore the factors behind success
            in motocross.
          </p>
          <p>
            My mission is to analyze the essential components of race
            performance — from technical execution and strategy to pivotal
            career decisions. Table Over Two offers a deeper perspective on the
            sport, diving into what truly influences results, both on and off
            the track.
          </p>
        </section>
      </main>
    </div>
  );
}
