/**
 * About Page
 * Provides an overview of the Table Over Two publication's mission and focus.
 */
export default function About() {
  return (
    <div className="flex justify-center min-h-screen bg-background text-foreground">
      <main className="max-w-3xl w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">About Table Over Two</h1>
        <section className="space-y-4 text-lg leading-relaxed">
          <p>
            <strong>Table Over Two</strong> is for Supercross and motocross fans
            who care about the elements that drive performance. From race-day
            strategies to season-defining moments, I aim to explore the factors
            behind success in motocross.
          </p>
          <p>
            My mission is to analyze the essential components of race
            performance — from technical execution and strategy to pivotal
            career decisions. <strong>Table Over Two</strong> offers a deeper
            perspective on the sport, diving into what truly influences results,
            both on and off the track.
          </p>
        </section>
      </main>
    </div>
  );
}
