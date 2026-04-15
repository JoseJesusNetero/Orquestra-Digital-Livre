export const Header = () => {
  return (
    <header style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{
        fontFamily: "'Playfair Display', serif", // Fonte curva elegante
        fontSize: '3.5rem',
        color: '#D4AF37', // Dourado Real
        textShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
        margin: '0 auto',
        maxWidth: '80%'
      }}>
        Orquestra Digital Livre
      </h1>
    </header>
  );
};