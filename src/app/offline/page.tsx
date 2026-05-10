export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/20 flex items-center justify-center mx-auto mb-6">
          <span className="font-display font-black text-2xl text-accent">P</span>
        </div>
        <h1 className="font-display font-bold text-xl text-[var(--text)] mb-2">
          You&apos;re offline
        </h1>
        <p className="text-sm text-[var(--text3)] mb-6">
          Profile Architect needs a connection to run AI analysis and generate content. Connect to the internet and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-accent hover:bg-accent-2 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
