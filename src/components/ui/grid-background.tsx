export const GridBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 124, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 124, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Fade out gradient overlay - top */}
      <div
        className="absolute top-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to bottom, #E8F0FF, transparent)',
        }}
      />
      
      {/* Fade out gradient overlay - bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: 'linear-gradient(to top, #F5F9FF, transparent)',
        }}
      />
      
      {/* Fade out gradient overlay - left */}
      <div
        className="absolute top-0 bottom-0 left-0 w-40"
        style={{
          background: 'linear-gradient(to right, #E8F0FF, transparent)',
        }}
      />
      
      {/* Fade out gradient overlay - right */}
      <div
        className="absolute top-0 bottom-0 right-0 w-40"
        style={{
          background: 'linear-gradient(to left, #F5F9FF, transparent)',
        }}
      />
      
      {/* Corner fade overlays for smoother transitions */}
      <div
        className="absolute top-0 left-0 w-40 h-40"
        style={{
          background: 'radial-gradient(circle at top left, #E8F0FF, transparent)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-40 h-40"
        style={{
          background: 'radial-gradient(circle at top right, #E8F0FF, transparent)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-40 h-40"
        style={{
          background: 'radial-gradient(circle at bottom left, #F5F9FF, transparent)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-40 h-40"
        style={{
          background: 'radial-gradient(circle at bottom right, #F5F9FF, transparent)',
        }}
      />
    </div>
  );
};
